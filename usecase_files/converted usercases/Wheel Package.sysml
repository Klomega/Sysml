package 'Wheel Package' {
	
	import ISQ::*;
    //import StringFunctions::*;
    
 //abstract block B;
 

 block WheelHubAssembly {
  part wheel: WheelAssembly[1];
  part lugBoltJoints: LugBoltJoint[5];
  part hub: Hub[1];
 }
 
 block Tire {
	
	value length : LengthValue;
  //value tireSpecification : 'String';		
  //tireSpecification :> String;
  //tireSpecification :> tireSpecification;
  
  
  part bead : TireBead[2];
  
 }
 
 block TireBead;
 
 block car;
 
 part Car : car[1];
 
 /* 
 part carTire {
 	car : car;
 }
*/
 block Wheel {
 	
	//diameter :> length;
  	//width :> length;
  
  part rim : TireMountingRim[2];
  part v : InflationValve[1];
  part weight : BalanceWeight[0..6];
  part mountingHoles : LugBoltMountingHole[5];

 }
 
assoc block PressureSeat {
	end : TireBead[1];
	end : TireMountingRim[1];
}
 

block WheelAssembly {
	value type Pressure;	
	value inflationPreassure : Pressure;
	
  //inflationPressure :> pressure;
  
	part t: Tire[1];
	part w: Wheel[1];

 	link : PressureSeat connect t::bead to w::rim;
 }

 block WirelessTirePressureMonitor;
 
 block TireMountingRim;
 
 block InflationValve;
 
 block BalanceWeight;
 
 block LugBoltMountingHole {
  //lugBoltSize :> length;
 }
 
 block LugBoltJoint {
  //torque :> ISQ::torque;
  //torque :> torque;
  //boltTension :> force;
  
  
  ref mountingHole: LugBoltMountingHole[1];
  ref threadedHole: LugBoltThreadableHole[1];
 }
 
 block Hub {
  part h: LugBoltThreadableHole[5];
 }
 
 block LugBoltThreadableHole {
 	value type lugBolt;
  //lugBoltSize :> length;
  //threadSize :> length;
  value bolthole : length;
 }
 
}