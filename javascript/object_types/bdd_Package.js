
/**
 * Represents a package that can be used for drawing bdds. 
 * Will contain all neccesary references
 */
class bdd_Package {

    /**
     * Constructor for the bdd_Package. Will assign the name and initialize empty arrays for the elements
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        this.blocks = new Array();
        this.value_type_definitions = new Array();
        this.assoc_blocks = new Array();
        this.references = new Array();
        this.values = new Array();
        this.parts = new Array();
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

    /**
     * Adds a block to the blocks array
     * @param {Block} block 
     */
    add_block(block) {
        this.blocks.push(block);
    }

    /**
     * Adds a Value_Type_Definition to the array
     * @param {Value_Type_Definition} v_t_d 
     */
    add_value_type_definition(v_t_d){
        this.value_type_definitions.push(v_t_d);
    }

    /**
     * Adds an Assoc_Block to the array
     * @param {Assoc_Block} assoc_block 
     */
    add_assoc_block(assoc_block) {
        this.assoc_blocks.push(assoc_block);
    }

    /**
     * Adds a Reference to the array
     * @param {Reference} reference 
     */
    add_reference(reference) {
        this.references.push(reference);
    }

    get_block_by_name(name) {
        for(var i = 0 ; i < this.blocks.length; i++) {
            if(this.blocks[i].name == name) {
                return this.blocks[i];
            }
        }
        return false;
    }

    /**
     * Adds a value into the package
     * @param {string} value
     */
    add_value(value){
        this.values.push(value);
    }

    get_or_create_part_by_name(name) {
        for(var i = 0; i < this.parts.length; i++) {
            if(this.parts[i].name == name) {
                return this.parts[i];
            }
        }
        return new Part(name);
    }

    add_part(part) {
        this.parts.push(part);
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
    
}