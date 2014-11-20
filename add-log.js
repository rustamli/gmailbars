
(function () {

$hiddenDiv = $('#hidden-gmailbars-div');

var params = {};
var fields = $hiddenDiv.attr('data-fields');
var fieldIndex,
    field,
    fieldValue,
    fieldsArray;

if (fields) {
    fieldsArray = fields.split(',');
    
    for (fieldIndex in fieldsArray) {
        if (fieldsArray.hasOwnProperty(fieldIndex)) {
            field = fieldsArray[fieldIndex].trim();
            if (field) {
                fieldValue = prompt("Please enter " + field + ":", "");
                if (fieldValue) {
                    params[field] = fieldValue.trim();
                }
            }
        }
    }
}

var bodyTemplateHbs = Handlebars.compile($hiddenDiv.html());
var subjectTemplateHbs = Handlebars.compile($hiddenDiv.attr('data-subject'));


$('div').each(function () {
    var $div = $(this);
    if ($div.attr('aria-label') === 'Message Body') {
     $div.html(bodyTemplateHbs(params));
    }
});

$('input').each(function () {
    var $input = $(this);
    if ($input.attr('placeholder') === 'Subject') {
     $input.val(subjectTemplateHbs(params));
    } 
})

$hiddenDiv.remove();

})();