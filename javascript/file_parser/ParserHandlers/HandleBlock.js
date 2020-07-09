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

        var next_char = this.syntaxReader.read_next_char();

        switch(next_char) {
            case ";":
                // Done
                return;
            case "{":
                this.handle_block_content(active_block);
                break;
            case ":":
                next_char = this.syntaxReader.read_next_char();
                if(next_char == ">") {
                    this.syntaxReader.skip_newlines_blankspace();
                    /*var old_block = active_block;

                    active_block = Object.assign(new Block(old_block.name), this.get_abstract_block_by_name(this.syntaxReader.read_name()));

                    active_block.name = old_block.name; */


                    /*
                    active_block = this.get_block_from_abstract_block(active_block.name, this.get_abstract_block_by_name(this.syntaxReader.read_name()));

                    this.replace_block_by_name(active_block.name, active_block);
                     */
                    let subset_block = this.syntaxReader.read_name();
                    active_block.add_subset(subset_block);
                    this.syntaxReader.skip_newlines_blankspace();
                    next_char = this.syntaxReader.read_next_char();
                    if(next_char == "{"){
                        this.handle_block_content(active_block);
                    } else if (next_char === ";") {
                        this.syntaxReader.skip_newlines_blankspace();
                        console.log(active_block);
                        return;
                    }
                } else {
                    this.syntaxReader.error("Expected :> ");
                }
                break;
            default:
                this.syntaxReader.error("Expected ; or { ");
        }

    
    }
}