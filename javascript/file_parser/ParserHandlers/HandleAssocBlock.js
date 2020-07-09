/**
 * This is not used..
 */
class HandleAssocBlock extends HandleAbstractBlock {
    /**
     * Handles the assoc_block key word
     * Creates an assocblock and connects two blocks as end points
     *
     */
    handle_assoc_block() {

        this.syntaxReader.skip_newlines_blankspace();
        var block_key_word = this.syntaxReader.read_key_word(); // Should be block
        if(block_key_word == 'block') {

            this.syntaxReader.skip_newlines_blankspace();
            var block_name = this.syntaxReader.read_key_word();
            block_name = new Assoc_Block(block_name);
            this.syntaxReader.read_next_char(); // {

            //Saves endpoints in an array, the pair right now is even and uneven
            //for example element 0 and element 1 is a pair, 6 and 7 etc.
            this.handle_end(block_name);
            this.handle_end(block_name);

            this.syntaxReader.skip_newlines_blankspace();
            this.syntaxReader.read_next_char(); // }
        } else {
            this.syntaxReader.error("Expected keyword block ");
        }
    }

    /**
     * Handles the end keyword inside an assoc block
     */
    handle_end(block_name) {
        this.syntaxReader.skip_newlines_blankspace();

        var end = this.syntaxReader.read_key_word();

        if(end == "end") {

            this.syntaxReader.skip_newlines_blankspace();

            var syntaxCheck = this.syntaxReader.read_key_word();

            if(syntaxCheck==":") {
                this.syntaxReader.skip_newlines_blankspace();
                var name = this.syntaxReader.read_name();
                var amount = this.syntaxReader.read_amount();
                block_name.set_part(name, amount);
                this.syntaxReader.skip_newlines_blankspace();
                this.syntaxReader.skip_next_char(); // Skip the ;
            }
            else {
                this.syntaxReader.error("Wrong syntax, did you forget : ? ");
            }
        } else {
            this.syntaxReader.error("expected keyword end ");
        }

    }
}