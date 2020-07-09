
/**
 * Represents a Value Type. Contains a definition for the Value Type
 */
class Value_Type {

    /**
     * Constructor for the Value_Type Object
     * @param {String} name 
     * @param {int} amount 
     * @param {Value_Type_Definition} value_type_definition 
     */
    constructor(name, amount, value_type_definition) {
        this.name = name;
        this.amount = amount;
        this.value_type_definition = value_type_definition;
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
}