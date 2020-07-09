
class BDD_GraphicalView extends GraphicalView{

    /**
     * Will Draw a Bdd view as a tree from the argument block. 
     * The draw_part_blocks_recursivly method will be used internally
     * @param {bdd_Package} _package 
     * @param {Block} block 
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     * @param {int} depth 
     */
    draw_bdd(_package, block, x, y, size, depth, draw_references, draw_links) {

        this.draw_references = draw_references;
        this.draw_links = draw_links;

        if(block.name.includes("::")) {
            var pack_name = block.name.split("::");
            var pack = get_package_by_name(pack_name[0]);
            if(pack) {
                var n_b = pack.get_block_by_name(pack_name[1]);
                if(n_b) {
                    block = n_b;
                }
            }
        }

        this._package = _package;
        this._size = size;

        this.drawn_parts = [];

        if(block.has_parts() || block.references.length != 0) {

            var package_x = x;
            var package_y = y;

            x += size;
            y += size;

            var _x = x;
            var _y = y;

            var childs = [];

            
            // used for getting the "medelvärde"
            var pos_sum = 0;

            var tup = this.draw_part_blocks_recursivly(block, x, y, size, depth);
            x += tup[1];
            childs = tup[0];

            this.package_layer.add(this.get_package_box(package_x, package_y, x /** 2 / block.parts.length + size */, size * 2 * depth + size,  "bdd " + _package.name + " : " + block.name));
            

            _x = pos_sum / block.parts.length;


            for(var i = 0; i < childs.length; i++) {
                this.block_layer.add(childs[i]);
            }
            
            /*if(this.draw_links) {
                // Draw the Links
                for(var i = 0; i < this.drawn_blocks.length; i++) {
                    for(var j = 0; j < this.drawn_blocks[i].links.length; j++) {
                        var link = this.drawn_blocks[i].links[j];
                        if(this.drawn_parts.includes(link.from) && this.drawn_parts.includes(link.to)) {
                            this.line_layer.add(this.get_assoc_line(link.from, link.to, link.assoc_block.name));
                        }
                
                    }
                }

            }*/
            

        } else { // If the block don't have any parts

            this.package_layer.add(this.get_package_box(x, y, size *3, size*3,  "bdd " + _package.name + " : " + block.name));
            this.block_layer.add(this.get_block_box(x + size , y + size , size, size, block.name, block.get_value_string(), "", block));

        }
        

        

        this.stage.add(this.package_layer);
        this.stage.add(this.block_layer);

        this.stage.add(this.line_layer);
        this.stage.add(this.info_box_layer);

        this.info_box_layer.hide();

    }

    /**
     *  Used by the draw_bdd method
     * 
     * Will return a tuple containing an array with konva objects to draw and the x position for the last object
     * 
     *  This will also draw the Part arrows and References to make sure the locations are correct
     * 
     * @param {Block} block 
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     * @param {int} depth 
     */
    draw_part_blocks_recursivly(block, x, y, size, depth) {

        if(depth > 1) {

            var _x = x;
            var _y = y;

            // Y difference between a block and its childs
            y += size * 2;

            var childs = [];
            var part_count = block.parts.length;

            // Set the block to the center of its parts,, or not ..
            _x += size * part_count;
            block.set_position_size(_x, _y, size, size);
            for(var i = 0; i < part_count; i++){

                // This is only for drawing the Links
                if(depth > 2) {
                    block.parts[i].set_position_size(x + size * block.parts[i].block.parts.length, y, size, size);
                } else {
                    block.parts[i].set_position_size(x, y, size, size);
                }
                
                this.drawn_parts.push(block.parts[i]);


                if(block.parts[i].block.name.includes("::")) {
                    var pack_name = block.parts[i].block.name.split("::");
                    var pack = get_package_by_name(pack_name[0]);
                    if(pack) {
                        var n_block =  pack.get_block_by_name(pack_name[1]);
                        var tup = this.draw_part_blocks_recursivly(n_block, x, y, size, depth -1);
                        this.line_layer.add(this.get_part_arrow(block, n_block, block.parts[i].name + " " + block.parts[i].amount));
                    } else {
                        var tup = this.draw_part_blocks_recursivly(block.parts[i].block, x, y, size, depth -1);
                        this.line_layer.add(this.get_part_arrow(block, block.parts[i].block, block.parts[i].name + " " + block.parts[i].amount));
                    }
                } else {
                    var tup = this.draw_part_blocks_recursivly(block.parts[i].block, x, y, size, depth -1);
                    this.line_layer.add(this.get_part_arrow(block, block.parts[i].block, block.parts[i].name + " " + block.parts[i].amount));
                }
                
                //x += size * 2;
                x = tup[1] + 2 * size;
               
                
                
                childs = childs.concat(tup[0]);
                
            }


            if(this.draw_references) {
                // Draw the references
                for(var i = 0; i < block.references.length; i++) {

                    var ref = block.references[i];
                    this.block_layer.add(this.get_block_box(x, y, size, size, ref.to.name, ref.to.get_value_string(), ref.to.get_parts_string(), ref.to));

                    this.line_layer.add(this.get_reference_arrow_by_coords(_x, _y, x, y, size, size, ref.name + " " + ref.amount));

                    x += 2 * size;


                }
            }
            

            // Draw the Value Types
            for(var i = 0; i < block.value_types.length; i++ ) {
                block.value_types[i].set_position_size(x, y, size, size);
                this.block_layer.add(this.get_value_type_box(x, y, size, size, block.value_types[i].value_type_definition.name, block.value_types[i].value_type_definition.get_value_string()));
               
                this.line_layer.add(this.get_part_arrow_by_coords(_x, _y, x, y, size, size, ""));
            
                x += 2 * size;
            }
            
            if(this.draw_links) {
                this.draw_links_of_block(block);
            }

            // Uncomment this for not drawing tree structure
            //if(!this.drawn_blocks.includes(block)) {
                //block.set_position_size(_x, _y, size, size); // Moved this to before the big for loop
                this.drawn_blocks.push(block);
                return [childs.concat(this.get_block_box(_x, _y, size, size, block.name, block.get_value_string(), "", block)), x];
            /*} else {
                return [[], 0];
            }*/
            
        } else {
            //x += size;
            //if(!this.drawn_blocks.includes(block)) {
                block.set_position_size(x, y, size, size);
                this.drawn_blocks.push(block);
                return [this.get_block_box(x, y, size, size, block.name, block.get_value_string(), block.get_parts_string(), block), x]
            /*} else {
                return [[],0];
            }*/
            
            
        }
    }

    draw_links_of_block(block) {
        for(var i = 0; i < block.links.length; i++) {
            if(this.drawn_parts.includes(block.links[i].from) && this.drawn_parts.includes(block.links[i].to)) {
                var link = block.links[i];
                this.line_layer.add(this.get_assoc_line(link.from, link.to, link.assoc_block.name));
            }
        }
    }
}


