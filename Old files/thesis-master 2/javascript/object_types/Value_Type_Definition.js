
/**
 * Defines the values of a Value Type
 */
class Value_Type_Definition {

    /**
     * Constructor for the definition of a value type
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        this.values = Array();
    }

    /**
     * Adds a value to the values array
     * @param {String} value 
     */
    add_value(value) {
        this.values.push(value);
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

}