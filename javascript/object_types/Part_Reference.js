/**
 * Represents a reference between two Parts
 */
class Part_Reference {
    /** 
     * @param {String} name 
     * @param {Part} from 
     * @param {Part} to 
     * @param {int} amount 
     */
    constructor(name, from, to, amount) {
        this.name = name;
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

}