class HandleImport extends HandleBlockContent{

    /**
     * Should be able to handle import but right now that isn't implemented
     * Only ISQ works and give often used variables a value.
     */
    handle_import() {
        var keyword = this.syntaxReader.read_name(); //get the name of the thing to import

        //Should read the name, search in a specific directory for the file with the same name.
        //When found should start read the file save the content to the software

        switch(keyword) {
            case "ISQ":
                this.handle_ISQ();
                break;
            case 'ScalarValues':
                this.handle_scalarValues();
                break;
            case 'Quantities':
                this.handle_quantities();
                break;
            case 'UnitsAndScales':
                this.handle_unitsAndScales();
                break;
            default:
                this.syntaxReader.error("Expected key word");
        }
        /*if(keyword === "ISQ") {
            this.handle_ISQ();
        }
        /*
        var file_search = require(keyword);
        var files = file_search.readdirSync('/home/tommy/eclipse-workspace/sysml.library/');
        const testFolder = './home/tommy/eclipse-workspace/sysml.library/';
        const fs = require('fs');

        fs.readdirSync(testFolder).forEach(file => {
            console.log(file);
        });
        */

    }
    handle_ISQ(){
        var length = new Value('length', 'LengthValue');
        var mass = new Value('mass', 'MassValue');
        var time = new Value('time', 'TimeValue');
        var temperature = new Value('temperature', 'TemperatureValue');
        var lumen = new Value('luminousIntensity', 'LuminousIntensityValue');
        var force = new Value('force', 'ForceValue');
        var speed = new Value('speed', 'SpeedValue');
        var torque = new Value('torque', 'TorqueValue');
        var energy = new Value('energy', 'EnergyValue');
        var scalar = new Value('scalar', 'Real');


        var keyword = this.syntaxReader.read_next_char();
        while(keyword != ";"){
            var keyword = this.syntaxReader.read_next_char();
        }
        this.syntaxReader.skip_newlines_blankspace();
        var keyword = this.syntaxReader.check_next_word();

        if(keyword === "import"){
            this.handle_import();
        } else {
            return keyword;
        }
    }

    handle_scalarValues(){

    }

    handle_quantities(){

    }

    handle_unitsAndScales(){

    }


}