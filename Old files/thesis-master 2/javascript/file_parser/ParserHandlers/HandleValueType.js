/**
 * Handles the value type key word
 */
class HandleValueType extends HandleValue{

    /**
     * Handles the value type key word
     */
    handle_value_type() {
        this.syntaxReader.skip_newlines_blankspace();
        var type = this.syntaxReader.read_key_word();

            var v_t_d_name = this.syntaxReader.read_name();
            var v_t_d = this.get_value_type_by_name(v_t_d_name);
            
            var open_bracket = this.syntaxReader.read_next_char();
            if(open_bracket == "{") {
                this.handle_value_type_content(v_t_d);
            } else {
                this.syntaxReader.error("Expected { ");
            }
    }

    /**
     * Handles the values inside a Value Type
     * 
     * Something is very wrong here.. Why handle end keyword ??
     * Different outcomes inside the value type has been set up but it's not clear how everything should be saved.
     * @param {Value_Type_Definition} v_t_d 
     */
    handle_value_type_content(v_t_d, value_type) {

        this.syntaxReader.skip_newlines_blankspace();
        var checker = this.syntaxReader.read_name();
        this.syntaxReader.skip_newlines_blankspace();

        if (checker === "value") {
            this.syntaxReader.skip_newlines_blankspace();
            var value_check = this.syntaxReader.read_name();
            if (value_check === "redefines") {
                //not done
                this.syntaxReader.error("redefine is not done yet");
                this.handle_redefines_in_value_type();
            } else {
                let value_name = value_check;
                this.skip_deadspace();
                let value_property = this.syntaxReader.read_name();

                if (this.syntaxReader.read_next_char() === ";") {
                    v_t_d.add_value(value_name + " : " + value_property);
                    //value_type.inside_type.push(v_t_d.add_value(value_name + " : " + value_property));
                    //console.log(value_type);
                    this.syntaxReader.skip_newlines_blankspace();
                    if (this.syntaxReader.read_next_char() === "}") {
                        //done
                        return (v_t_d.add_value(value_name + " : " + value_property));
                    } else {
                        this.handle_value_type_content(v_t_d, value_type);
                    }
                }
            }
        } else if (checker === "ref") {
            //not done yet
            this.syntaxReader.error("ref is not done yet");
            this.handle_ref_in_value_type();
        } else {
            let value_name = value_check;
            this.syntaxReader.skip_newlines_blankspace();
            //let colon = this.syntaxReader.read_next_char();
            //let greater = this.syntaxReader.read_next_char();
            this.syntaxReader.skip_newlines_blankspace();
            let value_property = this.syntaxReader.read_name();
            v_t_d.add_value(value_name + " : " + value_property);
            this.syntaxReader.skip_newlines_blankspace();

        }
    }


            /*
            if(colon == ":" && g_t == ">") {
                this.syntaxReader.skip_newlines_blankspace();
                this.syntaxReader.skip_next_char(); // Skips the ;
                this.syntaxReader.skip_newlines_blankspace();

                var value_property = this.syntaxReader.read_name();
                console.log(value_property);
                var h = this.syntaxReader.skip_next_char(); // Skips the ;
                console.log(h);
                this.syntaxReader.skip_newlines_blankspace();
                v_t_d.add_value(checker + " : " + value_property);

                var n_c = this.syntaxReader.check_next_char();
                if(n_c == "}") {
                    this.syntaxReader.skip_next_char();
                } else {
                    this.handle_value_type_content(v_t_d);
                }

            } else {
                this.syntaxReader.error("Expected :> ");
            }

             */



    handle_redefines_in_value_type() {

    }

    handle_ref_in_value_type() {

    }

    /**
     * Skips the empty space between names and properties return the colons
     * @returns {*}
     */
    skip_deadspace() {
        this.syntaxReader.skip_newlines_blankspace();
        let read_char = this.syntaxReader.read_next_char();
        this.syntaxReader.skip_newlines_blankspace();
        return read_char;
    }
}