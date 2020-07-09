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
