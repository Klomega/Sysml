// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }

  
function save() {
    if(window.stage) {
        var dataURL = window.stage.toDataURL({ pixelRatio: 5 });
        downloadURI(dataURL, 'stage.png');
    }
}
 