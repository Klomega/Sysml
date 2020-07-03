
class Special_BDD_GraphicalView extends GraphicalView {

    /**
     * 
     * @param {bdd_Package} _package
     * @param {Block} block 
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     * @param {int} depth 
     */

    draw_special_bdd(_package, block, x, y, size, depth_from, depth_to, draw_part_arrows, draw_references, draw_links) {

        this.draw_links = draw_links;
        this.draw_part_arrows = draw_part_arrows;

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
        var _x = x;
        var _y = y;
        x += size;
        y += size;

        var childs = [];
        this._size = size;

        var package_x = _x;
        var package_y = _y;
       
        var depth = 0;

        var base_parts = this.recursive_get_skip(depth_from, block);

        this.drawn_blocks = [];
        this.drawn_parts = [];

        for(var i = 0; i < base_parts.length; i++) {
        
            base_parts[i].set_position_size(x, y, size, size);
            base_parts[i].block.set_position_size(x,y,size, size);

            this.drawn_blocks.push(base_parts[i].block);
            this.drawn_parts.push(base_parts[i]);

            this.block_layer.add(this.get_block_box(x, y, size, size, base_parts[i].block.name, base_parts[i].block.get_value_string() ,"", base_parts[i].block));

            var tup = this.draw_parts_recursivly(base_parts[i].block, x , y , size, depth + 1, depth_to);
            
            if(tup[0] > _x) {
                _x = tup[0];
            }
            
            y = tup[1] + 2 * size;
            
            

        }

        if(draw_links) {
            // Link from the master block
            for(var i = 0; i < block.links.length; i++) {
                if(this.drawn_parts.includes(block.links[i].from) && this.drawn_parts.includes(block.links[i].to)) {
                    this.line_layer.add(this.get_assoc_line(block.links[i].from, block.links[i].to, block.links[i].assoc_block.name));
                }
            }

            /*// Draw the Links
            for(var i = 0; i < this.drawn_blocks.length; i++) {
                for(var j = 0; j < this.drawn_blocks[i].links.length; j++) {
                    var link = this.drawn_blocks[i].links[j];
                    if(this.drawn_parts.includes(link.from) && this.drawn_parts.includes(link.to)) {
                        this.line_layer.add(this.get_assoc_line(link.from, link.to, link.assoc_block.name));
                    }
            
                }
            }*/
        }
        
        if(draw_references) {
            // Draw the references
            for(var i = 0; i < this.drawn_blocks.length; i++) {
                for(var j = 0; j < this.drawn_blocks[i].references.length; j++) {
                    if(this.drawn_blocks.includes(this.drawn_blocks[i].references[j].to)) {
                        this.line_layer.add(this.get_reference_arrow(this.drawn_blocks[i], this.drawn_blocks[i].references[j].to, this.drawn_blocks[i].references[j].name + " " + this.drawn_blocks[i].references[j].amount))
                    }
                }
            }
        }
        
        
        this.package_layer.add(this.get_package_box(package_x, package_y, 2 * size + _x, 2 * size + (y - _y),  "bdd " + _package.name + " : " + block.name + "  [" + depth_from + ".." + depth_to + "]"));
        this.stage.add(this.package_layer);
        this.stage.add(this.block_layer);

        this.stage.add(this.line_layer);

        this.stage.add(this.info_box_layer);

        this.info_box_layer.hide();

    }

    draw_parts_recursivly(block, x, y, size, depth, depth_to) {

        if(block.name.includes("::")) {
            var pack_name = block.name.split("::");
            var pack = get_package_by_name(pack_name[0]);
            if(pack) {
                var n_b = pack.get_block_by_name(pack_name[1]);
                if(n_b) {
                    block = n_b;
                    block.set_position_size(x, y, size, size);
                }
            }
        }
        
        if(depth <= depth_to) {
            if(block.has_parts()) {
                y += size * 2;
                var  _y = y;
                for(var i = 0; i < block.parts.length; i++){
                    block.parts[i].block.set_position_size(x, _y,size,size);
                    this.drawn_blocks.push(block.parts[i].block);
                    block.parts[i].set_position_size(x, _y,size,size);
                    this.drawn_parts.push(block.parts[i]);
                    this.block_layer.add(this.get_block_box(x, _y ,size, size, block.parts[i].block.name, block.parts[i].block.get_value_string() ,"", block.parts[i].block));

                    var tup = this.draw_parts_recursivly(block.parts[i].block, x , _y , size, depth + 1, depth_to);

                    if(this.draw_part_arrows) {
                        this.line_layer.add(this.get_part_arrow(block, block.parts[i].block, block.parts[i].name + " " + block.parts[i].amount));
                    }
                    
                    x = size * 2  + tup[0];
                    if(tup[1] > y) {
                        y = tup[1];
                    }
                }

                // Draw the Value Types
                for(var i = 0; i < block.value_types.length; i++ ) {
                    block.value_types[i].set_position_size(x, _y, size, size);
                    this.block_layer.add(this.get_value_type_box(x, _y, size, size, block.value_types[i].value_type_definition.name, block.value_types[i].value_type_definition.get_value_string()));
                    x += 2 * size;
                    if(this.draw_part_arrows) {
                        this.line_layer.add(this.get_part_arrow(block, block.value_types[i], "", false));
                    }
                }

                if(this.draw_links) {
                    this.draw_links_of_block(block);
                }

                return[x - 2 * size, y];
            }
            return [x, y];
        }
        return [x, y];  
    }
    
    /**
     * This method will replace the block of a part forever... 
     * @param {int} amount 
     * @param {Block} block 
     */
    recursive_get_skip(amount, block) {
        if(amount == 0) {
            var parts = [];
            for(var i = 0; i < block.parts.length; i++) {

                var part = block.parts[i];
                var part_block = block.parts[i].block;

                // Adds a lot of side effects..
                if(part_block.name.includes("::")) {
                    var pack_name = part.block.name.split("::");
                    var pack = get_package_by_name(pack_name[0]);
                    if(pack) {
                        var n_b = pack.get_block_by_name(pack_name[1]);
                        if(n_b) {
                            var part_block = n_b;
                        }
                    }
                } 

                part.block = part_block;
                parts.push(block.parts[i]);
            }
            return parts;
        }
        else {
            var parts = [];
            for(var i = 0; i < block.parts.length; i++) {
                parts = parts.concat(this.recursive_get_skip(amount -1, block.parts[i].block));
            }
            return parts;
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


