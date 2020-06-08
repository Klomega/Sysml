
class EP_GraphicalView extends GraphicalView{

    /**
     * 
     * @param {bdd_Package} _package
     * @param {Block} block 
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     * @param {int} depth 
     */

    draw_ep(_package, block, x, y, size, depth) {


        this._package = _package;
        var _x = x;
        var _y = y;
        x += 50;
        y += 50;

        var childs = [];
        var _size = size

        this.drawn_parts = [];

        for(var i = 0; i < block.parts.length; i++) {
            var tup = this.draw_ep_recursivly(block.parts[i], x , y ,size, depth - 1);

           
            childs = childs.concat(tup[0]);
            if(tup[1] > _size) {
                _size = tup[1];
            }
            y += 40 + tup[2];
        }

        for(var i = childs.length -1; i >= 0; i --) {
            this.block_layer.add(childs[i]);
        }
        this.package_layer.add(this.get_package_box(_x, _y, _size + size, size + (y - _y),  "ep " + _package.name + " : " + block.name));

        this.draw_part_references(this.drawn_parts, this.line_layer);
        
        this.stage.add(this.package_layer);
        this.stage.add(this.block_layer);

        this.stage.add(this.line_layer);

    }

    /**
     * Will recursivly get the konva object that should be drawn
     * Returns a tuple with an array of konva objects, the width and the height
     * @param {Part} part 
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     * @param {int} depth 
     */
    draw_ep_recursivly(part, x, y, size, depth) {
        
        if(part.block.name.includes("::")) {
            var pack_name = block.parts[i].block.name.split("::");
            var pack = get_package_by_name(pack_name[0]);
            var part_block = pack.get_block_by_name(pack_name[1]);
            
        } else {
            var part_block = part.block;
        }

        if(depth > 1 && part_block.has_parts()) {

            var _x = x;
            var _y = y;
            
            x += size / 2 ;
            y += size / 2;

            var childs = [];

            var part_count = part_block.parts.length;
            var highest_child = 0;
            for(var i = 0; i < part_count; i++) {

                
                var tup = this.draw_ep_recursivly(part_block.parts[i], x, y, size, depth -1);
                
                childs = childs.concat(tup[0]);

               
                if(tup[2] > highest_child) {
                    highest_child = tup[2];
                }
                x += tup[1] + size / 2;
            }
            part.set_position_size(_x, _y, (x - _x), size + highest_child);
            this.drawn_parts.push(part);
            // Concatinate the childs with the new part and return the tuple
            return [childs.concat([this.get_ibd_box(_x, _y, (x - _x), size + highest_child, /*part.name + ": " +*/ part_block.name,"","", part_block)]), (x - _x), size + highest_child];
        }
        else {
            // Will return a tuple containing ([block], width, height)
            part.set_position_size(x ,y , size, size);
            this.drawn_parts.push(part);
            return [[this.get_ibd_box(x ,y , size, size, /*part.name + ": " +*/ part_block.name,"","", part_block )], size, size];
        }
    }

    /**
     * Draws the part references included in the Part array at the given layer. 
     * @param {Part[]} parts 
     * @param {Konva.Layer} layer 
     */
    draw_part_references(parts, layer) {
        for(var i = 0; i < parts.length; i++) {
            for(var j = 0; j < parts[i].part_references.length; j ++) {
                var reference = parts[i].part_references[j];
                
                if(parts.includes(reference.to)) {
                    layer.add(this.get_reference_arrow(reference.from, reference.to));
                }

            }
        }
    }

}


