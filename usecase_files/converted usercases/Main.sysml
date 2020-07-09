package 'Main' {
    block Tool;

    block 'Use case diagram' {

        part End_User : EndUser::'End User'[1];
        part architect : Architect::Architect[1];
        part lindbacks : Lindbacks::'Lindbacks'[1];
        part podcomp : Podcomp::Podcomp[1];
        
        part Requirements : Requirements [1];
		part Functional_Design : Functional_Design [1];
		part Procurement : Procurement [1];
		part Operations : Operations [1];

        // Since this is referencing blocks that is not part of this package, those packages has to be declared before
        // Normally the links are created during the parser, but blocks that are declared in other packages are included
        // when the diagrams are drawn. The parser contains a feature making it possible to, during compile time, check in the
        // packages that are parsed before, making this links possible.

        // Note that it is only possible when the packages are parsed before this package. 

        link : 1ep3o1-2ep1i1 connect End_User::Procurement::Architect_Search to Architect::Requirements::Database;
        link : 2ep3o1-3ep1i1 connect Architect::Procurement::SOApush to Lindbacks::Requirements::Database;
		link : 3ep3o1-4ep2i1 connect Lindbacks::Procurement::SOApush to Podcomp::Functional_Design::3D_Configurator;
		link : 4ep4o1-3ep4i2 connect Podcomp::Operations::ABB_Robot to Lindbäcks::Operations::ERP_MES;
    }
}