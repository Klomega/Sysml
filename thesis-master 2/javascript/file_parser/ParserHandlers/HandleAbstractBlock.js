/**
 * Handles the abstract key word
 */
class HandleAbstractBlock extends HandleValName {
    handle_abstract_block(){
        
        var key_word = this.syntaxReader.read_key_word();

        if(key_word == "block") {
            
            var a_b = this.get_abstract_block_by_name(this.syntaxReader.read_name());

            var next_char = this.syntaxReader.read_next_char();
            if(next_char == "{"){
                this.handle_block_content(a_b);
            } else if(next_char == ";") {
                return;
            } else {
                this.syntaxReader.error("Expected { or ; but got " + next_char);
            }

        } else {
            this.syntaxReader.error("Expected keyword block after abstract");
        }
    }

}