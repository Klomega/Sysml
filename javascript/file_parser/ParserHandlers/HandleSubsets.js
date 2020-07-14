

class HandleSubsets extends HandleRef {

    handle_subsets_part(block) {
        let subset_part_name = this.syntaxReader.read_name();
        let subset_part = block.get_part_by_name(subset_part_name);
        if (this.syntaxReader.check_next_char() === ";") {
            this.syntaxReader.skip_next_char();
            this.syntaxReader.skip_newlines_blankspace();
            return subset_part;
        } else {
            this.syntaxReader.error("Expected ; after subset part")
        }

    }

    handle_subsets_part_in_package(part, next_char) {
        this.syntaxReader.read_name();
        this.syntaxReader.skip_newlines_blankspace();
        let subset_block_name = this.syntaxReader.read_name();
        for (var i = 0; i < this.active_package.parts.length; i++) {
            if (subset_block_name === this.active_package.parts[i].name) {
                var subset_block = this.active_package.parts[i];
            }
        }

        //let subset_part = this.active_package.get_part_by_name(subset_part_name);
        part.block = subset_block.block;
        part.add_subset(subset_block);
        this.syntaxReader.skip_newlines_blankspace();
        return this.syntaxReader.read_next_char();
    }
}