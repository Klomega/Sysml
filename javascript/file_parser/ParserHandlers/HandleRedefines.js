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
    handle_redefines_part(redefine_part_name, block) {

        var amount = this.syntaxReader.read_amount();
        for (var i = 0; i < block.subsets.length; i++) {
            if (block.subsets[i].get_part_by_name(redefine_part_name)) {
                var copy_part = block.subsets[i].get_part_by_name(redefine_part_name);
                var redefine_part = new Part(copy_part.name, copy_part.block, null, null);

                redefine_part.amount = amount;
            }
        }

        if (this.syntaxReader.read_next_char() === ";") {
            this.syntaxReader.skip_newlines_blankspace();
            return redefine_part;
        } else {
            this.syntaxReader.error("Expected ;");
        }
    }


    /**
     *  Finds the part in the from the subset blocks, adds properties from that part to the current
     * @param {block} block
     * @param {part} part
     * @returns {*}
     */
    handle_redefines_part_property(block, part) {

        this.syntaxReader.skip_newlines_blankspace();
        let amount = this.syntaxReader.read_amount();

        for (var i = 0; i < block.subsets.length; i++) {
            if (block.subsets[i].get_part_by_name(part.name)) {
                var redefine_part = block.subsets[i].get_part_by_name(part.name);
            }
        }

        part.block = redefine_part.block;
        part.amount = amount;

        if (this.syntaxReader.read_next_char() === ";") {
            this.syntaxReader.skip_newlines_blankspace();
            return part;
        } else {
            this.syntaxReader.error("Expected ;");
        }
    }

    /**
     * Used when redefines keyword is used inside parts, the first part uses the subsets to find the correct
     * part. the next part of the part checks if the name of redefine exists in subset to find the correct block.
     * In the part the values of the redefine part/blocks i both saved as block and in redefines. Will have to
     * look if that is correct
     * @param part
     */
    handle_redefines_in_parts(part) {
        this.syntaxReader.skip_newlines_blankspace();
        let redefine_name = this.syntaxReader.read_name();

        //This is for the first part of the parts of parts series where a subset exist
        if (part.subsets.length > 0) {
            for (var i = 0; i < part.subsets.length; i++) {
                for (var j = 0; j < part.subsets[i].parts.length; j++) {
                    if (redefine_name === part.subsets[i].parts[j].name) {
                        var copy_part = part.subsets[i].parts[j];//part.subsets[i].get_part_by_name(part.name);
                        let block = this.active_package.get_block_by_name(copy_part.block);
                        var redefine_part = new Part(copy_part.name, block, null, null);
                        part.parts = redefine_part;
                        redefine_part.redefines = copy_part;
                    }
                }
            }
        }

        //This function runs as long as the redefines array have parts
        if (part.redefines.parts != undefined) {
            for (var i = 0; i < part.redefines.parts.length; i++) {
                if (redefine_name === part.redefines.parts[i].name) {
                    var copy_part = part.redefines.parts[i];
                    var redefine_part = new Part(copy_part.name, copy_part.block, null, null);
                    part.parts = redefine_part;
                    redefine_part.add_redefine(part.redefines.parts[i]);
                }

            }

        }

        if (part.block != undefined) {
            if (part.block.get_part_by_name(redefine_name)) {
                var copy_part_properties = part.block.get_part_by_name(redefine_name);
                var redefine_part = new Part(copy_part_properties.name, copy_part_properties.block, null, null);
                part.add_redefine(redefine_part);
            }
        }

        let amount = this.syntaxReader.read_amount();

        if (amount === undefined) {
            redefine_part.amount = 1;
        } else if (amount.length === 2) {
            redefine_part.amount = amount[0];
            redefine_part.upper_amount = amount[1];
        } else {
            redefine_part.amount = amount;
        }


        this.syntaxReader.skip_newlines_blankspace();
        let next_char = this.syntaxReader.read_next_char();

        if (next_char === ";") {
            //done
            return
        } else if (next_char === "{") {
            this.handle_part_content(redefine_part);
        }

    }

    redefines_value() {

    }

/*
    handle_redefines_parts_in_package(part) {
        console.log(part);
        this.syntaxReader.skip_newlines_blankspace();
        let redefine_name = this.syntaxReader.read_name();
        console.log(redefine_name);
        for (var i = 0; i < part.subsets.length; i++) {

            for (var j = 0; j < part.subsets[i].parts.length; j++) {
                if (redefine_name === part.subsets[i].parts[j].name) {
                    var copy_part = part.subsets[i].parts[j];//part.subsets[i].get_part_by_name(part.name);
                    var redefine_part = new Part(copy_part.name, copy_part.block, null, null);
                    redefine_part.parts = copy_part.parts;
                }
            }
        }

        let amount = this.syntaxReader.read_amount();

        if (amount === undefined) {
            redefine_part.amount = 1;
        } else if (amount.length === 2) {
            redefine_part.amount = amount[0];
            redefine_part.upper_amount = amount[1];
        } else {
            redefine_part.amount = amount;
        }

        part.add_redefine(redefine_part);
        this.syntaxReader.skip_newlines_blankspace();
        let next_char = this.syntaxReader.read_next_char();

        if (next_char === ";") {
            //done
            return
        } else if (next_char === "{") {
            this.handle_part_content(redefine_part);
        }
    }

 */

}
