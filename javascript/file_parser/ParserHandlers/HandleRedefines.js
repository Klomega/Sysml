/**
 * A class that handles the redefines tag from Sysml
 */
class HandleRedefines extends HandlePart {

    /**
     *Finds the part that is to be redefine and return it so it can be pushed
     * into the redefines array in current part
     * @param {String} redefinition_part_name the name of the part searched for
     * @param {block} block the current block
     * @returns {*}
     */
    handle_redefines_part(redefinition_part_name, block) {

        let redefine_block = this.get_block_by_name(block.subset[0]);

        for (var i = 0; i < redefine_block.parts.length; i++) {
            if (redefinition_part_name === redefine_block.parts[i].name) {
                var redefinition_part = redefine_block.parts[i];
            }
        }

        if (this.syntaxReader.read_next_char() === ";") {
            this.syntaxReader.skip_newlines_blankspace();
            return redefinition_part;
        } else {
        this.syntaxReader.error("Expected ;");
        }
    }

    /**
     *
     * @param {block} block
     * @returns {*}
     */
    handle_redefines_part_property(block, part) {
        this.syntaxReader.skip_newlines_blankspace();
        let amount = this.syntaxReader.read_amount();

        let redefine_block = this.get_block_by_name(block.subset[0]);
        for (var i = 0; i < redefine_block.parts.length; i++) {
            if (part.name === redefine_block.parts[i].name) {
                var redefine_part = redefine_block.parts[i];
            }
        }

        part.block = redefine_part.block;
        part.amount = amount;

        if(this.syntaxReader.read_next_char() === ";") {
            this.syntaxReader.skip_newlines_blankspace();
            return part;
        } else {
            this.syntaxReader.error("Expected ;");
        }
    }

    handle_redefines_import() {

    }

}