/**
 * Handles the value keyword
 */
class HandleValue extends HandleSubsets {
     /**
     * Reads the value and return a Value_Type object
     */
    handle_value(block) {
         this.syntaxReader.skip_newlines_blankspace();
         var value_name = this.syntaxReader.read_name();
         this.syntaxReader.skip_newlines_blankspace();

         var action = this.syntaxReader.read_next_char(); // Skip the : between the value name and the type name
         if(action === "{") {
             //this.syntaxReader.error("value or value types isn't supported yet");
             var v_t_d = this.get_value_type_by_name(value_name);
             //let value_type = new Value_Type(value_name, null, v_t_d);
             this.handle_value_type_content(v_t_d, value_name);
             block.add_value_type(v_t_d);
             return
             //block.add_value_type(this.handle_value_type_content(v_t_d, value_name));
         } else {
            var v_t_d = this.get_value_type_by_name(value_name);
            if (action === ";") {
                var v_t_d = this.get_value_type_by_name(value_name);
                return new Value_Type(value_name, null, v_t_d);
            } else {
                this.syntaxReader.error("expected ;")
            }
         }
     }
/*
     handle_value_type() {
         this.syntaxReader.skip_newlines_blankspace();

         var value_type_name = this.syntaxReader.read_name();

         console.log(value_type_name);

         var checker = this.syntaxReader.check_next_char();

         if (checker === ";") {
             console.log(value_type_name);
             return value_type_name;
         } else if(checker === "{") {
             var value_type_name = new Value_Type_Definition(value_type_name);
             this.handle_value_in_value_type(value_type_name);

         }
    }

    handle_value_in_value_type(value_type_name) {
        this.syntaxReader.skip_newlines_blankspace();
        var checker = this.syntaxReader.read_name();
        if (checker != "value") {
            this.syntaxReader.error("not a value or value type");
        }
        this.syntaxReader.skip_newlines_blankspace();
        checker = this.syntaxReader.read_name();
        if (checker === "type") {
            this.syntaxReader.skip_newlines_blankspace();
            value_type_name.add_value(this.syntaxReader.read_name());
            this.handle_value_type();
        }
    }

 */
}

