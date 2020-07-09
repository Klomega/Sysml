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

    block 'Architect' {
        part Requirements : Requirements[1];
        part Functional_Design : 'Functional Design'[1];
        part Procurement : Procurement[1];

        link : 2ep1o1-2ep2i1 connect Requirements::Database to Functional_Design::Revit;
		link : 2ep2o2-2ep3i1 connect Functional_Design::Revit to Procurement::SOApush;
    }

}