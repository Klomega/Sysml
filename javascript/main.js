/**
 * Functions for opening and closing the side bar
 */
function openNav() {
    document.getElementById("mySidepanel").style.width = "350px";
}
//testing
function closeNav() {
    parse_files();
    
}
// ----------------------------------------------------------------

/**
 *  Displaying the depth value in the navbar 
 * 
 *  Calls the openNav() function to make sure that the side bar is open when the page loads.
 */ 
$(document).ready(function() {
    openNav();

    var slider = document.getElementById("depth");
    var output = document.getElementById("depth_value");
    output.innerHTML = "depth to : " + slider.value;
    // Update the value when sliding
    slider.oninput = function() {
        output.innerHTML = "depth to : " + this.value;
    }

    var slider_from = document.getElementById("depth-from");
    var output_from = document.getElementById("depth_value_from");
    output_from.innerHTML = "depth from : " + slider_from.value;
    // Update the value when sliding
    slider_from.oninput = function() {
        output_from.innerHTML = "depth from : " + this.value ;
    }

    var size_slider = document.getElementById("box_size");
    var size_output = document.getElementById("box_size_value");
    size_output.innerHTML = "size : " + size_slider.value;
    // Update the value when sliding
    size_slider.oninput = function() {
        size_output.innerHTML = "size : " + this.value;
    }

    document.getElementById("ep").oninput = function() {
        document.getElementById("hidden_df").style.display = 'flex';  
        document.getElementById("hidden_bdd").style.display = 'none';
    }
    document.getElementById("bdd").oninput = function() {
        document.getElementById("hidden_df").style.display = 'none'; 
        document.getElementById("hidden_bdd").style.display = 'flex'; 
    }
    document.getElementById("ibd").oninput = function() {
        document.getElementById("hidden_df").style.display = 'none'; 
        document.getElementById("hidden_bdd").style.display = 'none'; 
    }
});
// -------------------------------

/**
 * Called when clicking on the draw / render button
 */
function draw() {

    var wind_width = $(window).width();
    var wind_height = $(window).height();

    if(window.stage != undefined) {
        window.stage.destroy();
    }

    var package = get_active_package();
    var block = get_active_block(package);

    var depth = parseInt(document.getElementById("depth").value);

    var size = parseInt(document.getElementById("box_size").value);

    if(block == "ALL" || block == undefined) {

        var draw_references = document.getElementById("draw-ref_bdd").checked;
        var draw_links = document.getElementById("draw-links_bdd").checked;

        var g_w = new Package_GraphicalView(wind_width, wind_height);
        g_w.draw_bdd_from_package(package,30, 30, size, draw_references, draw_links);
    }

    else if(document.getElementById("ep").checked) {
            var draw_part_arrows = document.getElementById("draw-part").checked;
            var draw_references = document.getElementById("draw-ref").checked;
            var draw_links = document.getElementById("draw-links").checked;

            var g_w = new Special_BDD_GraphicalView(wind_width, wind_height);
            g_w.draw_special_bdd(package, block, 30, 30, size, parseInt(document.getElementById("depth-from").value) - 1, depth -1, draw_part_arrows, draw_references, draw_links);

    } else if(document.getElementById("ibd").checked) {
        
            var g_w = new IBD_GraphicalView(wind_width, wind_height);
            g_w.draw_ibd(package, block, 30, 30, size , depth + 1);
    
        
    } else if(document.getElementById("bdd").checked) {

            var draw_references = document.getElementById("draw-ref_bdd").checked;
            var draw_links = document.getElementById("draw-links_bdd").checked;

            var g_w = new BDD_GraphicalView(wind_width, wind_height);
            g_w.draw_bdd(package, block, 30, 30, size, depth + 1, draw_references, draw_links);
        
    } else {
        alert("Please select a diagram type");
    }
    
}

function get_active_package() {
    var name = document.getElementById("selected-package").innerHTML;
    for(var i = 0; i < window.packages.length; i++) {
        if(window.packages[i].name == name) {
            return window.packages[i];
        }
    }
}


function get_active_block(package) {
    var name = document.getElementById("selected-block").innerHTML;
    if(name == "ALL") {
        return name;
    }
    for(var i = 0; i < package.blocks.length; i++) {
        if(package.blocks[i].name == name) {
            return package.blocks[i];
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function get_package_by_name(name) {
    for(var i = 0; i < window.packages.length; i++) {
        if(window.packages[i].name == name) {
            return window.packages[i];
        }
    }
    return false;
}