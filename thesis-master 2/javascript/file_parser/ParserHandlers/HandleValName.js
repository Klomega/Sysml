/**
 * Assign a value to the current block
 */
class HandleValName {
    /**
     * Set a value and it's property and store it in values in Block
     * @param {Block} block 
     * @param {String} value_name 
     */
    handle_val_name(block, value_name){

        this.syntaxReader.skip_newlines_blankspace();

        this.syntaxReader.skip_newlines_blankspace();

        var colon = this.syntaxReader.read_next_char(); // read the :

        if(colon == ":") {
            this.syntaxReader.skip_newlines_blankspace();
            var value_type = this.syntaxReader.read_name();
            
            //var amount = this.syntaxReader.read_amount();
            // Maybe Change this ??
            block.add_value(value_name + " : " + value_type + " " );//+ amount);

            this.syntaxReader.skip_next_char(); // Skip the ;

            this.syntaxReader.skip_newlines_blankspace();

        } else {
            this.syntaxReader.error("Expected :");
        }

    }
}