package Computer {
	
	//import ISQ;
	
	block transistor;
	block ram;
	block gpu_cooler;
	block capacitor;
	block pins;
	block pin_holes;
	block network;
	block copper;
	block outer_layer;
	block thermal_plate;
	block fan;
	block speed;
	
	
/* 	
 	
	block computer {
		part Cpu : cpu[1];
		part Motherboard : motherboard[1];
		part Ram : ram[2];
		part Gpu : gpu[1];
		part Psu : psu[1];
		part Hdd : hdd[2];
		part arm : arm[1];
		part Transistor : transistor[100000];
		part Capacitor : capacitor[10000];	
		part Cpu_cooler : cpu_cooler[1];
		
		
		
		}
	*/
	
	value type volym {
		 L : volym;
	}
	
	//value type mass {
		//value kg : mass;
	//}
	
	
	block '24-pin' {

		part Copper : copper[1000];
		
		value ml : volym;
/*  
		value type mass {
			value kg : mass;
			value g : mass;
		}
	*/	
		value type mass;
		
		value kg : mass;
	} 
	
	block add {
		part Gates : gates[1000];
	}
	
	block gates {
		part Transistor : transistor[100000]; 
	}
	
	block arithmatic {
		part Gates : gates[100];
	}
	
	
	assoc block connectors {
	end : pins[1];
	end : pin_holes[1];
	}
	
	block cpu {
		part CLK : clk;
		part Arithmatic : arithmatic[100];
		part Add : add[10];
		part power_connector_male : pins[24]; 
		part Outer_layer : outer_layer[1];
		
		//link : 'heat spreader' connect Outer_layer to cpu_cooler::Thermal_plate;
		
		
	}

	block BigFan :> fan;
	
	block clk {
		part Speed : speed[1..5];
	}
	
	block slow_clk :> clk {
		part redefines Speed[1];
	}
	
	block slow_cpu :> cpu {
		part Slow_clk : slow_clk :>> CLK;
	}
	

	
	block motherboard {
		part Ram : ram[2];
		part Transistor : transistor[1000];
		part Capacitor : capacitor[2000];  
		part power_connector_female : pin_holes[24];
		part Network : network[2];
		part power_connector_male : pins[24];
		
		//value kg : mass;
		
		link : connectors connect power_connector_female to power_connector_male;
	}
	
	block gpu {
		
	}
	
	block psu {
		part '24-Pin' : '24-pin'[1];
		
	}
	
	block hdd {
		
	}
	
	block cpu_cooler {
		part Fan : fan[1];
		part Thermal_plate : thermal_plate[1];
			
	}
	
	assoc block heat_spreader {
		end : cpu[1];
		end : cpu_cooler[1];
	}
}