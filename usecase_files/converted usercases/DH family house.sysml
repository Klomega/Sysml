package 'DH family house' {

	block Radiators;
	block Electricity;

	block 'Single family houses' {
		coordinates :> Coordinates;
		
		part electricity: Electricity[1];
		part radiators: Radiators [1];
		part district_heating_substation : 'District Heating Substation'[1];
	}

	block 'District Heating Substation' {
		Loc :> Location;
		part hydronic_heating : 'Hydronic Heating'[1];
		part domestic_hot_water : 'Domestic hot water'[1];
		part heatmeter : Heatmeter[1];
	}


	block 'Hydronic Heating'{
		part outdoor_temperature : 'Temperature: C'[1];
		part radiator_supply_temperature : 'Temperature: C'[1];
		part controller : Controller[1];
		part pump : Pump[1];
		part valve : Valve[1];
		part heat_exchanger : 'Heat Exchanger'[1];
	}

	block 'Temperature: C' :> 'Temperature Sensor' {
		temperature :> C ;
		
	}
	block Controller;
	block Pump;
	block Valve;
	block 'Heat Exchanger';

	block 'Mechanical Controller';
	block 'Pressure Sensor';

	block 'Domestic hot water' {
		part mechanical_controller : 'Mechanical Controller'[1];
		part domestic_hot_water_pressure : 'Pressure Sensor'[1];
		part dhw_valve : Valve[1];
		part dhw_heat_exchanger : 'Heat Exchanger'[1];
	}

	block 'Flow meter';
	block Communication;

	block Heatmeter {
		part primary_supply : 'Temperature: C' [1];
		part primary_return : 'Temperature: C' [1];
		part primary_flow : 'Flow meter'[1];
		part communication : Communication[1];
	}
}