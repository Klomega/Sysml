
class Package_GraphicalView extends GraphicalView{

    draw_bdd_from_package(_package, x, y, size, draw_references, draw_links) {
        this._package = _package;

        this._size = size;
        var _x = x;
        var _y = y;

        x += size ;
        y += size ;

        var biggest_x = 0;
        var biggest_y = 0;

        var with_zero_incoming = [];
        for(var i = 0; i < _package.blocks.length; i++) {
            if(_package.blocks[i].isPart_count == 0) {
                with_zero_incoming.push(_package.blocks[i]);
            }
        }

        for(var i = 0; i < with_zero_incoming.length; i++) {
            if(!this.drawn_blocks.includes(with_zero_incoming[i]) ) {
                with_zero_incoming[i].set_position_size(x, y, size ,size);
                this.block_layer.add(this.get_block_box(x, y, size, size, with_zero_incoming[i].name, with_zero_incoming[i].get_value_string(), "", with_zero_incoming[i]));
                this.drawn_blocks.push(with_zero_incoming[i]);

                for(var j = 0; j < with_zero_incoming[i].parts.length; j++) {
                    y += 2 * size;
                    if(!this.drawn_blocks.includes(with_zero_incoming[i].parts[j].block)) {
                        with_zero_incoming[i].parts[j].block.set_position_size(x, y, size ,size);
                        this.block_layer.add(this.get_block_box(x, y, size, size, with_zero_incoming[i].parts[j].block.name, with_zero_incoming[i].parts[j].block.get_value_string(), "", with_zero_incoming[i].parts[j].block));
                        this.drawn_blocks.push(with_zero_incoming[i].parts[j].block);
                    }

                }

                if(y > biggest_y) {
                    biggest_y = y;
                }

                y = _y + size;

                x += 2 * size;
            }
        }
            

        for(var i = 0; i < _package.blocks.length; i++) {
            if(!this.drawn_blocks.includes(_package.blocks[i])) {
                _package.blocks[i].set_position_size(x, y, size ,size);

                this.block_layer.add(this.get_block_box(x, y, size, size, _package.blocks[i].name, _package.blocks[i].get_value_string(), "", _package.blocks[i]));
                this.drawn_blocks.push(_package.blocks[i]);

                for(var j = 0; j < _package.blocks[i].parts.length; j++){
                    y += size * 2;
                    if(!this.drawn_blocks.includes(_package.blocks[i].parts[j].block)) {
                        _package.blocks[i].parts[j].block.set_position_size(x, y, size ,size);

                        this.block_layer.add(this.get_block_box(x, y, size, size, _package.blocks[i].parts[j].block.name, _package.blocks[i].parts[j].block.get_value_string(), "", _package.blocks[i].parts[j].block));
                        this.drawn_blocks.push(_package.blocks[i].parts[j].block);

                    }
                }

                if(y > biggest_y) {
                    biggest_y = y;
                }

                x += size * 2;
                y = _y + size;
            }
        }

        // Draw the Value Types
        for(var i = 0; i < _package.value_type_definitions.length; i++) {
            _package.value_type_definitions[i].set_position_size(x,y, size, size);
            this.block_layer.add(this.get_value_type_box(x,y, size, size, _package.value_type_definitions[i].name, _package.value_type_definitions[i].get_value_string()));
        
            x += 2*size;
            y += 2*size;
        }

        this.package_layer.add(this.get_package_box(_x, _y, (x - _x) + 2 * size, (biggest_y - _y) + 2 * size,  "bdd " + _package.name));

        
         // Draw the part arrows
         for(var i = 0; i < this.drawn_blocks.length; i++) {
            for(var j = 0; j < this.drawn_blocks[i].parts.length; j++) {
                if(this.drawn_blocks.includes(this.drawn_blocks[i].parts[j].block)) {
                    this.line_layer.add(this.get_part_arrow(this.drawn_blocks[i], this.drawn_blocks[i].parts[j].block, this.drawn_blocks[i].parts[j].name + " " + this.drawn_blocks[i].parts[j].amount, false));
                }
            }
            for(var p = 0; p < this.drawn_blocks[i].value_types.length; p++) {
                this.line_layer.add(this.get_part_arrow(this.drawn_blocks[i], this.drawn_blocks[i].value_types[p].value_type_definition, this.drawn_blocks[i].value_types[p].name, false));
            }
            
        }

        if(draw_references) {
            // Draw the reference arrows
            for(var i = 0; i < this.drawn_blocks.length; i++) {
                for(var j = 0; j < this.drawn_blocks[i].references.length; j++) {
                    if(this.drawn_blocks.includes(this.drawn_blocks[i].references[j].to)) {
                        this.line_layer.add(this.get_reference_arrow(this.drawn_blocks[i], this.drawn_blocks[i].references[j].to, this.drawn_blocks[i].references[j].name + " " + this.drawn_blocks[i].references[j].amount, false))
                    }
                }
            }
        }
        if(draw_links) {
             // Draw the links
            for(var i = 0; i < this.drawn_blocks.length; i++) {
                for(var j = 0; j < this.drawn_blocks[i].links.length; j++) {
                    var link = this.drawn_blocks[i].links[j];
                    if(this.drawn_blocks.includes(link.from.block) && this.drawn_blocks.includes(link.to.block)) {
                        this.line_layer.add(this.get_assoc_line(link.from.block, link.to.block, link.assoc_block.name));
                    }
                }
            }
        }
        

       

        this.stage.add(this.package_layer);
        this.stage.add(this.block_layer);

        this.stage.add(this.line_layer);

        this.stage.add(this.info_box_layer);

        this.info_box_layer.hide();
    }


    

}


