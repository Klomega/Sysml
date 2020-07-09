package 'Home Sys' {

    block Controller;

    block 'Kiosk mode Chromium' ;
    
    block IPAddress;

    block 'LCD Touch Screen' {
        part view : 'Kiosk mode Chromium'[1];
    }

    block 'Flask Server' {
        part web_page : web_page[1];
        part controller : Controller[1];
        part local_ip : local_ip[1];
        value local_IP : IPAddress;
    }

    block 'Raspberry Pi' {
        part server : 'Flask Server'[1];
        part display : 'LCD Touch Screen'[1];

        link : 'python' connect server::web_page to server::controller;
        link : 'HTTP' connect display::view to server::web_page;
        
    }

    block 'ESP8266 D1' {
        part light : light[1];
      	//value 'ON/OFF';
    }

    block 'Kasa WiFi Socket' {
        part table_lamp : table_lamp[1];
        //value 'ON/OFF';
    }

    block User {
        part browser : browser[1];
    }

    block System {
        part user : User[1];
        part raspberry_pi : 'Raspberry Pi'[1];
        part esp8266 : 'ESP8266 D1'[1];
        part kasa_wifi_socket : 'Kasa WiFi Socket'[3];
        link : 'HTTP' connect user::browser to raspberry_pi::server::web_page;
        
        link : 'HTTP' connect raspberry_pi::server::controller to esp8266;
        link : 'Socket' connect raspberry_pi::server::controller to kasa_wifi_socket;

    }
    
    

}