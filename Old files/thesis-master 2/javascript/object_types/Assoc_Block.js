
/**
 * Represents an assoc block
 * 
 *      This is not implemented as it should be. Instead the links will only use the name 
 * 
 */
class Assoc_Block {
    
    /**
     * Constructor for the Assoc_Block. Takes a name a parameter and instantiates and empty array for the two parts
     * @param {String} name 
     */
    constructor(name) {
        this.name = name;
        /**
         * The parts array will contain the part at index 0 and the amount at index 1
         */
        this.parts = Array();
    }

    /**
     *  Adds a part to the assoc block. Throws an error if the block already got two parts. 
     * @param {Part} part 
     * @param {int} amount
     */
    set_part(part, amount) {
        if(this.parts.length < 2) {
            this.parts.push([part, amount]);
        } else {
            throw new Error("An assoc block should only have two parts.");
        }
    }
}