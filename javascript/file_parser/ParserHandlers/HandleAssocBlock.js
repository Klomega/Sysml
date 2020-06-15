/**
 * This is not used..
 */
class HandleAssocBlock extends HandleAbstractBlock {
    /**
     * Handles the assoc_block key word
     * 
     * Not finished since it is not adding the assoc_block to the package...
     */
    handle_assoc_block() {
        this.syntaxReader.error("Assoc blocks is not implemented");

        this.syntaxReader.skip_newlines_blankspace();
        var block_key_word = this.syntaxReader.read_key_word(); // Should be block
        if(block_key_word == 'block') {

            this.syntaxReader.skip_newlines_blankspace();
            var open_bracket = this.syntaxReader.read_next_char(); // {

            this.handle_end();
            this.handle_end();

            this.syntaxReader.skip_newlines_blankspace();
            var close_bracket = this.syntaxReader.read_next_char(); // }
        } else {
            this.syntaxReader.error("Expected keyword block ");
        }
    }

    /**
     * Handles the end keyword inside an assoc block
     */
    handle_end() {
        this.syntaxReader.skip_newlines_blankspace();
        var end = this.syntaxReader.read_key_word();
    
        if(end = "end") {
            this.syntaxReader.skip_newlines_blankspace();

            var block_name = this.syntaxReader.read_name();

            this.syntaxReader.skip_newlines_blankspace();

            var amount = this.syntaxReader.read_amount();

            this.syntaxReader.skip_newlines_blankspace();
            this.syntaxReader.skip_next_char(); // Skip the ;

        } else {
            this.syntaxReader.error("Expected keyword end ");
        }

    }
}