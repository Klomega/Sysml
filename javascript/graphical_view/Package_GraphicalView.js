
class Package_GraphicalView extends GraphicalView{

    draw_bdd_from_package(_package, x, y, size, draw_references, draw_links) {
        this._package = _package;

        this._size = size;
        var _x = x;
        var _y = y;
        var temp_y = 0;

        x += size ;
        y += size ;

        var start_x = x;
        var start_y = y;

        //this is used for the borders of the page
        var biggest_x = 0;
        var biggest_y = 0;

        var with_zero_incoming = [];
        //saves blocks with no parts
        var zero_parts_blocks = [];
        var parts_of_parts = [];
        var nearest_package_blocks = [];
        for(var i = 0; i < _package.blocks.length; i++) {
            if(_package.blocks[i].isPart_count == 0) {
                if (_package.blocks[i].parts.length === 0){
                    zero_parts_blocks.push(_package.blocks[i]);
                } else {
                    with_zero_incoming.push(_package.blocks[i]);
                }
            }
        }


        y += 2 * size;
        _y += 2 * size;
        console.log(start_y);
        console.log(y);
        //This is where the parts in parts are drawn
        for(var i = 0; i < _package.parts.length; i++) {
            if (!this.drawn_blocks.includes(_package.parts[i])) {
                _package.parts[i].set_position_size(x, y, size, size);
                this.block_layer.add(this.get_block_box(x, y, size, size, _package.parts[i].name, _package.parts[i].block.get_value_string(), "", _package.parts[i]));
                console.log(_package.parts[i].get_position_size());
                let counter = 0;
                for (var j = 0; j < _package.parts[i].parts.length; j++) {
                    if(!this.drawn_blocks.includes(_package.parts[i].parts[j].block)) {
                        if (counter === 0) {
                            //x += 2 * size;
                            temp_y = y;
                            y += 2 * size;
                            counter++;
                        } else {
                            x += 2 * size;
                        }
                        console.log(_package.parts[i].parts[j]);
                        _package.parts[i].parts[j].set_position_size(x, y, size ,size);
                        this.block_layer.add(this.get_block_box(x, y, size, size, _package.parts[i].parts[j].name, _package.parts[i].parts[j].get_value_string(), "", _package.parts[i].parts[j]));
                        this.drawn_blocks.push(_package.parts[i].parts[j]);
                        if (_package.parts[i].parts[j].has_parts()) {
                            for (var k = 0; k < _package.parts[i].parts[j].parts.length; k++) {
                                parts_of_parts.push(_package.parts[i].parts[j].parts[k]);
                            }
                        }
                    }
                }
                this.drawn_blocks.push(_package.parts[i]);
            }
            console.log(this.drawn_blocks);
            if(y > biggest_y) {
                biggest_y = y;
            }

            if(x > biggest_x) {
                biggest_x = x;
            }

            y = _y + size;

            x += 2 * size;


        }

        //This is where the block on the top level are drawn
        for(var i = 0; i < with_zero_incoming.length; i++) {
            if(!this.drawn_blocks.includes(with_zero_incoming[i]) ) {
              //  console.log(with_zero_incoming[i].get_value_string());
                with_zero_incoming[i].set_position_size(x, y, size ,size);
                this.block_layer.add(this.get_block_box(x, y, size, size, with_zero_incoming[i].name, with_zero_incoming[i].get_value_string(), "", with_zero_incoming[i]));
                this.drawn_blocks.push(with_zero_incoming[i]);
                let counter = 0;
                for(var j = 0; j < with_zero_incoming[i].parts.length; j++) {
                //    console.log(with_zero_incoming[i].parts[j]);

                    //If those blocks contain parts they are drawn one level bellow
                    if(!this.drawn_blocks.includes(with_zero_incoming[i].parts[j].block)) {
                        if (counter === 0) {
                            //x += 2 * size;
                            temp_y = y;
                            y += 2 * size;
                            counter++;
                        } else {
                            x += 2 * size;
                        }
                //        console.log(with_zero_incoming[i].parts[j].block);
                        with_zero_incoming[i].parts[j].block.set_position_size(x, y, size ,size);
                        this.block_layer.add(this.get_block_box(x, y, size, size, with_zero_incoming[i].parts[j].block.name, with_zero_incoming[i].parts[j].block.get_value_string(), "", with_zero_incoming[i].parts[j].block));
                        this.drawn_blocks.push(with_zero_incoming[i].parts[j].block);
                    }

                }


                if(y > biggest_y) {
                    biggest_y = y;
                }

                if(x > biggest_x) {
                    biggest_x = x;
                }

                y = _y + size;

                x += 2 * size;

            }
        }

        //Block without any parts are lumped together to the right of the "tree"
        y = temp_y;
        for (var j = 0; j < zero_parts_blocks.length; j++) {
            if (!this.drawn_blocks.includes(zero_parts_blocks[j])) {
             //   console.log(zero_parts_blocks[j]);
                if ((j % 2) === 0 && j != 0) {
                    x += 2 * size;
                    //y += 2 * size;
                } else if (j != 0) {
                    x += 2 * size;
                }

                zero_parts_blocks[j].set_position_size(x, y, size, size);
                this.block_layer.add(this.get_block_box(x, y, size, size, zero_parts_blocks[j].name, zero_parts_blocks[j].get_value_string(), "", zero_parts_blocks[j]));
                this.drawn_blocks.push(zero_parts_blocks[j]);
            }
        }

        if(y > biggest_y) {
            biggest_y = y;
        }

        y = _y + size;

        if (x > biggest_x) {
            biggest_x = x;
        }

        x = start_x;

        //The remaining parts of parts who haven't been placed yet is now drawn
        for(var i = 0; i < parts_of_parts.length; i++) {
            if(!this.drawn_blocks.includes(parts_of_parts[i])) {
                let counter = 0;
              //  console.log(_package.parts[i]);
                //x -= size * 4;
                y += size * 4;

                parts_of_parts[i].set_position_size(x, y, size ,size);

                this.block_layer.add(this.get_block_box(x, y, size, size, parts_of_parts[i].name, parts_of_parts[i].get_value_string(), "", parts_of_parts[i]));
                this.drawn_blocks.push(parts_of_parts[i]);

                for(var j = 0; j < parts_of_parts[i].parts.length; j++){
                 //   console.log(parts_of_parts[i].parts[j]);
                    //y += size * 2;
                    if (counter === 0) {
                        //x += 2 * size;
                        temp_y = y;
                        y += 2 * size;
                        counter++;
                    } else {
                        x += 2 * size;
                    }
                    if(!this.drawn_blocks.includes(parts_of_parts[i].parts[j].block)) {
                       // console.log(parts_of_parts[i].parts[j].block);
                        parts_of_parts[i].parts[j].block.set_position_size(x, y, size ,size);

                        this.block_layer.add(this.get_block_box(x, y, size, size, parts_of_parts[i].parts[j].block.name, parts_of_parts[i].parts[j].block.get_value_string(), "", parts_of_parts[i].parts[j].block));
                        this.drawn_blocks.push(parts_of_parts[i].parts[j].block);

                    }
                }

                if(y > biggest_y) {
                    biggest_y = y;
                }

                if(x > biggest_x) {
                    biggest_x = x;
                }

                x += size * 2;
                y = _y + size;

            }
        }

        //The remaining blocks who haven't been placed yet is drawn
        for(var i = 0; i < _package.blocks.length; i++) {
            if(!this.drawn_blocks.includes(_package.blocks[i])) {
                let counter = 0;
               // console.log(_package.blocks[i]);
                //x -= size * 4;
                y += size * 4;

                _package.blocks[i].set_position_size(x, y, size ,size);

                this.block_layer.add(this.get_block_box(x, y, size, size, _package.blocks[i].name, _package.blocks[i].get_value_string(), "", _package.blocks[i]));
                this.drawn_blocks.push(_package.blocks[i]);

                for(var j = 0; j < _package.blocks[i].parts.length; j++){
                    console.log(_package.blocks[i].parts[j]);
                    //y += size * 2;
                    if (counter === 0) {
                        //x += 2 * size;
                        temp_y = y;
                        y += 2 * size;
                        counter++;
                    } else {
                        x += 2 * size;
                    }
                    if(!this.drawn_blocks.includes(_package.blocks[i].parts[j].block)) {
                     //   console.log(_package.blocks[i].parts[j].block);
                        _package.blocks[i].parts[j].block.set_position_size(x, y, size ,size);

                        this.block_layer.add(this.get_block_box(x, y, size, size, _package.blocks[i].parts[j].block.name, _package.blocks[i].parts[j].block.get_value_string(), "", _package.blocks[i].parts[j].block));
                        this.drawn_blocks.push(_package.blocks[i].parts[j].block);

                    }
                }

                if(y > biggest_y) {
                    biggest_y = y;
                }

                if(x > biggest_x) {
                    biggest_x = x;
                }

                x += size * 2;
                y = _y + size;

            }
        }

        console.log(this.drawn_blocks);


        /*
        for (var i = 0; i < zero_parts_blocks.length; i++) {
            zero_parts_blocks[i].set_position_size(x, y, size, size);
            this.block_layer.add(this.get_block_box(x,y, size, size, zero_parts_blocks[i].name, zero_parts_blocks[i].get_value_string(), "", zero_parts_blocks[i]));

            x += 1*size;
           // y += 2*size;


        }
         */

        // Draw the Value Types
        //may need to add a new path so values inside value type can been seen.
        x = biggest_x + 4 * size;
        for(var i = 0; i < _package.value_type_definitions.length; i++) {
            _package.value_type_definitions[i].set_position_size(x,y, size, size);
            this.block_layer.add(this.get_value_type_box(x,y, size, size, _package.value_type_definitions[i].name, _package.value_type_definitions[i].get_value_string()));
        
            x += 2*size;
            //y += 2*size;
        }

        if (x > biggest_x) {
            biggest_x = x;
        }

        this.package_layer.add(this.get_package_box(_x, start_y, (biggest_x - _x) + 3 * size, (biggest_y - _y) + 3 * size,  "bdd " + _package.name));
        //start_y += size;

        //Draws the package
        _package.set_position_size(biggest_x/2, start_y, size, size);
        this.block_layer.add(this.get_block_box(biggest_x/2, start_y, size, size, _package.name, "", "", _package));
        console.log(_package.get_position_size());
        this.drawn_blocks.push(_package);

         // Draw the part arrows
        console.log(this.drawn_blocks);
         for(var i = 0; i < this.drawn_blocks.length; i++) {
             if (this.drawn_blocks[i].isPart_count === 0) {
                 nearest_package_blocks.push(this.drawn_blocks[i]);
             }
             if(this.drawn_blocks[i].name === _package.name) {
                 for (var k = 0; k < nearest_package_blocks.length; k++) {
                     this.line_layer.add(this.get_part_arrow(this.drawn_blocks[i], nearest_package_blocks[k], "", false));
                 }
             }

            for(var j = 0; j < this.drawn_blocks[i].parts.length; j++) {
                if(this.drawn_blocks.includes(this.drawn_blocks[i].parts[j].block)) {
                    console.log(this.drawn_blocks[i]);
                    this.line_layer.add(this.get_part_arrow(this.drawn_blocks[i], this.drawn_blocks[i].parts[j].block, this.drawn_blocks[i].parts[j].name + " " + this.drawn_blocks[i].parts[j].amount, false));
                } else if (!this.drawn_blocks.includes(this.drawn_blocks[i].parts[j].block)) {
                    console.log(this.drawn_blocks[i].get_position_size());
                    this.line_layer.add(this.get_part_arrow(this.drawn_blocks[i], this.drawn_blocks[i].parts[j], this.drawn_blocks[i].parts[j].name + " " + this.drawn_blocks[i].parts[j].amount, false));
                } else if(this.drawn_blocks[i].name === _package.name) {
                    this.line_layer.add(this.get_part_arrow(this.drawn_blocks[i], this.drawn_blocks[i].parts[j], this.drawn_blocks[i].parts[j].name + " " + this.drawn_blocks[i].parts[j].amount, false));

                }


            }

            if (this.drawn_blocks[i].value_types != undefined) {
                for(var p = 0; p < this.drawn_blocks[i].value_types.length; p++) {
                    this.line_layer.add(this.get_part_arrow(this.drawn_blocks[i], this.drawn_blocks[i].value_types[p], this.drawn_blocks[i].value_types[p].name, false));
                    //to was this.drawn_blocks[i].value_types[p].value_type_definition before
                }
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
                if (this.drawn_blocks[i].links != undefined ) {
                    for(var j = 0; j < this.drawn_blocks[i].links.length; j++) {
                        var link = this.drawn_blocks[i].links[j];
                        if(this.drawn_blocks.includes(link.from.block) && this.drawn_blocks.includes(link.to.block)) {
                            this.line_layer.add(this.get_assoc_line(link.from.block, link.to.block, link.assoc_block.name));
                        }
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


