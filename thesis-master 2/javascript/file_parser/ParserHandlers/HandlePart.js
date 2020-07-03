class HandlePart extends HandleLink {
    /**
     * Reads the part
     */
    handle_part(block) {

        var part_name = this.syntaxReader.read_name();

        this.syntaxReader.skip_next_char(); // Skip the : between the part name and the block name
        this.syntaxReader.skip_newlines_blankspace();

        var block_name = this.syntaxReader.read_name();
        // If the Block is defined in an other package
        var c_n_char = this.syntaxReader.check_next_char();
        if (c_n_char == ":") {
            this.syntaxReader.skip_next_char();
            c_n_char = this.syntaxReader.read_next_char();
            if (c_n_char == ":") {
                block_name += "::" + this.syntaxReader.read_name();
            } else {
                this.syntaxReader.error("Expected ::");
            }
        }

        var ref_block = this.get_block_by_name(block_name);

        var amount = this.syntaxReader.read_amount();


        var part = block.get_or_create_part_by_name(part_name);
        part.block = ref_block;

        if (amount.length === 2) {
            part.amount = amount[0];
            part.upper_amount = amount[1];
        } else {
            part.amount = amount;
        }

        var next_char = this.syntaxReader.read_next_char();
        if (next_char == ";") {
            // Done
            return part;
        } else if (next_char == "{") {
            this.handle_part_content(part);
            return part;
        } else {
            this.syntaxReader.error("Expected ; or {");
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

        var part = this.active_package.get_or_create_part_by_name(part_name);

        this.active_package.add_part(part);

        this.syntaxReader.skip_newlines_blankspace();
        var check = this.syntaxReader.read_next_char();

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

        console.log(part);


    }
}