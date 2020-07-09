package computer {
	
block 'Logic parts'{
	
	
	part motherboard : motherboard[1];
	part ram : Ram[2];
	part cpu : cpu[1];
	part psu : psu[1];							
	}
	
block Power{
	part psu : psu[1];
	
	}

block Wires{
	part connectors : 'Logic parts'[1..4];
	part hard_wires : Power[1];
	
	link : 'socket' connect connectors::motherboard to connectors::cpu;
	link : '24-pin' connect hard_wires::psu to connectors::motherboard; 
}

	
	
	
	
}