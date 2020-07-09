
$(document).ready(function() {

    closeEditor();

    // For allowing tab key
    var textarea = document.getElementById('editor');
    textarea.onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
}); 

function openEditor() {
    document.getElementById('editor-container').style.display = 'flex';
}

function closeEditor() {
    document.getElementById('editor-container').style.display = 'none';
}

function cancelEditor() {
    document.getElementById('editor').value = "";
    closeEditor();
}


function editorAddFile() {
    
    closeEditor();
    closeNav();
}

function package_is_in_array(package, array) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].name == package.name) {
            return true;
        }
    }
    return false;
}
function replace_package(package, array) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].name == package.name) {
            array[i] = package;
        }
    }
}