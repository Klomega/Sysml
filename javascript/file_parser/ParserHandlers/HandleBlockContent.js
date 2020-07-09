/**
 *  Handles the content of a block
 * 
 */
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
                this.syntaxReader.skip_newlines_blankspace();
                var type_of_action = this.syntaxReader.read_name();
                //If it's a value type that function is used
                if (type_of_action === "type") {
                    this.handle_value(block);
                    //block.add_value_type(this.handle_value(block)); Detta var den första
                } else {
                    //If it's a value assigned to a block
                    this.handle_val_name(block, type_of_action);
                }
                break;
            case "part":
                block.add_part(this.handle_part(block));
                for (var i = 0; i < block.parts.length; i++) {
                    if (block.parts[i].redefines.length > 0) {
                        console.log(block.parts[i].redefines[0]);
                    }
                }
                break;
            case "ref":
                block.add_reference(this.handle_ref(block));
                break;
            case "link":
                block.add_link(this.handle_link(block));
                break;
            case "}":
                this.syntaxReader.skip_newlines_blankspace();
                return;
            default:
                // If just a value should be assigned
                // and the value keyword is not used
                if (next_keyword === "subsets") {
                    this.handle_subsets_blocks();
                } else if(next_keyword === ":") {
                    if (next_keyword === ">") {
                        this.handle_subsets_blocks(block);
                    }
                } else {
                this.handle_val_name(block, next_keyword);
                break;
                }
        }

        if(this.syntaxReader.check_next_char() == "}") {
            this.syntaxReader.skip_next_char(); // skip the }
            return;
        } else {
            // Call same function again
            this.handle_block_content(block); 
        }

    }
}