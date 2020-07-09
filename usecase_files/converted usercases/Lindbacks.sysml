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

    block 'Lindbacks' {
		part Requirements : Requirements [1];
		part Functional_Design : 'Functional Design' [1];
		part Procurement : Procurement [1];
		part Operations : Operations [1];
		
		link : 3ep1o1-3ep2i1 connect Requirements::Database to Functional_Design::VertexBD;
		link : 3ep2o1-3ep3i1 connect Functional_Design::VertexBD to Procurement::SOApush;
		link : 3ep2o2-3ep4i1 connect Functional_Design::VertexBD to Operations::ERP_MES;
	}
}
