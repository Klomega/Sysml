
class IBD_GraphicalView extends GraphicalView{

    /**
     * Draws and IBD diagram for the block
     * @param {bdd_Package} _package 
     * @param {Block} block 
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     * @param {int} depth 
     */

    draw_ibd(_package, block, x, y, size, depth) {

        if(!block.has_parts()) {
            return;
        }

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



        this._size = size / 2;
        var _x = x;
        var _y = y;

        x += size / 2;
        y += size / 4;
        this._package = _package;
    
        this.drawn_parts = [];

        var package_width = 0;
        var package_height = 0;

        for(var i = 0; i < block.parts.length; i++) {
            var tup = this.draw_ibd_recursivly(block.parts[i], x, y, size, depth -1);
        
            //this.block_layer.add(this.get_block_box(x, y, (tup[1] + size), (tup[2] + size), block.parts[i].name + ": " + block.parts[i].block.name + " " + block.parts[i].amount, "", "", block.parts[i].block));

            for(var j = tup[0].length - 1; j >= 0 ; j--) {
                this.block_layer.add(tup[0][j]);
            }
            
            y += size / 2 + tup[2];

            if(tup[1] > package_width - size ) {
                package_width = tup[1] + size ;
            }

        }

        package_height = y; 
        this.package_layer.add(this.get_package_box(_x, _y, package_width, package_height, "ibd " + _package.name + " : " + block.name));

        // Draw the Reference arrows
        for(var i = 0; i < this.drawn_parts.length; i++) {
            for(var j = 0; j < this.drawn_parts[i].block.references.length; j++) {
                
                for(var p = 0; p < this.drawn_parts.length; p++) {
                    if(this.drawn_parts[i].block.references[j].to == this.drawn_parts[p].block) {
                        this.line_layer.add(this.get_line(this.drawn_parts[i], this.drawn_parts[p],this.drawn_parts[i].block.references[j].name + " " + this.drawn_parts[i].block.references[j].amount));
                    }
                }

            }
        }

        // Links in the block object
        for(var i = 0; i < block.links.length; i++) {
            var link = block.links[i];
            if(this.drawn_parts.includes(link.from) && this.drawn_parts.includes(link.to)) {
                this.line_layer.add(this.get_assoc_line(link.from, link.to, link.assoc_block.name));
            }
        }


        //this.draw_links();


        this.stage.add(this.package_layer);
        this.stage.add(this.block_layer);

        this.stage.add(this.line_layer);

        this.stage.add(this.info_box_layer);

        this.info_box_layer.hide();
    }

    /**
     * 
     * @param {Part} part 
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     * @param {int} depth 
     */
    draw_ibd_recursivly(part, x, y, size, depth) {

        var part_block = part.block;

        if(part.block.name.includes("::")) {
            var pack_name = part.block.name.split("::");
            var pack = get_package_by_name(pack_name[0]);
            if(pack) {
                var n_b = pack.get_block_by_name(pack_name[1]);
                if(n_b) {
                    var part_block = n_b;

                    // Was this the solution?
                    part.block = n_b;
                }
            }
        }  
            

        if(depth > 1 && part_block.has_parts()) {
         
            var _x = x;
            var _y = y;

            x += size / 2;
            y += size / 3;

            var childs = [];
            var _size = size;

            var part_count = part_block.parts.length;

            

            var highest_child = 0;
            for(var i = 0; i < part_count; i++) {

                var tup = this.draw_ibd_recursivly(part_block.parts[i], x, y, size, depth -1);

                childs = childs.concat(tup[0]);

                if(tup[2] > highest_child) {
                    highest_child = tup[2];
                }

                x += tup[1] + size / 2;
            }

            // Draw the Value Types
            for(var i = 0; i < part_block.value_types.length; i++ ) {
                part_block.value_types[i].set_position_size(x, y, size, size);
                childs = childs.concat(this.get_value_type_box(x, y, size, size, part_block.value_types[i].value_type_definition.name, part_block.value_types[i].value_type_definition.get_value_string())) ;
                x += 2 * size;
            }
            

            part.set_position_size(_x, _y, (x - _x), size + highest_child);
            this.drawn_parts.push(part);

            //
            this.draw_links_of_block(part.block);

            return [childs.concat([this.get_ibd_box(_x, _y, (x - _x), size + highest_child, part.name + ": " + part_block.name + " " + part.amount, "", "", part_block)]),(x - _x), size + highest_child];

        } else {
            part.set_position_size(x, y, size, size/2);
            this.drawn_parts.push(part);
            return [[this.get_ibd_box(x, y, size, size / 2, part.name + ": " + part_block.name + " " + part.amount, "" ,"", part_block)], size, size / 2];
        }

    }


    draw_links() {
        // Draw the links
        for(var i = 0; i < this.drawn_parts.length; i++) {
            for(var j = 0; j < this.drawn_parts[i].block.links.length; j++) {
                var link = this.drawn_parts[i].block.links[j];
                if(this.drawn_parts.includes(link.from) && this.drawn_parts.includes(link.to)) {
                    this.line_layer.add(this.get_assoc_line(link.from, link.to, link.assoc_block.name));
                }
            }
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


