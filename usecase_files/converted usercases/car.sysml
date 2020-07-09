package car{
	
	block engine;
	
	block transmition;
	
	block electrical_system;
	
	package engine {
		block motor_block;
	}
	
	package transmition {
		block main {
			part gears : gears[0..10];
		}
	}
	
	package electrical_system {
		block fuse_box;
	}
}