
/** 
    Initialize the .files and .packages array.
    Create a change listner for the file input
*/
$(document).ready(function(){
    window.files = new Array();
    window.packages = new Array();
    jQuery("input#sysml_file").change(function () {
       
        window.files.push($("#sysml_file")[0].files[0]);
        document.getElementById("file_list").innerHTML = getFileList(window.files);

        document.getElementById("sysml_file").value = null;

    });
});

/**
 * When clicking on the Parse button. Will parse the files and place the bdd_Package objects in the packages array
 */
function parse_files(){
    // Closing the side menu
    document.getElementById("mySidepanel").style.width = "0";

    window.packages = new Array();


    // Parsing from the editor
    var parser = new Parser(document.getElementById('editor').value);
    var packages = parser.get_parsed_packages();
    for(var i = 0; i < packages.length; i++) {
        if(package_is_in_array(packages[i], window.packages)) {
            replace_package(packages[i], window.packages);
        } else {
            window.packages = window.packages.concat(packages[i]);
        }       
    }
    // In case there are no files, the package list must be updated here
    update_package_list();

    for(var i = 0; i < window.files.length; i++) {
        const reader = new FileReader();
        reader.readAsText(window.files[i]);
        reader.onload = function (rEvent) {
                                                            // Removes the comments, maybe not perfect
            var parser = new Parser(reader.result.toString().replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, ''));
            // One file can contain multiple packages
            var packages = parser.get_parsed_packages();

            window.packages = window.packages.concat(packages);
            update_package_list();
            
        }
    }



    

}

function update_package_list() {
    var package_list = document.getElementById("package-list");
    package_list.innerHTML = getPackageList(window.packages);
}

function getPackageList(packages) {
    var str = "";
    for(var i = 0; i < packages.length; i++) {
        str += '<li><a onclick="update_block_list(\'' + i + '\')" id="' + i + '">' + packages[i].name + '</a></li>';
    }
    return str;
}

/**
 * Will be called as a callback function from the parse_files() function when the parser is finished
 */
function update_block_list(i) {
    var block_list = document.getElementById("block-list");
    block_list.innerHTML = getBlockList(window.packages[i], i);
    change_active_package(i);
}

/**
 * Returns a string with <li> tags containing all avaliable blocks in the package
 * @param {bdd_Package[]} packages 
 */
function getBlockList(package , i) {
    var str = '<li><a onclick="change_active_block(\'<ALL>\')" id="<ALL>">ALL</a></li>';

    for(var j = 0; j < package.blocks.length; j++) {
        str += '<li><a onclick="change_active_block(\'' + i +':'+ j + '\')" id="' + i +':'+ j + '">' + package.blocks[j].name + "</a></li>";
    }

    return str;
} 

function change_active_block(id) {
    document.getElementById("selected-block").innerHTML = document.getElementById(id).innerHTML;
}

function change_active_package(id) {
    document.getElementById("selected-package").innerHTML = document.getElementById(id).innerHTML;
}


/*
    Get a html list with the file names for the loaded files
*/
function getFileList(files) {
    if(files.length > 0) {
        var s = "<ul>";
        for(var i = 0; i < files.length; i++) {
           
            s += '<li class="list-group-item">';
            s += '<span class="name">'+ files[i].name +'</span>'
            s += '<button class="btn btn-default btn-xs pull-right remove-item" onclick="deleteFile(\'' + files[i].name + '\')">';

            s += '<span class="glyphicon glyphicon-remove"></span></button></li>';
       
        }
        return s + "</ul>";
    } else {
        return "";
    }
    
}

/*
    Delete a file from .files array based on the filename
*/
function deleteFile(filename) {
    for(var i = 0; i < window.files.length; i++) {
        if(window.files[i].name == filename) {
            // Splice is used to remove elements in an array
            // first argument i is index, second argument is amount of elements to delete
            window.files.splice(i,1);
            document.getElementById("file_list").innerHTML = getFileList(window.files);
            return;
        }
    }
    
    
}
