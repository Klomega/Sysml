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

        if(type == "type") {
            var v_t_d_name = this.syntaxReader.read_name();
            var v_t_d = this.get_value_type_by_name(v_t_d_name);
            
            var open_bracket = this.syntaxReader.read_next_char();
            if(open_bracket == "{") {
                this.handle_value_type_content(v_t_d);
            } else {
                this.syntaxReader.error("Expected { ");
            }
        } else {
            this.syntaxReader.error("Expected word type");
        }
        

    }

    /**
     * Handles the values inside a Value Type
     * 
     * Something is very wrong here.. Why handle end keyword ??
     * @param {Value_Type_Definition} v_t_d 
     */
    handle_value_type_content(v_t_d) {
        this.syntaxReader.skip_newlines_blankspace();
        
        var n_w = this.syntaxReader.read_name();
        


        var colon = this.syntaxReader.read_next_char();
        var g_t = this.syntaxReader.read_next_char();
        if(colon == ":" && g_t == ">") {
            this.syntaxReader.skip_newlines_blankspace();

            var n_w_2 = this.syntaxReader.read_name();
            
            this.syntaxReader.skip_next_char(); // Skips the ;
            this.syntaxReader.skip_newlines_blankspace();
            v_t_d.add_value(n_w + " : " + n_w_2);

            var n_c = this.syntaxReader.check_next_char();
            if(n_c == "}") {
                this.syntaxReader.skip_next_char();
            } else {
                this.handle_value_type_content(v_t_d);
            }
            
        } else {
            this.syntaxReader.error("Expected :> ");
        }
    }
}