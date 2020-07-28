
/**
 * Represents a Part object. Will contain a name, an amount and a referece to a block 
 */
class Part {

    /**
     * Constructor for the Part object
     * @param {String} name 
     * @param {Block} block 
     * @param {int} amount 
     */
    constructor(name, block, amount, upper_amount) {
        this.type = "part";
        this.name = name;
        this.block = block;
        this.amount = amount;
        this.upper_amount = upper_amount

        //If a part contains other parts
        this.parts = Array();
        this.subsets = Array();
        this.redefines = Array();
        this.links = Array();
        this.values = Array();
        this.value_types = Array();

        // For the usecase of Engineering processes part references is also used
        //changed from part_references
        this.references = Array();

        this.isPart_count = 0;

        this.in_package = "";
    }


    /**
     * Increases the isPart_count attribute.
     * This should only be used by the add_part method from the other object
     */
    increase_is_part() {
        this.isPart_count ++;
    }

    /**
     * Adds a Part object to the .parts array and calls the increase_is_part method on the part.block object
     * The method also ensures that there will not be multiple parts with the same name
     *
     * @param {Part} part
     */
    add_part(part) {
        if(!this.get_part_by_name(part.name)) {
            this.parts.push(part);
            part.increase_is_part();
        }
    }



    /**
     * Returns true if the part got parts
     */
    has_parts() {
        if(this.parts.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    get_part_block() {
        return this.block;
    }

    add_redefine(part) {
        this.redefines.push(part);
    }

    add_subset(part) {
        this.subsets.push(part);
    }
/*
    add_part(part) {
        this.parts.push(part);
    }


 */
    add_value(part) {
        this.values.push(part);
    }

    /**
     * Add a position in the graphical view
     * @param {int} x 
     * @param {int} y 
     * @param {int} width
     * @param {int} height
     */
    set_position_size(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Gets the position that is set using set_position_size() method
     */
    get_position_size() {
        return [this.x, this.y, this.width, this.height];
    }

    get_value_string() {
        if(this.values.length == 0) {
            return "";
        } else {
            var s = "";
            for(var i = 0; i < this.values.length; i++) {
                s += this.values[i] + "\n";
            }
            return s;
        }
    }

    get_part_by_name(name) {
        for(var i = 0; i < this.parts.length; i++) {
            if(this.parts[i].name == name) {
                return this.parts[i];
            }
        }
        return false;

    }s

    get_block_description() {
        var s = "\n\n" + this.in_package + " ::" + this.name + "\n";
        s += "______________________________\n\nparts : \n";
        for(var i = 0; i < this.parts.length; i++) {
            if(this.parts[i].upper_amount === undefined){
                s += this.parts[i].name + " : " + this.parts[i].block + " " + "[" + this.parts[i].amount + "]" + "\n";
            } else {
                s += this.parts[i].name + " : " + this.parts[i].block + " " + "[" + this.parts[i].amount + ".." + this.parts[i].upper_amount + "]" + "\n";
            }
        }
        s += "______________________________\nreferences : \n";
        for(var i = 0; i < this.references.length; i++) {
            s += this.references[i].name + "\n";
        }

        s += "______________________________\nlinks : \n";
        for(var i = 0; i < this.links.length; i++) {
            s += this.links[i].assoc_block.name + "  " + this.links[i].from.name + " to " + this.links[i].to.name + "\n";
        }

        s += "______________________________\nvalues : \n";
        for(var i = 0; i < this.values.length; i++) {
            if(this.values[i] === undefined ) {
                s += "\n";
            } else {
                s += this.values[i] + "\n";
            }
        }
        return s;
    }
}