class HandleLink extends HandleBlockContent {
    /**
     * Handles the link keyword and returns a new Link object
     */
    handle_link(block) {

        this.syntaxReader.skip_newlines_blankspace();

        var colon = this.syntaxReader.read_next_char(); // :

        this.syntaxReader.skip_newlines_blankspace();

        var assoc_rel_name = this.syntaxReader.read_name();

        this.syntaxReader.skip_newlines_blankspace();

        var connect = this.syntaxReader.read_key_word();

        this.syntaxReader.skip_newlines_blankspace();

        var part_name_1 = this.syntaxReader.read_name();
        var n_c = this.syntaxReader.check_next_char();
        if(n_c == ":") {
            var part1 = this.handle_link_name_colon(block.get_part_by_name(part_name_1).block, part_name_1);
        } else {
            var part1 = block.get_part_by_name(part_name_1);
        }
        this.syntaxReader.skip_newlines_blankspace();

        var to = this.syntaxReader.read_key_word();

        this.syntaxReader.skip_newlines_blankspace();
        
        var part_name_2 = this.syntaxReader.read_name();
        
        this.syntaxReader.skip_newlines_blankspace();

        var n_c = this.syntaxReader.check_next_char();
        if(n_c == ":") {
            var part2 = this.handle_link_name_colon(block.get_part_by_name(part_name_2).block, part_name_2);
        } else {
            var part2 = block.get_part_by_name(part_name_2);
        }

        this.syntaxReader.skip_newlines_blankspace();

        this.syntaxReader.skip_next_char(); // skip the ;

        var assoc_block = this.get_assoc_block_by_name(assoc_rel_name);

        return new Link(assoc_block, part1, part2);
         
    }

    handle_link_name_colon(block, part_name) {
        if(block == undefined) {
            this.syntaxReader.error("Something wrong with the link assignment. Make sure that the part name is correct " + part_name);
        }

        this.syntaxReader.skip_next_char(); // Skip the first :
        var n_c = this.syntaxReader.read_next_char();
        if(n_c == ":") {
            var part_name_2 = this.syntaxReader.read_name();

            var part2 = block.get_part_by_name(part_name_2);

            // If part don't exists
            if(!part2) {
                part2 = this.try_to_find_part(block, part_name_2);
                if(!part2) {
                    this.syntaxReader.error("Something wrong with assigning a link. \n Sure that the block and part reference is declared before? Block " + block.name + " dont contain part named " + part_name_2);
                }
            }
            
            if(this.syntaxReader.check_next_char() == ":") {
                return this.handle_link_name_colon(part2.block, part_name_2);
            } else {
                return part2;
            }

        } else {
            this.syntaxReader.error("Expected :: "); 
        }
    }

    try_to_find_part(block, part_name) {
        if(block.name.includes("::")) {
            var splitted = block.name.split("::");

            var pack = false;
            for(var i = 0; i < this.packages.length; i++) {
                if(this.packages[i].name == splitted[0]) {
                    var pack = this.packages[i];
                    i = this.packages.length; // Break
                }
            }

            if(pack) {
                var r_block = pack.get_block_by_name(splitted[1]);
                if(r_block) {
                    return r_block.get_part_by_name(part_name);
                } else {
                    return false;
                }
            } else {
                return false;
            }

        } else {
            return false;
        }
        
    }
}