
/**
 *  The Parser is using a syntax reader to convert the syntax into Javascript objects
 */
class Parser extends HandleValueType{
                // The inheritance is beautiful chaos...
    /*

        How the inheritance is implemented

        Parser <- HandleValueType <- HandleValue <- HandleRef <- HandlePart <- HandleLink <- HandleBlockContent <- HandleBlock <- HandleAssocBlock <- HandleAbstractBlock <- HandleValName <- HandleImport

    */

    /**
     * Constructor for the Parser. Creates a new SyntaxReader object
     * 
     * It is also here the space and newline char are defined
     * @param {String} file 
     */
    constructor(file) {
        super();
        var space_newline_chars = [" ","\n", "\r", String.fromCharCode(10), String.fromCharCode(9), String.fromCharCode(0)];
        this.syntaxReader = new SyntaxReader(file, space_newline_chars);
        this.packages = new Array();
    }

    /**
     * Will return a bdd_Package with references to all objects in the package
     */
    get_parsed_packages() {
        
        // This array will be used during the parsing for making sure that the part references 
        // are the same
        this.parts = Array();

        this.abstract_blocks = Array();

        // While there cursor is not at the end
        while(!this.syntaxReader.at_end()) {
            this.syntaxReader.skip_newlines_blankspace();
            if(!this.syntaxReader.at_end()) {

                var next_keyword = this.syntaxReader.read_key_word();
                if(next_keyword != "}") { // If the file end with a } the parser will crash
                                        // I think that is fixed?
                    this.syntaxReader.skip_newlines_blankspace();
                }

                switch(next_keyword) {
                    case "package":
                        this.handle_package();
                        break;
                    case "import":
                        this.handle_import();
                        break;
                    case "block":
                        this.handle_block();
                        break;
                    case "part":
                        this.handle_own_part(); // parts can be outside a block in some cases and needs a function for it
                        break;
                    case "value":
                        this.handle_value_type();
                        break;
                    case "assoc":
                        this.handle_assoc_block();
                        break;
                    case "abstract":
                        this.handle_abstract_block();
                        break;
                    case "}":
                        // Done
                        break;
                    default:
                        this.syntaxReader.error("Expected key word");

                }

            }
        }


        return this.packages;
    }

    /**
     * Handles the package Key word
     */
    handle_package() {
        
        this.active_package = new bdd_Package(this.syntaxReader.read_name());
        this.packages.push(this.active_package);

        this.syntaxReader.skip_newlines_blankspace();
        this.syntaxReader.skip_next_char(); // Skips the { 

    }


    

    /**
     * Returns the package with the name that matches the parameter name
     * @param {String} name 
     * @param {Array} packages 
     */
    get_package_by_name(name, packages) {
        for(var i = 0; i < packages.length; i++) {
            if(packages[i].name == name) {
                return packages[i];
            } 
        }
        this.syntaxReader.error("package named " + name + " not found");
    }


     /**
     * Will return the Block object that matches with the name
     * If object not exists it will return a new object.
     * 
     * @param {String} name 
     */
    get_block_by_name(name) {
        for(var i = 0; i < this.active_package.blocks.length; i++) {
            if(this.active_package.blocks[i].name == name) {
                return this.active_package.blocks[i];
            }
        }
        var new_block = new Block(name);
        new_block.in_package = this.active_package;
        this.active_package.add_block(new_block);
        return new_block;
    }

    /**
     * If a block exists with the same name it will be replaced. 
     * @param {String} name 
     * @param {Block} block 
     */
    replace_block_by_name(name, block) {
        for(var i = 0; i < this.active_package.blocks.length; i++) {
            if(this.active_package.blocks[i].name == name) {
                this.active_package.blocks[i] = block;
                return;
            }
        }
     }


    /**
     * Will return the Value_Type_Definition object that matches with the name
     * If object not exists it will return a new object.
     * @param {String} name 
     */
    get_value_type_by_name(name) {
        for(var i = 0; i < this.active_package.value_type_definitions.length; i++) {
            if(this.active_package.value_type_definitions[i].name == name) {
                return this.active_package.value_type_definitions[i];
            }
        }
        var v_t_d = new Value_Type_Definition(name);
        this.active_package.add_value_type_definition(v_t_d);
        return v_t_d;s
    }

    /**
     * Will return the Assoc_Block that matches with the name.
     * If no Assoc_Block matches, a new will be created and returned
     * @param {String} name 
     */
    get_assoc_block_by_name(name) {
        for(var i = 0; i < this.active_package.assoc_blocks.length; i++) {
            if(this.active_package.assoc_blocks[i].name == name) {
                return this.active_package.assoc_blocks[i];
            }
        }
        return new Assoc_Block(name);
    }

    /**
     * Will return the Part object that matches with the name
     * If no Part object is matching, a new Part will be created and returned
     * @param {String} name 
     */
    get_part_by_name(name) {
        for(var i = 0; i < this.parts.length; i++) {
            if(this.parts[i].name == name) {
                return this.parts[i];
            }
        }
        var part = new Part(name, null, null);
        this.parts.push(part);
        return part;
    }
    
    /**
     * Will return the Abstract block that matches with the parameter name.
     * If no block matches it will create a new one with the name
     * @param {String} name 
     */
    get_abstract_block_by_name(name) {
        for(var i = 0; i < this.abstract_blocks.length; i++) {
            if(this.abstract_blocks[i].name == name) {
                return this.abstract_blocks[i];
            }
        }
        var a_b = new Abstract_Block(name);
        a_b.in_package = this.active_package;
        this.abstract_blocks.push(a_b);
        return a_b;
    }


    /**
     * Will copy the content of an abstract block to a new block. The new block will have the name from the parameter new_block_name
     * @param {String} new_block_name 
     * @param {Abstract_Block} abstract_block 
     */
    get_block_from_abstract_block(new_block_name, abstract_block) {
        var block = Object.assign(new Block(new_block_name), abstract_block);
        block.name = new_block_name;
        block.parts = Array();
        block.value_types = Array();
        block.references = Array();
        block.links = Array();
        block.in_package = abstract_block.in_package;
        block.values = Array();//abstract_block.values;

        for(var i = 0; i < abstract_block.values.length; i++) {
            block.add_value(abstract_block.values[i]);
        }

        var part_map = new Map();

        for(var i = 0; i < abstract_block.parts.length; i++) {
            var p = Object.assign(new Part(null,null,null), abstract_block.parts[i]);
            block.add_part(p);
            part_map.set(abstract_block.parts[i].name, p);

        }

        for(var i = 0; i < abstract_block.links.length; i++) {
            var link = abstract_block.links[i];

            var from = part_map.get(link.from.name);
            var to = part_map.get(link.to.name);

            block.add_link(new Link(link.assoc_block, from, to));
        }


        for(var i = 0; i < abstract_block.references.length; i++) {
            var ref = abstract_block.references[i];
            var from = block;
            var to = ref.to;
            block.add_reference(new Reference(ref.name, from, to, ref.amount));
        }

        for(var i = 0; i < abstract_block.value_types.length; i++) {
            block.add_value_type(abstract_block.value_types[i]);
        }
        return block;
    }

}