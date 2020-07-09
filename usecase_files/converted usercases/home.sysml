package 'Home Sys' {

    block Controller;

    block 'Kiosk mode Chromium' ;
    
    block 'Web Page';
    
    block 'Web Browser';

	block 'Table Lamp';
	
	block IPAddress;
	
    block 'LCD Touch Screen' {
        part view : 'Kiosk mode Chromium'[1];
    }

    block 'Flask Server' {
        part web_page : 'Web Page'[1];
        part controller : Controller[1];
        part local_ip : IPAddress[1];
        //value IPAddress;
    }
    
    assoc block 'python' {
    	end : 'Flask Server';
    	end : Controller;
    	
    }
    assoc block 'HTTP' {
    	end : 'LCD Touch Screen';
    	end : 'Web Page'[1];
    }

    block 'Raspberry Pi' {
        part server : 'Flask Server'[1];
        part display : 'LCD Touch Screen'[1];

        link : 'python' connect server::web_page to server::controller;
        link : 'HTTP' connect display::view to server::web_page;
        
    }
    
    block 'LED Lamp';

    block 'ESP8266 D1' {
        part light : 'LED Lamp'[1];
      	//value 'ON/OFF';
    }
    

    block 'Kasa WiFi Socket' {
        part table_lamp : 'Table Lamp'[1];
        //value 'ON/OFF';
    }

    block User {
        part browser : 'Web Browser'[1];
    }

	assoc block 'Socket' {
		end : 'Raspberry Pi';
		end : 'Table Lamp';
	}
	
    block System {
        part user : User[1];
        part raspberry_pi : 'Raspberry Pi'[1];
        part esp8266 : 'ESP8266 D1'[1];
        part kasa_wifi_socket : 'Kasa WiFi Socket'[3];
        
        link : 'HTTP' connect user::browser to raspberry_pi::server;
        
        link : 'HTTP' connect raspberry_pi::server to esp8266;
        link : 'Socket' connect raspberry_pi::server to kasa_wifi_socket;

    }
    
    

}