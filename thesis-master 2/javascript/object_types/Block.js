
/**
 * Representation of a block
 */
class Block  {

    /**
     *  Constructor for the Block object
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        this.parts = Array();
        this.values = Array();
        this.value_types = Array();
        this.references = Array();
        this.links = Array();

        this.special_links = Array();

        this.isPart_count = 0;

        this.in_package = "";
    }

    /**
     * Returns true is the block got parts
     */
    has_parts() {
        if(this.parts.length > 0) {
            return true;
        } else {
            return false;
        }
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
            part.block.increase_is_part();
        }
    }

    /**
     *  Add a string value to the array
     * @param {String} value 
     */
    add_value(value) {
        this.values.push(value);
    }

    /**
     * Add a value type to the array
     * @param {Value_Type} value_type 
     */
    add_value_type(value_type) {
        this.value_types.push(value_type);
    }

    /**
     * Adds a reference to the array
     * @param {Reference} reference 
     */
    add_reference(reference) {
        this.references.push(reference);
    }

    /**
     * Adds a Link to the array
     * @param {Link} link 
     */
    add_link(link) {
        this.links.push(link);
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

    get_part_by_name(name) {
        for(var i = 0; i < this.parts.length; i++) {
            if(this.parts[i].name == name) {
                return this.parts[i];
            }
        }
        return false;
        
    }


    get_or_create_part_by_name(name) {
        for(var i = 0; i < this.parts.length; i++) {
            if(this.parts[i].name == name) {
                return this.parts[i];
            }
        }
        return new Part(name);
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

    get_parts_string() {
        if(this.parts.length == 0) {
            return "";
        } else {
            var s = "";
            for(var i = 0; i < this.parts.length; i++) {
                s += this.parts[i].name + ": " + this.parts[i].block.name + "\n";
            }
            return s;
        }
    }


    get_block_description() {
        var s = "\n\n" + this.in_package.name + " ::" + this.name + "\n";
        s += "______________________________\n\nparts : \n";
        for(var i = 0; i < this.parts.length; i++) {
            if(this.parts[i].upper_amount === undefined){
                s += this.parts[i].name + " : " + this.parts[i].block.name + " " + this.parts[i].amount + "\n";
            } else {
            s += this.parts[i].name + " : " + this.parts[i].block.name + " " + "[" + this.parts[i].amount + ".." + this.parts[i].upper_amount + "]" + "\n";
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
            s += this.values[i] + "\n";
        }

        s += "______________________________\nvalue types : \n";
        for(var i = 0; i < this.value_types.length; i++) {
            s += this.value_types[i].name + "\n";
        }
        return s;
    }
}