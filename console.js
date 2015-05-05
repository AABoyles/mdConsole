report = function(error){};

$(function(){
  inputeditor = ace.edit("script");
  inputeditor.setTheme("ace/theme/github");
  inputeditor.getSession().setMode("ace/mode/markdown");
  inputeditor.getSession().on('change', function(e) {
      $("#output-wrapper").html(markdown.toHTML(inputeditor.getValue()));
  });

  $("#output-wrapper").html(markdown.toHTML(inputeditor.getValue()));

  $("#loadscript").click(function(){
    if($(this).hasClass("active")){
      $("#script-file").parent().fadeOut();
    } else {
      $("#script-file").parent().fadeIn();
    }
  });

  $("#script-file").change(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
        inputeditor.setValue(evt.target.result);
        $("#script-file").parent().fadeOut();
        $("#loadscript").removeClass("active");
      }
    }
    reader.readAsText(file);
  });

  $("#newscript").click(function(){
    inputeditor.setValue("");
    $("#origdata-file")[0].value = ""
  });

  $("#savescript").mousedown(function(){
    this.href="data:text/markdown;charset=utf8,"+inputeditor.getValue();
    this.download="Document.md";
  });

  $("#saveoutput").mousedown(function(){
    this.href="data:text/html;charset=utf8,"+$("#output-wrapper").html()
    this.download="output.html";
  });

});
