class HandleRef extends HandlePart{
    /**
     * Will read the reference and add the block parameter to the return Reference object
     * @param {Block} block 
     */
    handle_ref(block) {
        this.syntaxReader.skip_newlines_blankspace();
        var ref_name = this.syntaxReader.read_name();

        this.syntaxReader.skip_newlines_blankspace();
        this.syntaxReader.skip_next_char(); // Skip the : between the value name and the type name
        this.syntaxReader.skip_newlines_blankspace();

        var to_block_name = this.syntaxReader.read_name();

        this.syntaxReader.skip_newlines_blankspace();

        var amount = this.syntaxReader.read_amount();

        this.syntaxReader.skip_newlines_blankspace();
        this.syntaxReader.skip_next_char(); // Skips the ;

        return new Reference(ref_name, block, this.get_block_by_name(to_block_name), amount);
    }
}