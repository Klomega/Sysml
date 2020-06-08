
/**
 * The SyntaxReader is responsible for via using a Reader 
 * read based on the syntax 
 */
class SyntaxReader {

    /**
     *  Constructor for the SyntaxReader object. Will create a new instance of a FileReader object
     * @param {String} file 
     * @param {Array} space_newline_chars 
     */
    constructor(file, space_newline_chars) {
        this.space_newline_chars = space_newline_chars;
        this.reader = new Reader(file, space_newline_chars);
    }

    /**
     * Reads and returns the next key word
     */
    read_key_word() {
        var next_key_word = "";
        while(!this.space_newline_chars.concat(";", "{").includes(this.check_next_char())) {
            next_key_word += this.reader.get_next_char();
            if(this.at_end()) {
                break;
            }
        }

        //this.skip_newlines_blankspace();
        return next_key_word;

    }

    /**
     * Reads the next name. If the name is using the special syntax with '' then it uses the 
     * read_special_name method 
     */
    read_name() {
        if(this.check_next_char() == "'") {
            return this.read_special_name();
        } else {
            var next_name = "";
            while(!this.space_newline_chars.concat([";", ":", "[", "{"]).includes(this.check_next_char())) {
                next_name += this.reader.get_next_char();
            }

            this.skip_newlines_blankspace();
            return next_name;
        }
    }

    /**
     * This method should only be used by the read_name() method. Do not use it in other places
     */
    read_special_name() {
        var next_name = this.reader.get_next_char();

        while(this.check_next_char() != "'") {
            next_name += this.reader.get_next_char();
        }
        // The while loop will stop when the next char is the final '
        // So read it an add to the name
        next_name += this.reader.get_next_char();

        this.skip_newlines_blankspace();
        return next_name;
    }

    /**
     * Reads and removes the brackets and returns an int value with the amount
     */
    read_amount() {
        var amount_brackets = this.read_key_word();
        return parseInt(amount_brackets.slice(1, -1));
    }


    /**
     * Skips newline and blank spaces based on the char in the space_newline_chars array
     * until the next char is not included in the array
     */
    skip_newlines_blankspace() {

        while(!this.at_end()) {
            if(this.space_newline_chars.includes(this.check_next_char())) {
                this.reader.skip_next_char(); 
            } else {
                break;
            }
        }
        /* deprecated
        while(this.space_newline_chars.includes(this.check_next_char())) {
            if(!this.at_end()) {
                this.reader.skip_next_char();
            } else {
                break;
            }
            
        } */
    }

    /**
     * Returns the next word without moving the cursor
     */
    check_next_word() {
        return this.reader.check_next_word();
    }

    /**
     * Returns the next char without moving the cursor
     */
    check_next_char() {
        return this.reader.check_next_char();
    }

    /**
     * Returns the next char and moves the cursor
     */
    read_next_char() {
        return this.reader.get_next_char();
    }

    /**
     * Skips the next char by moving the cursor
     */
    skip_next_char() {
        this.reader.skip_next_char();
    }

    /**
     * Returns true if the cursor is at the end. Else false
     */
    at_end() {
        return this.reader.at_end();
    }

    /**
     * Throw an error using the Reader object
     * @param {String} message 
     */
    error(message) {
        this.reader.error(message);
    }

}