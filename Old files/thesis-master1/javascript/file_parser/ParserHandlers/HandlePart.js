class HandlePart extends HandleLink {
    /**
     * Reads the part 
     */
    handle_part(block) {
        this.syntaxReader.skip_newlines_blankspace();
        var part_name = this.syntaxReader.read_name();

        this.syntaxReader.skip_newlines_blankspace();
        this.syntaxReader.skip_next_char(); // Skip the : between the part name and the block name
        this.syntaxReader.skip_newlines_blankspace();

        var block_name = this.syntaxReader.read_name();
        // If the Block is defined in an other package
        var c_n_char = this.syntaxReader.check_next_char();
        if(c_n_char == ":") {
            this.syntaxReader.skip_next_char();
            c_n_char = this.syntaxReader.read_next_char();
            if(c_n_char == ":") {
                block_name += "::" + this.syntaxReader.read_name();
            } else {
                this.syntaxReader.error("Expected ::");
            }
        }

        var ref_block = this.get_block_by_name(block_name);

        var amount = this.syntaxReader.read_amount();

        this.syntaxReader.skip_newlines_blankspace();

        
        var part = block.get_or_create_part_by_name(part_name);
        part.block = ref_block;
        part.amount = amount;
        
        var next_char = this.syntaxReader.read_next_char();
        if(next_char == ";") {
            // Done
            return part;
        } else if(next_char == "{"){
            this.handle_part_content(part);
            return part;
        } else {
            this.syntaxReader.error("Expected ; or {");
        }
    }

    handle_part_content(part) {
        this.syntaxReader.skip_newlines_blankspace();
        this.syntaxReader.error("A part should NOT have any content");
    }
}
