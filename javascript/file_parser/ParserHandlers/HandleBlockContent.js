class HandleBlockContent extends HandleBlock{
    
    /**
     *  This method will handle the content of a block and make sure it is added to that block
     * @param {Block} block 
     */
    handle_block_content(block) {
        this.syntaxReader.skip_newlines_blankspace();
        var next_keyword = this.syntaxReader.read_key_word();

        switch(next_keyword) {
            case "value":
                block.add_value_type(this.handle_value());
                break;
            case "part":
                block.add_part(this.handle_part(block));
                break;
            case "ref":
                block.add_reference(this.handle_ref(block));
                break;
            case "link":
                block.add_link(this.handle_link(block));
                break;
            default: // If just a value should be assigned
                     // and the value keyword is not used
                this.handle_val_name(block, next_keyword);
                break;
        }

        this.syntaxReader.skip_newlines_blankspace();
        if(this.syntaxReader.check_next_char() == "}") {
            this.syntaxReader.skip_next_char(); // skip the }
            return;
        } else {
            // Call same function again
            this.handle_block_content(block); 
        }

    }
}