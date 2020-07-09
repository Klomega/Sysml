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
