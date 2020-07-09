class HandlePart extends HandleLink {
    /**
     * Reads the part and acts from the keywords in SySml
     * Changed majority of the var to let, may need to check so everything works
     */
    handle_part(block) {

        let part_name = this.syntaxReader.read_name();
        this.syntaxReader.skip_newlines_blankspace();

        //If a part is to redefined it will use the function in HandleRedefines.js
        if (part_name === "redefines") {
            this.syntaxReader.skip_newlines_blankspace();
            let part = block.get_or_create_part_by_name(this.syntaxReader.read_name());
            return this.handle_redefines_part_property(block, part);
        }

        var part = block.get_or_create_part_by_name(part_name);

        this.syntaxReader.skip_next_char(); // Skip the : between the part name and the block name

        this.syntaxReader.skip_newlines_blankspace();

        let block_name = this.syntaxReader.read_name();

        var c_n_char = this.syntaxReader.check_next_char();

        //If the block of the part contains an amount that amount is returned
        //if no value the amount is set to default 1
        if (c_n_char === "[") {
            var amount = this.syntaxReader.read_amount();
            if (amount.length === 2) {
                part.amount = amount[0];
                part.upper_amount = amount[1];
            } else {
                part.amount = amount;
            }
            this.syntaxReader.skip_newlines_blankspace();
            c_n_char = this.syntaxReader.check_next_char();
        } else {
            part.amount = 1;
        }

        this.syntaxReader.skip_newlines_blankspace();
        var next_action = this.syntaxReader.read_name();
        //this if statement is a mess
        if (c_n_char == ":") {
            this.syntaxReader.skip_next_char();
            c_n_char = this.syntaxReader.read_next_char();
            // If the Block is defined in an other package
            if (c_n_char == ":") {
                block_name += "::" + this.syntaxReader.read_name();
                //checking if it's the shortcut of subsets or redefines
            } else if (c_n_char === ">") {
                c_n_char = this.syntaxReader.check_next_char();
                //fetch the part that is to be redefine and add it to the current part redefines array
                if (c_n_char === ">") {
                    this.syntaxReader.skip_next_char();
                    this.syntaxReader.skip_newlines_blankspace();
                    part.block = this.get_block_by_name(block_name);
                    let redefinition_part_name = this.syntaxReader.read_name();
                    let redefinition_part = this.handle_redefines_part(redefinition_part_name, block)
                    part.add_redefine(redefinition_part);
                    return part
                }
                //uses the subset routine
                this.syntaxReader.skip_newlines_blankspace();
                let subset_part = this.handle_subsets_part(block);
                return part.add_subset(subset_part);
            } else {
                this.syntaxReader.error("Expected :: or :>>");
            }
        }

        let ref_block = this.get_block_by_name(block_name);
        part.block = ref_block;

        if (c_n_char == ";") {
            // Done
            this.syntaxReader.skip_next_char();
            return part;
            //if a part contains a part his function is used
        } else if (c_n_char == "{") {
            this.syntaxReader.skip_next_char();
            this.handle_part_content(part);
            return part;
        }

        //The same redefines routine as above but when the user writes redefines instead of :>>
        if(next_action === "redefines" ) {
            let redefinition_part_name = this.syntaxReader.read_name();
            let redefinition_part = this.handle_redefines_part(redefinition_part_name, block)
            part.add_redefine(redefinition_part);
            return part
            //The same subsets routine as above but when the user writes subsets instead of :>
        } else if (next_action === "subsets") {
            this.syntaxReader.skip_newlines_blankspace();
            let subset_part = this.handle_subsets_part(block);
            return part.add_subset(subset_part);
        } else {
            this.syntaxReader.error("The part is either not closed or keywords is missing");
        }



    }


    handle_part_content(part) {
        var action = this.syntaxReader.read_name();
        switch (action) {
            case 'part':
                "part of a part"
                break;
            case 'ref':
                "ref in a part"
                break;
            case 'redefine':
                "if something is supposed to be redefined in a part"
                break;
            case 'value':
                "if a part have a value"
                break;
            case '}':
                //done
                break
            default:
                "sometimes values doesn't start with value"
        }

        if (this.syntaxReader.check_next_char() == "}") {
            this.syntaxReader.skip_next_char(); // skip the }
            return;
        } else {
            // Call same function again
            this.handle_part_content(part);
        }
    }

    /**
     * Adds a part in the package
     * @returns {*}
     */
    handle_part_in_package() {

        var part_name = this.syntaxReader.read_name();

        this.syntaxReader.skip_newlines_blankspace();

        let check = this.syntaxReader.read_next_char();

        if(check === ":") {
            this.syntaxReader.skip_newlines_blankspace();
            var block_name = this.syntaxReader.read_name();
            var block_of_part = this.get_block_by_name(block_name);
            var amount = this.syntaxReader.read_amount();
            this.syntaxReader.skip_newlines_blankspace();
            check = this.syntaxReader.read_next_char();
        }

        var part = this.active_package.get_or_create_part_by_name(part_name);
        part.block = block_of_part;
        part.amount = amount;
        this.active_package.add_part(part);

        if(check === ";") {
            this.syntaxReader.skip_newlines_blankspace();
            return part;
        } else if(this.syntaxReader.read_next_char() === "{") {
            this.syntaxReader.error("not yet implemented");
        }

        this.syntaxReader.skip_newlines_blankspace();
        this.syntaxReader.read_next_char();
        this.syntaxReader.skip_newlines_blankspace();

        var part_type = this.syntaxReader.read_name();

        //var part = new Part(part_name, null, null, part_type);

    }

}