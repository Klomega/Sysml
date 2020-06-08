

/**
 * The Reader is responible for reading chars from the file.
 * It will contain the position for the cursor and also locations
 * for error tracking
 */
class Reader {

    /**
     *  Contstructor for the Reader object
     *  Parameter file will the the file to chars from
     *  
     * @param {String} file 
     * @param {Array} space_newline_chars All the chars that is used for newlines and spaces that should be considered.
     */
    constructor(file, space_newline_chars) {
        this.file = file;
        this.pos = 0;
        this.end = file.length;
        this.space_newline_chars = space_newline_chars;

        // Used when throwing an error
        this.row = 1;
        this.col = 1;
    }

    /**
     * Will return true if the cursor position is greater than or equal to the file lenght
     */
    at_end() {
        if(this.pos >= this.end){
            return true;
        }
        return false;
    }

    /**
     * Will return the next char and moves the cursor to the next position
     * 
     * Also updates the .row and .col attributes
     */
    get_next_char() {
        
        if(this.at_end()) {
            console.log("something is wrong");
            this.error("");
        }

        var next_char = this.file.charAt(this.pos);

        this.pos++;
        this.col++;

        if([String.fromCharCode(10), "\n", "\r"].includes(next_char)) {
            this.row ++;
            this.col = 1;
        }
        return next_char;
    }
    /**
     * Skips the next char by moving the cursor
     */
    skip_next_char() {
        this.col++;
        if([String.fromCharCode(10), "\n", "\r"].includes(this.file.charAt(this.pos))) {
            this.row ++;
            this.col = 1;
        }
        this.pos++;
    }


    /**
     * Returns the next char without moving the cursor
     */
    check_next_char() {
        if(this.at_end()) {
            console.log("something is wrong");
            this.error("");
        }
        return this.file.charAt(this.pos);
    }

    /**
     * Returns the next word without moving the cursor.
     * 
     * This method has to be in the FileReader class since there will not 
     * be possible to use the other methods to read more than one char
     * without moving the cursor
     */
    check_next_word(){
        var temp_pos = this.pos;
        var next_word = "";
        
        while(!this.space_newline_chars.includes(this.file.charAt(temp_pos))) {
            next_word += this.file.charAt(temp_pos);
            temp_pos ++;
        }

        return next_word;
    }



    /**
     * Displays an alert and throws an error.
     * The error message will be extended with the row and column for the cursor
     * @param {String} message 
     */
    error(message) {
        var extended_message = message + " at row " + this.row + " col " + this.col;

        extended_message += "\n\n";

        for(var i = -30; i < 10; i++) {
            if(i + this.pos >= 0) {
                extended_message += this.file.charAt(i + this.pos);
            }
        }
        
        alert(extended_message);
        throw new Error(extended_message);
    }


}