/**
 * Represents a Reference objects
 */
class Reference {


    /**
     * Constructor for the Reference object
     * @param {String} name 
     * @param {Block} from 
     * @param {Block} to 
     * @param {int} amount 
     */
    constructor(name, from, to, amount) {
        this.name = name;
        this.from = from;
        this.to = to;
        this.amount = amount;
    }
}