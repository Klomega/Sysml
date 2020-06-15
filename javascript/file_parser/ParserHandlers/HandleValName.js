/**
 * Handles a value that is assigned without the keyword value
 */
class HandleValName {
    /**
     * Handles a value that is assigned without a keyword
     * @param {Block} block 
     * @param {String} value_name 
     */
    handle_val_name(block, value_name){

        this.syntaxReader.skip_newlines_blankspace();
        var colon = this.syntaxReader.read_next_char(); // read the :
        var greater_than = this.syntaxReader.read_next_char(); // read the >

        if(colon == ":" && greater_than == ">") {
            this.syntaxReader.skip_newlines_blankspace();
            var value_type = this.syntaxReader.read_name();
            
            //var amount = this.syntaxReader.read_amount();
            // Maybe Change this ??
            block.add_value(value_name + " : " + value_type + " " );//+ amount);

            this.syntaxReader.skip_next_char(); // Skip the ;

            this.syntaxReader.skip_newlines_blankspace();

        } else {
            this.syntaxReader.error("Expected :>");
        }

    }
}