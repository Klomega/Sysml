package 'DH Consumption' {
	
	abstract  block 'Tempeture Sensor' {
		value Hz;
	}
	
	block Consumption {
		part commercial_buildings : 'Commercial buildings'[1];
	}
	
	block 'Commercial buildings';
}