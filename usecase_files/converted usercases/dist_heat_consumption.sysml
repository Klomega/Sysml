package 'DH Consumption' {

    abstract block 'Temperature Sensor' {
        sampling_frequency :> Hz;
    }

    block Consumption {
		part commercial_buildings : 'Commercial buildings'[1];
		part apartment_buildings : 'Apartment buildings'[1];
		part single_family_houses : 'DH family house'::'Single family houses'[1];
	}

    block 'Commercial buildings';

	block 'Apartment buildings' {
		value floors :> Integer;
	}
	
}

