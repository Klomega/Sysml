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

    handle_own_part() {

        var part_name = this.syntaxReader.read_name();

        /*
        if(part_name === "redefines") {
            var part_name = this.handle_part_redefines();
        }
        */
        this.syntaxReader.skip_newlines_blankspace();

        var c_n_char = this.syntaxReader.check_next_char();
        if (c_n_char == ":") {
            this.syntaxReader.skip_next_char();
            c_n_char = this.syntaxReader.read_next_char();

            if (c_n_char === ">") {
                this.syntaxReader.skip_newlines_blankspace();
                var part_special = part_name + ":>" + this.syntaxReader.read_name();
            } else if (c_n_char === " ") {
                this.syntaxReader.skip_newlines_blankspace();
                var part_type = this.syntaxReader.read_name();
            } else {
                this.syntaxReader.error("Expected :> or only : ");
            }
        }

        this.syntaxReader.skip_newlines_blankspace();
        var next_char = this.syntaxReader.read_next_char();

        if (next_char === "{") {
            var part = new Part(part_name, null, null, part_type, null, null);
            this.parts.push(part);
            this.handle_part_content(part);
            //           return part;
        } else if (next_char === "[") {
            var amount = this.syntaxReader.read_from_to_amount();
            var part = new Part(part_name, null, null, amount[0], amount[1]);
            this.parts.push(part);
        }

        var next_char = this.syntaxReader.read_next_char();
        if (next_char == ";") {
            // Done
            return part;
        }
    }

    /**
     *
     * @param part is an object
     * This will check if a part is part of a part or if it should be redefined.
     */
    handle_part_content(part) {
        console.log(part);
        this.syntaxReader.skip_newlines_blankspace();
        var partAssignment = this.syntaxReader.read_key_word();
        if (partAssignment == "part") {
            this.syntaxReader.skip_newlines_blankspace();
            var action_check = this.syntaxReader.read_name();
            if (action_check === "redefines") {
                this.syntaxReader.skip_newlines_blankspace();
                var action_check = this.syntaxReader.read_next_char();
                if(action_check === "{") {
                    var part = new Part(part_name, null, null, part_type, null, null);
                    this.parts.push(part);
                    this.handle_part_content(part);
                } else if(action_check === "["){

                }

                var part_name = this.handle_part_redefines();
            }
            //this.handle_own_part(part);
        }
    }

    handle_part_redefines() {
        this.syntaxReader.skip_newlines_blankspace();
        var part_name = this.syntaxReader.read_name();
        //console.log(part_name);
        return part_name;
    }



/*
        if(partAssignment == "port") {
            console.log("porten");
        } else if(partAssignment == "ref") {
            console.log("ref");
            this.syntaxRead.skip_newlines_blankspace();
            var inOutCheck= this.syntaxReader.read_key_word();
            if(inOutCheck == "in") {
                console.log("in");
            } else if(console.log(inOutCheck == "out"){
                console.log("out");
            }
            else {
                this.syntaxReader.error("Expected in or out ");
            }

        }
        this.syntaxReader.error("A part should NOT have any content");
    }

 */
}