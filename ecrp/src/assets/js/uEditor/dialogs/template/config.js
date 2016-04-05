
var templates = [];
$.post("/Dialog/UEditor/GetUEditorTemplate", {}, function (json) {
       if (json.IsOK) {
           templates = JSON.parse(json.ReturnValue);
           console.log(templates);
       }
   }, "json");