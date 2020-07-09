
package EndUser {

    // It is not possible to inherit from an abstract block that is defined in another package..
    abstract block Phase;

    block Requirements :> Phase {
        part Pen_and_Paper : 'Main'::Tool[1];
    }

    block Procurement :> Phase {
        part Architect_Search : 'Main'::Tool[1];
    }

    block 'End User' {
        part Requirements : Requirements[1];
        part Procurement : Procurement[1];

        link : 1ep1o1-1ep3i1 connect Requirements::Pen_and_Paper to Procurement::Architect_Search;
    }
}

package Architect {
    abstract block Phase;
    
    block Requirements :> Phase {
        part Database : 'Main'::Tool[1];
    }

    block 'Functional Design' :> Phase {
        part Revit : 'Main'::Tool[1];
    }

    block Procurement :> Phase {
        part SOApush : 'Main'::Tool[1];
    }

    block Architect {
        part Requirements : Requirements[1];
        part Functional_Design : 'Functional Design'[1];
        part Procurement : Procurement[1];

        link : 2ep1o1-2ep2i1 connect Requirements::Database to Functional_Design::Revit;
		link : 2ep2o2-2ep3i1 connect Functional_Design::Revit to Procurement::SOApush;
    }

}

package Lindbacks {
    abstract block Phase;

    block Requirements :> Phase {
        part Database : 'Main'::Tool[1];
    }

    block 'Functional Design' :> Phase {
        part VertexBD : 'Main'::Tool[1];
    }
    block Procurement :> Phase {
        part SOApush : 'Main'::Tool[1];
    }

    block Operations :> Phase {
        part ERP_MES : 'Main'::Tool[1];
    }

    block Lindbacks {
		part Requirements : Requirements [1];
		part Functional_Design : 'Functional Design' [1];
		part Procurement : Procurement [1];
		part Operations : Operations [1];
		
		link : 3ep1o1-3ep2i1 connect Requirements::Database to Functional_Design::VertexBD;
		link : 3ep2o1-3ep3i1 connect Functional_Design::VertexBD to Procurement::SOApush;
		link : 3ep2o2-3ep4i1 connect Functional_Design::VertexBD to Operations::ERP_MES;
	}
}

package Podcomp {
    abstract block Phase;

    block Requirements :> Phase {
		part Database : 'Main'::Tool [1];
	}
	
	block 'Functional Design' :> Phase {
		part 3D_Configurator : 'Main'::Tool [1];
		part ABB_RobotStudio : 'Main'::Tool [1];
	}
	
	block Operations :> Phase {
		part ABB_Robot : 'Main'::Tool [1];
	}

    block Podcomp {
		part Requirements : Requirements [1];
		part Functional_Design : 'Functional Design' [1];
		part Operations : Operations [1];
		
		link 4ep2o1-4ep2i1 connect Functional_Design::3D_Configurator to Functional_Design::ABB_RobotStudio;
		link 4ep2o2-4ep3i1 connect Functional_Design::ABB_RobotStudio to Operations::ABB_Robot;
	}
}

package 'Main' {
    block Tool;

    block 'Use case diagram' {

        part End_User : EndUser::'End User'[1];
        part Architect : Architect::Architect[1];
        part Lindbacks : Lindbacks::Lindbacks[1];
        part Podcomp : Podcomp::Podcomp[1];

        // Since this is referencing blocks that is not part of this package, those packages has to be declared before
        // Normally the links are created during the parser, but blocks that are declared in other packages are included
        // when the diagrams are drawn. The parser contains a feature making it possible to, during compile time, check in the
        // packages that are parsed before, making this links possible.

        // Note that it is only possible when the packages are parsed before this package. 

        link : 1ep3o1-2ep1i1 connect End_User::Procurement::Architect_Search to Architect::Requirements::Database;
        link : 2ep3o1-3ep1i1 connect Architect::Procurement::SOApush to Lindbacks::Requirements::Database;
		link : 3ep3o1-4ep2i1 connect Lindbacks::Procurement::SOApush to Podcomp::Functional_Design::3D_Configurator;
		link : 4ep4o1-3ep4i2 connect Podcomp::Operations::ABB_Robot to Lindbacks::Operations::ERP_MES;
    }
}