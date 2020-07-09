

class HandleSubsets extends HandleRef {

    handle_subsets_blocks(block) {
        let subsets_block = this.syntaxReader.read_name();
        this.syntaxReader.skip_newlines_blankspace();
        console.log(subsets_block);


    }

    handle_subsets_part(block) {
        let subset_part_name = this.syntaxReader.read_name();
        let subset_part = block.get_part_by_name(subset_part_name);
        if (this.syntaxReader.check_next_char() === ";") {
            this.syntaxReader.skip_newlines_blankspace();
            return subset_part_name;
        } else {
            this.syntaxReader.error("Expected ; after subset part")
        }

    }
}