
/**
 * This is the base for all the GraphicalViews. 
 */
class GraphicalView {
    
    constructor(width, height) {

        this.width = width;
        this.height = height;

        this.drawn_blocks = [];

        this.stage = new Konva.Stage({
            container: 'display',
            width: this.width,
            height: this.height,
            draggable: true
        });

        window.stage = this.stage;

        // Add scroll zooming
        var scaleBy = 1.05;
        this.stage.on('wheel', e => {
            e.evt.preventDefault();
            var oldScale = this.stage.scaleX();

            var mousePointTo = {
                x: this.stage.getPointerPosition().x / oldScale - this.stage.x() / oldScale,
                y: this.stage.getPointerPosition().y / oldScale - this.stage.y() / oldScale
            };

            var newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            this.stage.scale({ x: newScale, y: newScale });

            var newPos = {
                x:
                    -(mousePointTo.x - this.stage.getPointerPosition().x / newScale) *
                    newScale,
                y:
                    -(mousePointTo.y - this.stage.getPointerPosition().y / newScale) *
                    newScale
            };
            this.stage.position(newPos);
            this.stage.batchDraw();
        });



        this.package_layer = new Konva.Layer();
        this.block_layer = new Konva.Layer();
        this.line_layer = new Konva.Layer();
        this.line_text_layer = new Konva.Layer();
        this.info_box_layer = new Konva.Layer();

        this.info_box_group = this.get_info_box();
        this.info_box_layer.add(this.info_box_group);
    }

    get_info_box() {

        
        var rect = new Konva.Rect({
            width : 400,
            height : 400,
            fillLinearGradientStartPoint: { x: - 500, y: - 500 },
            fillLinearGradientEndPoint: { x: 500 * 2, y: 500 * 2 },
            fillLinearGradientColorStops: [0, 'gray', 0.4, 'beige', 1, 'white'],
            stroke : 'gray',
            strokeWidth: 5,
            shadowColor: 'black',
            shadowBlur: 4,
            shadowOffset: { x: 5, y: 5 },
            shadowOpacity: 0.5
        });

        var text = new Konva.Text({
            align: 'center',
            fontSize: 12,
            width: 400,
            height: 400,
            fontFamily: 'Calibri',
            text: "",
            fill: 'black',
            padding: 3,
            wrap: 'none',
            ellipsis: true
        });
    
        var group = new Konva.Group({
            x : 0,
            y : 0
        });
        group.add(rect).add(text);
        return group;
    }

    /**
     *  Get an arrow between two parts or blocks
     * 
     *  The method is using the .get_position_size() method from the Block or Part object
     * @param {Block/Part} from 
     * @param {Block/Part} to 
     */
    get_part_arrow(from, to, text, random) {
        var result = this.get_arrow_points(from.get_position_size()[0], from.get_position_size()[1], from.get_position_size()[2], from.get_position_size()[3], to.get_position_size()[0], to.get_position_size()[1], to.get_position_size()[2], to.get_position_size()[3], random, 0);
        
        var points = result[0];
        var text_pos = result[1];
        var diamond_pos = result[2];


        var group = new Konva.Group({
            x: 0,
            y: 0
        })

        var arrow = new Konva.Arrow({
            points : points,
            stroke : 'black',
            strokeWidth : 2,
            fill : 'black',
            lineCap: 'round',
            lineJoin: 'round',
            pointerLength: 5,
            pointerWidth: 10
        });

        arrow.on('mouseover', function(e) {
            e.target.stroke('red');
            e.target.fill('red');
            e.target.draw();
        });
        
        arrow.on('mouseout', function(e) {
            e.target.stroke('black');
            e.target.fill('black');
            e.target.draw(); 
        });


        var rect = new Konva.Rect({
            x : diamond_pos[0],
            y : diamond_pos[1],
            width : 15,
            height : 15,
            fill : 'black',
            rotation: 45
        });

        var text = new Konva.Text({
            x : text_pos[0],
            y : text_pos[1],
            fontSize: 10,
            fontFamily: 'Calibri',
            text: text,
            fill: 'black',
            padding: 3
        });

        group.add(arrow).add(rect).add(text);

        return group;
    }

    get_part_arrow_by_coords(from_x, from_y, to_x, to_y, width, height, text) {
        var result = this.get_arrow_points(from_x, from_y, width, height, to_x, to_y, width, height, false, 0);

        var points = result[0];
        var text_pos = result[1];
        var diamond_pos = result[2];


        var group = new Konva.Group({
            x: 0,
            y: 0
        })

        var arrow = new Konva.Arrow({
            points : points,
            stroke : 'black',
            strokeWidth : 2,
            fill : 'black',
            lineCap: 'round',
            lineJoin: 'round',
            pointerLength: 5,
            pointerWidth: 10
        });

        arrow.on('mouseover', function(e) {
            e.target.stroke('red');
            e.target.fill('red');
            e.target.draw();
        });
        
        arrow.on('mouseout', function(e) {
            e.target.stroke('black');
            e.target.fill('black');
            e.target.draw(); 
        });


        var rect = new Konva.Rect({
            x : diamond_pos[0],
            y : diamond_pos[1],
            width : 15,
            height : 15,
            fill : 'black',
            rotation: 45
        });

        var text = new Konva.Text({
            x : text_pos[0],
            y : text_pos[1],
            fontSize: 10,
            fontFamily: 'Calibri',
            text: text,
            fill: 'black',
            padding: 3
        });

        group.add(arrow).add(rect).add(text);

        return group;
    }

    get_reference_arrow(from, to, text) {
        var result = this.get_arrow_points(from.get_position_size()[0], from.get_position_size()[1], from.get_position_size()[2], from.get_position_size()[3], to.get_position_size()[0], to.get_position_size()[1], to.get_position_size()[2], to.get_position_size()[3], false, 10);
        
        var points = result[0];

        var text_pos = result[1];

        var group = new Konva.Group({
            x: 0,
            y: 0
        })

        var arrow = new Konva.Arrow({
            points : points,
            stroke : 'green',
            strokeWidth : 2,
            fill : 'green',
            lineCap: 'round',
            lineJoin: 'round',
            pointerLength: 5,
            pointerWidth: 10
        });

        arrow.on('mouseover', function(e) {
            e.target.stroke('red');
            e.target.fill('red');
            e.target.draw();
        });
        
        arrow.on('mouseout', function(e) {
            e.target.stroke('green');
            e.target.fill('green');
            e.target.draw(); 
        });

        var text = new Konva.Text({
            x : text_pos[0],
            y : text_pos[1],
            fontSize: 10,
            fontFamily: 'Calibri',
            text: text,
            fill: 'black',
            padding: 3
        });

        group.add(arrow).add(text);

        return group;
    }

    get_reference_arrow_by_coords(from_x, from_y, to_x, to_y, width, height, text) {
        var result = this.get_arrow_points(from_x, from_y, width, height, to_x, to_y, width, height, false, 10);
        
        var points = result[0];

        var text_pos = result[1];

        var group = new Konva.Group({
            x: 0,
            y: 0
        })

        var arrow = new Konva.Arrow({
            points : points,
            stroke : 'green',
            strokeWidth : 2,
            fill : 'green',
            lineCap: 'round',
            lineJoin: 'round',
            pointerLength: 5,
            pointerWidth: 10
        });

        arrow.on('mouseover', function(e) {
            e.target.stroke('red');
            e.target.fill('red');
            e.target.draw();
        });
        
        arrow.on('mouseout', function(e) {
            e.target.stroke('green');
            e.target.fill('green');
            e.target.draw(); 
        });

        var text = new Konva.Text({
            x : text_pos[0],
            y : text_pos[1],
            fontSize: 10,
            fontFamily: 'Calibri',
            text: text,
            fill: 'black',
            padding: 3
        });

        group.add(arrow).add(text);

        return group;
    }

    get_assoc_line(from, to, text) {
        var result = this.get_arrow_points(from.get_position_size()[0], from.get_position_size()[1], from.get_position_size()[2], from.get_position_size()[3], to.get_position_size()[0], to.get_position_size()[1], to.get_position_size()[2], to.get_position_size()[3], false, 20);
        
        var points = result[0];

        var text_pos = result[1];

        var group = new Konva.Group({
            x: 0,
            y: 0
        })

        /*var line = new Konva.Line({
            points : points,
            stroke : 'blue',
            strokeWidth : 2,
            fill : 'blue',
        }); */


        var line = new Konva.Arrow({
            points : points,
            stroke : 'blue',
            strokeWidth : 2,
            fill : 'blue',
            lineCap: 'round',
            lineJoin: 'round',
            pointerLength: 3,
            pointerWidth: 8
        });


        line.on('mouseover', function(e) {
            e.target.stroke('red');
            e.target.fill('red');
            e.target.draw();
        });
        
        line.on('mouseout', function(e) {
            e.target.stroke('blue');
            e.target.fill('blue');
            e.target.draw(); 
        });

        var text = new Konva.Text({
            x : text_pos[0],
            y : text_pos[1],
            fontSize: 10,
            fontFamily: 'Calibri',
            text: text,
            fill: 'black',
            padding: 3
        });

        group.add(line).add(text);

        return group;
    }

    /**
     *  Get an line between two parts
     * 
     *  The method is using the .get_position_size() method from the Part object
     * @param {Part} from 
     * @param {Part} to 
     */
    get_line(from, to, text) {
        var tup = this.get_arrow_points(from.get_position_size()[0], from.get_position_size()[1], from.get_position_size()[2], from.get_position_size()[3], to.get_position_size()[0], to.get_position_size()[1], to.get_position_size()[2], to.get_position_size()[3], false, 30);
        
        var points = tup[0];
        var text_pos = tup[1];

        var group = new Konva.Group({
            x: 0,
            y: 0
        })

        var line = new Konva.Line({
            points : points,
            stroke : 'black',
            strokeWidth : 1,
            fill : 'black',
            lineCap: 'round',
            lineJoin: 'round',
        });


        var text = new Konva.Text({
            x : text_pos[0],
            y : text_pos[1],
            fontSize: 10,
            fontFamily: 'Calibri',
            text: text,
            fill: 'black',
            padding: 3
        });
        line.on('mouseover', function(e) {
            e.target.stroke('red');
            e.target.fill('red');
            e.target.draw();
        });
        
        line.on('mouseout', function(e) {
            e.target.stroke('black');
            e.target.fill('black');
            e.target.draw(); 
        });

        group.add(line).add(text);

        return group;
    }

    get_block_box(x, y, width, height, text, values, parts, block) {
        var block_tag = "<<block>>\n";
        text = text.replace("::", "::\n").replace("'", "").replace("'", "");
        if(values == "") {
            text += "\n";
        } else {
            text += "\n ______________ \nValues : \n"+  values;
        }
        if(!(parts == "")) {
            text += "\n ______________ \nParts : \n " + parts;
        } 
        
        if(values == "" && parts == "") {
            text = text; // change this..
        } else {
            text + "\n ______________ \n values: \n" + values + "\n ______________ \n parts: \n" + parts;
        }

        var group = new Konva.Group({
            x : x,
            y : y,
            draggable : false
        });

        if(block.has_parts()) {
            var gradientStops = [0, 'gray', 0.4, 'beige', 1, 'white'];
        } else {
            var gradientStops = [0, 'black', 0.4, 'beige', 1, 'yellow'];
        }
        
        
        var rect = new Konva.Rect({
            width : width,
            height : height,
            //fill : 'gray',
            fillLinearGradientStartPoint: { x: - width, y: - height },
            fillLinearGradientEndPoint: { x: width * 2, y: height * 2 },
            fillLinearGradientColorStops: gradientStops,
            stroke : 'gray',
            strokeWidth: 1,
            shadowColor: 'black',
            shadowBlur: 4,
            shadowOffset: { x: 5, y: 5 },
            shadowOpacity: 0.5
        });
        var text = new Konva.Text({
            align: 'center',
            fontSize: 12,
            width : width,
            height: height,
            fontFamily: 'Calibri',
            text: block_tag + text,
            fill: 'black',
            padding: 3,
            wrap: 'none',
            ellipsis: true
        });
        var t = this;
        var block = block;
        group.on('click', function(evt) {
            
            document.getElementById("selected-block").innerHTML = block.name;
            document.getElementById("selected-package").innerHTML = block.in_package.name;

            draw();
        });

        var t = this;
        var block = block;
        group.on('mouseover', function(evt) {

            t.info_box_group.absolutePosition({
                x: evt.evt.pageX,
                y: evt.evt.pageY - 100
            });

            t.info_box_group.children[1].setAttr('text', block.get_block_description());

            t.info_box_layer.show();
            t.info_box_layer.draw();
        }); 

        group.on('mouseout', function(evt) {
            t.info_box_layer.hide();
            t.info_box_layer.draw();
        });


        return group.add(rect).add(text);
    }

    get_ibd_box(x, y, width, height, text, values, parts, block) {
        if(values == "") {
            text += "\n";
        } else {
            text += "\nValues : \n ______________ \n"+  values;
        }
        if(!(parts == "")) {
            text += "\nParts : \n ______________ \n " + parts;
        } 
        
        if(values == "" && parts == "") {
            text = text; // change this..
        } else {
            text + "\n ______________ \n values: \n" + values + "\n ______________ \n parts: \n" + parts;
        }

        var group = new Konva.Group({
            x : x,
            y : y,
            draggable : false
        });

        if(block.has_parts()) {
            var gradientStops = [0, 'gray', 0.4, 'beige', 1, 'white'];
        } else {
            var gradientStops = [0, 'black', 0.4, 'beige', 1, 'yellow'];
        }
        var rect = new Konva.Rect({
            width : width,
            height : height,
            fillLinearGradientStartPoint: { x: - width, y: - height },
            fillLinearGradientEndPoint: { x: width * 2, y: height * 2 },
            fillLinearGradientColorStops: gradientStops,
            stroke : 'black',
            strokeWidth: 1,
            shadowColor: 'black',
            shadowBlur: 4,
            shadowOffset: { x: 5, y: 5 },
            shadowOpacity: 0.5
        });
        var text = new Konva.Text({
            fontSize: 12,
            width : width,
            height: height,
            fontFamily: 'Calibri',
            text: text,
            fill: 'black',
            padding: 3,
        });
        var t = this;
        var block = block;
        group.on('click', function(evt) {
            document.getElementById("selected-block").innerHTML = block.name;
            document.getElementById("selected-package").innerHTML = block.in_package.name;
            draw();
        });

        var t = this;
        var block = block;
        group.on('mouseover', function(evt) {

            t.info_box_group.absolutePosition({
                x: evt.evt.pageX,
                y: evt.evt.pageY - 100
            });

            t.info_box_group.children[1].setAttr('text', block.get_block_description());

            t.info_box_layer.show();
            t.info_box_layer.draw();
        }); 

        group.on('mouseout', function(evt) {
            t.info_box_layer.hide();
            t.info_box_layer.draw();
        });


        return group.add(rect).add(text);
    }

    get_value_type_box(x, y, width, height, name, values) {

        var text = "<<Value Type>>\n" + name + "\n ______________ \n" + values;
        var group = new Konva.Group({
            x : x,
            y : y,
            draggable : false
        });

        var rect = new Konva.Rect({
            width : width,
            height : height,
            fillLinearGradientStartPoint: { x: - width, y: - height },
            fillLinearGradientEndPoint: { x: width * 2, y: height * 2 },
            fillLinearGradientColorStops: [0, 'black', 0.4, 'beige', 1, 'yellow'],
            stroke : 'black',
            strokeWidth: 1,
            shadowColor: 'black',
            shadowBlur: 4,
            shadowOffset: { x: 5, y: 5 },
            shadowOpacity: 0.5
        });
        var text = new Konva.Text({
            align: 'center',
            fontSize: 12,
            width : width,
            height: height,
            fontFamily: 'Calibri',
            text: text,
            fill: 'black',
            padding: 3,
            wrap: 'none',
            ellipsis: true
        });

        return group.add(rect).add(text);
    }


    get_package_box(x, y, width, height, text) {
        var group = new Konva.Group({
            x : x,
            y : y,
            draggable : false
        });

        var rect = new Konva.Rect({
            width : width,
            height : height,
            fill : 'white',
            stroke : 'black',
            strokeWidth: 1
        });
        var text = new Konva.Text({
            fontsize: 12,
            width : width,
            fontFamily: 'Calibri',
            text: text,
            fill: 'gray',
            padding: 10
        });

        return group.add(rect).add(text);
    }

    /**
     *  MAKE SURE THE CALLER OBJECT GOT A .size VARIABLE SET
     * @param {int} from_x 
     * @param {int} from_y 
     * @param {int} from_width 
     * @param {int} from_height 
     * @param {int} to_x 
     * @param {int} to_y 
     * @param {int} to_width 
     * @param {int} to_height 
     * @param {boolean} random 
     */
    get_arrow_points(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, random, offset) {
        
        var points = get_points(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, random, this._size, offset);
        
        var text_pos = this.get_text_pos(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, points[points.length -2], points[points.length -1], offset);

        var diamond_pos = this.get_diamond_pos(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, points[0], points[1]);
   
        return [points, text_pos, diamond_pos];
    }

    get_text_pos(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, endpos_x, endpos_y, offset) {
        if(from_y > to_y) { // Text below block
            return [endpos_x, endpos_y + 10 + offset];

        } else if(from_y < to_y) { // Text above block
            return [endpos_x, endpos_y - 20 - offset];
        } else {

            if(from_x > to_x) { // Text to right
                return [endpos_x + 10, endpos_y + offset];
            } else { // Text to left
                return [endpos_x - 80, endpos_y - offset];
            } 

        }
    }

    get_diamond_pos(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, start_x, start_y) {
        if(from_y > to_y) {
            return [start_x, start_y - 21];

        } else if(from_y < to_y) { 
            return [start_x, start_y ];
        } else {

            if(from_x > to_x) { 
                return [start_x - 11, start_y - 9];
            } else {
                return [start_x + 11, start_y - 9];
            } 

        }
    }

}