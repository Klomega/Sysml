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
               // console.log(amount[0]);
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
                part.block = this.get_block_by_name(block_name);
                c_n_char = this.syntaxReader.check_next_char();

                //fetch the part that is to be redefine and add it to the current part redefines array
                if (c_n_char === ">") {
                    this.syntaxReader.skip_next_char();
                    this.syntaxReader.skip_newlines_blankspace();
                    let redefinition_part_name = this.syntaxReader.read_name();
                    let redefinition_part = this.handle_redefines_part(redefinition_part_name, block)
                    part.add_redefine(redefinition_part);
                    return part
                }
                //uses the subset routine
                this.syntaxReader.skip_newlines_blankspace();
                let subset_part = this.handle_subsets_part(block);
                part.add_subset(subset_part);
                return part;
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
        if (next_action === "redefines") {
            let redefinition_part_name = this.syntaxReader.read_name();
            let redefinition_part = this.handle_redefines_part(redefinition_part_name, block)
            part.add_redefine(redefinition_part);
            return part

            //The same subsets routine as above but when the user writes subsets instead of :>
        } else if (next_action === "subsets") {
            this.syntaxReader.skip_newlines_blankspace();
            let subset_part = this.handle_subsets_part(block);
            part.add_subset(subset_part);
            return part;
        } else {
            this.syntaxReader.error("The part is either not closed or keywords is missing");
        }

    }

    /**
     * Adds a part in the package, depending on keywords different functions are used
     * @returns {*}
     */
    handle_part_in_package() {

        var part_name = this.syntaxReader.read_name();
        var part = this.active_package.get_or_create_part_by_name(part_name);

        this.syntaxReader.skip_newlines_blankspace();

        let next_char = this.syntaxReader.read_next_char();;

        //checks for :> or :>>
        if (next_char === ":") {
            if (this.syntaxReader.check_next_char() === ">") {
                this.syntaxReader.skip_next_char();
                if (this.syntaxReader.check_next_char() === ">") {
                    this.syntaxReader.skip_next_char();
                    this.handle_redefines_in_parts(part);

                    next_char = this.syntaxReader.read_next_char();
                } else {
                next_char = this.handle_subsets_part_in_package(part, next_char);
                }
            } else {
                this.syntaxReader.skip_newlines_blankspace();
                var block_name = this.syntaxReader.read_name();
                var amount = this.syntaxReader.read_amount();
                this.syntaxReader.skip_newlines_blankspace();
                var block_of_part = this.get_block_by_name(block_name);
                this.syntaxReader.skip_newlines_blankspace();
                part.block = block_of_part;
                part.amount = amount;
                this.active_package.add_part(part);
                next_char = this.syntaxReader.read_next_char();
            }

        } else {
            let check = this.syntaxReader.check_next_word();
            if (check === "subsets") {
                next_char = this.handle_subsets_part_in_package(part, next_char);
            }
        }

        if (next_char === ";") {
            this.syntaxReader.skip_newlines_blankspace();
            return part;
        } else if (next_char === "{") {
            this.handle_part_content(part);
        } else {
            this.syntaxReader.error("Expected ; or {");
        }

    }

    /**
     * If a part ends with { this function is called, mostly for putting parts in parts or redefine parts in parts
     * @param part
     */
    handle_part_content(part) {
        this.syntaxReader.skip_newlines_blankspace();

        var next_keyword = this.syntaxReader.read_name();
        switch (next_keyword) {
            case 'part':
                this.syntaxReader.skip_newlines_blankspace();
                next_keyword = this.syntaxReader.read_name();
                if (next_keyword === "redefines") {
                    this.handle_redefines_in_parts(part);
                    break;
                } else {
                    this.handle_parts_in_part(part, next_keyword);
                    break;
                }
            case 'ref':
                this.syntaxReader.error("ref in a part");
                break;
            case 'value':
                this.syntaxReader.error("if a part have a value");
                break;
            case '}':
                //done
                return
            default:
                this.handle_parts_in_part(part);

                /*
                if (this.syntaxReader.check_next_char() == "}") {
                    this.syntaxReader.skip_next_char(); // skip the }
                    return;
                } else {
                    // Call same function again
                    this.handle_part_content(part);
                }

                 */
        }

    }

    /**
     * Makes a new part inside the previous part and adds it into it's parts array
     * @param part
     * @param next_keyword
     * @returns {*|Part}
     */
    handle_parts_in_part(part, next_keyword) {
        let new_part_name = next_keyword;
        this.syntaxReader.skip_newlines_blankspace();
        this.syntaxReader.skip_next_char();
        this.syntaxReader.skip_newlines_blankspace();
        let new_part_block = this.syntaxReader.read_name();
        let amount = this.syntaxReader.read_amount();
        var new_part = this.active_package.get_or_create_part_by_name(new_part_name);
        new_part.block = new_part_block;
        new_part.amount = amount;
        part.add_part(new_part);

        this.syntaxReader.skip_newlines_blankspace();
        var next_char = this.syntaxReader.read_next_char();
        if (next_char === ";") {
            //done
            return new_part;
        } else if (next_char === "{") {
            this.handle_part_content(new_part);
        }

    }
}