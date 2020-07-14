/**
 * Handles the block key word
 */
class HandleBlock extends HandleAssocBlock{
    
    /**
     * Handles the block key word. The handle_block_content() method will be used for handling the content inside the block
     */
    handle_block() {
        var active_block = this.get_block_by_name(this.syntaxReader.read_name());
        // Maybe uncomment this, for the wheel package example I made som changes is the get_block_by_name function and pushed the block there instead
        //this.active_package.add_block(active_block);
        // This was done to make sure the block created after being referenced as parts still got the same object reference at both places

        var next_char = this.syntaxReader.check_next_word();
        //var next_char = this.syntaxReader.read_next_char();

        switch(next_char) {
            case ";":
                this.syntaxReader.skip_next_char();
                // Done
                return;
            case "{":
                this.syntaxReader.skip_next_char();
                this.handle_block_content(active_block);
                break;
            case "specializes":
                this.syntaxReader.read_name();
                this.syntaxReader.skip_newlines_blankspace()
                this.specialize(active_block, next_char);
                break;
            case ":>":
                this.syntaxReader.skip_next_char();
                next_char = this.syntaxReader.read_next_char();

                if(next_char == ">") {
                    this.syntaxReader.skip_newlines_blankspace();

                    //Maybe use this instead of the current?
                    /*var old_block = active_block;

                    active_block = Object.assign(new Block(old_block.name), this.get_abstract_block_by_name(this.syntaxReader.read_name()));

                    active_block.name = old_block.name; */

                    /*
                    active_block = this.get_block_from_abstract_block(active_block.name, this.get_abstract_block_by_name(this.syntaxReader.read_name()));

                    this.replace_block_by_name(active_block.name, active_block);
                     */
                    this.specialize(active_block, next_char);
                    break;
                }
            default:
                this.syntaxReader.error("Expected ; or { ");
        }

    }

    /**
     * Add the specialize/subset block to the active block, same for specializes and :>
     * @param active_block
     * @param next_char
     */
    specialize(active_block, next_char) {
        let subset_name = this.syntaxReader.read_name();
        let subset_block = this.get_block_by_name(subset_name);
        active_block.add_subset(subset_block);
        this.syntaxReader.skip_newlines_blankspace();
        next_char = this.syntaxReader.read_next_char();
        if (next_char === ";") {
            //Done
            return;
        } else if(next_char === "{") {
            this.handle_block_content(active_block);
        } else if (next_char === ",") {
            this.more_than_one_specialize(active_block, next_char);
        } else {
            this.syntaxReader.error("Expected ;, { or , if more than 1 subset is to be used there need to be a space between the name and , for now ");
        }
    }

    more_than_one_specialize(active_block, next_action) {
        this.syntaxReader.skip_newlines_blankspace();
        next_action = this.syntaxReader.check_next_char();
        if (next_action === ",") {
            this.syntaxReader.skip_next_char()
            this.more_than_one_specialize(active_block, next_action);
        } else if( next_action === "{") {
            this.syntaxReader.skip_next_char()
            this.handle_block_content(active_block);
        }
        else if (next_action === ";") {
            this.syntaxReader.skip_next_char()
            //done
            return;
        } else {
            let subset_name = this.syntaxReader.read_name();
            let subset_block = this.get_block_by_name(subset_name);
            active_block.add_subset(subset_block);
            this.more_than_one_specialize(active_block, next_action);
        }
    }



}