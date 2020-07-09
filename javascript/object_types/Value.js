/**
 * Represents a Value. Contains a name and a property
 */
class Value{

    constructor(name, property) {
        this.name = name;
        this.property = property;

    }

    get_value_name() {
        return this.name;
    }

    get_value_property() {
        return this.property;
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
/*
    add_value_definition(new_value){
        this.value_definition.push(new_value);
    }
*/
}