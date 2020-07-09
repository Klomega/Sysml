// Will create a package called 'Use-case Engineering Processes'
package 'Use-case Engineering Processes' {
	

    // Defining some empty blocks
	block 'Pen and Paper';
	block Imagination;
	block 'Autodesk Revit';
	block 'Vertex BD';
	block 'ABB RobotStudio';
	block Education {
		value education_program : education_program; 
		
	}

	block Requirements ;
	block 'Functional Design';
	block 'Procurement & Engineering';
	block 'Deployment & Commissioning';
	block 'Operation & Management' ;
	block 'Maintenance Decommission & Recycling';
	block Evolution ;
	block 'Training & Education';

	block UserRequirements {

		part tool : 'Pen and Paper' [1];
		part imagination: Imagination[1];
	
	}

	block ArchitectRequirements {
		part talent : Education [1];

	}

	block 'Podcomp Operation & Management' {
		part robot :'ABB RobotStudio'[1];
	}

    // The abstract block is not a block but rather something that
    // got content that will be copied in to a block that is using the ':>'
    // Note that the abstract block has to be declared before a block can inherit
	abstract block Stakeholder {
		part requirements: Requirements [1];
		part functional_design: 'Functional Design'[1];
		part procurement_and_engineering: 'Procurement & Engineering'[1];
		part deployment_and_commissioning : 'Deployment & Commissioning'[1];
		part operation_and_management : 'Operation & Management'[1] ;
		part maintenance_decomission_and_recycling: 'Maintenance Decommission & Recycling'[1];
		part evolution: Evolution[1];
		part training_and_education: 'Training & Education'[1]; 

		location :> Location;
	}

    // Since the EndUser block will reference the Architect the Architect has to 
    // be declared before the EndUser, the ':> Stakeholder' makes sure that the Architect got 
	// the parts
	block Architect :> Stakeholder;

	block EndUser :> Stakeholder {

		// Overrides the Requirements block with a UserRequirements block
		part requirements : UserRequirements[1];

        
		
	}


	// This block has to be placed here, or at least after the EndUser block inherits the Stakeholder
	block 'Architect Functional Design' {
		part cad_tool : 'Autodesk Revit'[1];	
		 
	}

    // Here the content of the Architect will be placed
	block Architect {

		part requirements : ArchitectRequirements[1];
		part functional_design : 'Architect Functional Design' [1];
		
	}
	
	block Lindback :> Stakeholder ;

	block Podcomp :> Stakeholder {

		part operation_and_management : 'Podcomp Operation & Management'[1];

        // The ref will be a reference between the blocks. 
        // Not a reference between parts
		ref 'Got limitations' : EndUser [1];
		ref 'Got limitations' : Architect [1];
	
	}

	block Martinson :> Stakeholder;

    // The 'Engineering Processes' block will be the "System".
	block 'Engineering Processes' {
		part user : EndUser[1];
		part architect : Architect[1];
		part lindback : Lindback[1];
		part podcomp: Podcomp[1];
		part martinson : Martinson[1];

		// The links should only reference parts and therefore they should be declared here
		link : 'Will effect' connect user::requirements to architect::requirements;

		link : 'For future understanding' connect architect::functional_design::cad_tool to user::maintenance_decomission_and_recycling;
	}

}
