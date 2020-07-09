class HandleAbstractBlock extends HandleValName {
    handle_abstract_block(){
        this.syntaxReader.skip_newlines_blankspace();
        var key_word = this.syntaxReader.read_key_word();
    
        if(key_word == "block") {
            this.syntaxReader.skip_newlines_blankspace();
            var a_b = this.get_abstract_block_by_name(this.syntaxReader.read_name());

            this.syntaxReader.skip_newlines_blankspace();

            var next_char = this.syntaxReader.read_next_char();
            if(next_char == "{"){
                this.handle_block_content(a_b);
            } else if(next_char == ";") {
                return;
            } else {
                this.syntaxReader.error("Expected { but got " + next_char);
            }

        } else {
            this.syntaxReader.error("Expected keyword block after abstract");
        }
    }

}