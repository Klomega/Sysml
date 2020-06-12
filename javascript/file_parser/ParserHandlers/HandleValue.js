
class HandleValue extends HandleRef {
     /**
     * Reads the value and return a Value_Type object
     */
    handle_value() {
        this.syntaxReader.skip_newlines_blankspace();
        var value_name = this.syntaxReader.read_name();

        this.syntaxReader.skip_newlines_blankspace();
        this.syntaxReader.skip_next_char(); // Skip the : between the value name and the type name
        this.syntaxReader.skip_newlines_blankspace();

        var v_t_d = this.get_value_type_by_name(this.syntaxReader.read_name());

        var amount = this.syntaxReader.read_amount();

        this.syntaxReader.skip_newlines_blankspace();
        this.syntaxReader.skip_next_char(); // Skips the ;

        return new Value_Type(this.value_name, amount, v_t_d);
    }

}