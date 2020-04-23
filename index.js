let inputeditor;

(() => {
  "use strict";

  let content = localStorage.getItem('content');
  if(content) $('#md').val(content);

  inputeditor = ace.edit("md");
  inputeditor.setTheme("ace/theme/github");

  inputeditor.getSession().setMode("ace/mode/markdown");
  inputeditor.getSession().on('change', () => {
    let content = inputeditor.getValue();
    $("#html").html(marked(content));
    localStorage.setItem('content', content);
  });

  $("#html").html(marked(inputeditor.getValue()));

  $("#md-load").click(function(){
    if($(this).hasClass("active")){
      $("#md-file").parent().fadeOut();
    } else {
      $("#md-file").parent().fadeIn();
    }
  });

  $("#md-file").change(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
        inputeditor.setValue(evt.target.result);
        $("#md-file").parent().fadeOut();
        $("#md-load").removeClass("active");
      }
    }
    reader.readAsText(file);
  });

  $("#md-new").click(function(){
    inputeditor.setValue("");
    $("#origdata-file")[0].value = "";
  });

  $("#md-save").mousedown(function(){
    this.href="data:text/markdown;charset=utf8,"+inputeditor.getValue();
    this.download="Document.md";
  });

  $("#html-save").mousedown(function(){
    this.href="data:text/html;charset=utf8,"+$("#html-wrapper").html();
    this.download="html.html";
  });
})();
