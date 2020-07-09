
/**
 * Used to get points for drawing an arrow or line
 * 
 * @param {int} from_x 
 * @param {int} from_y 
 * @param {int} from_width 
 * @param {int} from_height 
 * @param {int} to_x 
 * @param {int} to_y 
 * @param {int} to_width 
 * @param {int} to_height 
 * @param {boolean} random 
 * @param {int} size
 */
function get_points(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, random, size, offset) {
    
    if(random == true) {
        var rand = getRandomInt(10, size / 2);
        var s_rand = getRandomInt(0, size / 4);
    } else {
        var rand = size / 2 + offset;
        var s_rand = offset;
    } 
    // Up
    if(to_y < from_y) {
        return up(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height,rand, s_rand, size);

    } else if(to_y > from_y) { // Down
        return down(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height,rand, s_rand, size);
        
    } else {
        // Left and Right

        if(from_x > to_x) { // Left
            return left(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height,rand, s_rand, size);

        } else { // Right
            return right(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height,rand, s_rand, size);
        }
    }

    /*return points;
    } else {
        from_x += from_width / 2;
        from_y += from_height;

        to_x += to_width / 2;
        

        return [from_x, from_y, from_x, to_y - this._size / 4, to_x, to_y - this._size / 4, to_x, to_y];

    }*/
}

function up(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, rand, s_rand, s) {

    if(from_y - to_y <= 2*s) {
        rand = s / 2;
    }

    var points = [];
    from_x += from_width / 2 - s_rand;

    to_x += to_width / 2 + s_rand;
    to_y += to_height;

    if(from_y - to_y <= s && from_x + s_rand == to_x - s_rand) { // Straight up  
        points = [
            from_x + s_rand, from_y, to_x - s_rand, to_y
        ];
    } else { // Go Around
        points = [
            from_x, from_y,
            
            from_x, from_y - rand,
            from_x + s, from_y - rand, 
            from_x + s, to_y + rand,
            to_x, to_y + rand,

            to_x, to_y
        ];
    }
    return points;
}

function down(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, rand, s_rand, s) {
    
    if(to_y - from_y <= 2*s) {
        rand = s / 2;
    }

    var points = [];

    from_x += from_width / 2 - s_rand;
    from_y += from_height;

    to_x += to_width / 2 + s_rand;

    if(to_y - from_y <=  s && from_x + s_rand == to_x - s_rand) { // Straight down
        points = [
            from_x + s_rand, from_y, to_x - s_rand, to_y
        ];
    } else {
        var s1 = 0;
        if(to_y - from_y > s ) {
            s1 = s;
        }
        points = [
            from_x, from_y,
            
            from_x, from_y + rand,
            from_x - s1, from_y + rand, 
            from_x - s1, to_y - rand,
            to_x, to_y - rand,

            to_x, to_y
        ];
    }
    return points;
}

function left(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, rand, s_rand, s) {
    var points = [];

    from_y += from_height / 2 - s_rand;

    to_x += to_width;
    to_y += to_height / 2 + s_rand;

    if(from_y + s_rand == to_y - s_rand && from_x - to_x <= 2 * s) { // Straight Left
        points = [
            from_x, from_y + s_rand, to_x, to_y - s_rand
        ];
    } else {
        if(from_y > to_y) { // Left Up
            points = [
                from_x, from_y,

                from_x - rand, from_y,
                from_x - rand, from_y -s,
                to_x + rand, from_y -s,
                to_x + rand, to_y,

                to_x, to_y
            ];
        } else { // Left Down
            points = [
                from_x, from_y,

                from_x - rand, from_y,
                from_x - rand, from_y +s,
                to_x + rand, from_y +s,
                to_x + rand, to_y,

                to_x, to_y
            ];
        }
    }

    return points;
}

function right(from_x, from_y, from_width, from_height, to_x, to_y, to_width, to_height, rand, s_rand, s) {
    var points = [];

    from_y += from_height / 2 - s_rand;
    from_x += from_width;
    
    to_y += to_height / 2 + s_rand;

    if(from_y + s_rand == to_y - s_rand && to_x - from_x <= 2 * s) { // Straight Right
        points = [
            from_x, from_y + s_rand, to_x, to_y - s_rand
        ];
    } else {
        if(from_y > to_y) { // Right Up
            points = [
                from_x, from_y,

                from_x + rand, from_y,
                from_x + rand, from_y -s,
                to_x - rand, from_y -s,
                to_x - rand, to_y,

                to_x, to_y
            ];
        } else { // Right Down
            points = [
                from_x, from_y,

                from_x + rand, from_y,
                from_x + rand, from_y +s,
                to_x - rand, from_y +s,
                to_x - rand, to_y,

                to_x, to_y
            ];
        }
    }

    return points;
}