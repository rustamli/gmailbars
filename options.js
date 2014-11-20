
var defaultOptions = { templates: [
    {
        title: 'Sample template',
        fields: 'name,email',
        subjectTemplate: 'Hello {{name}}!',
        bodyTemplate: 'Hello {{name}} ({{email}})!'
    }
] };


function save_options() {
    var templates = [];
    $('.template').each(function () {
        $template = $(this);
        var data = {
            title: $template.find('.title').val(),
            fields: $template.find('.fields').val(),
            subjectTemplate: $template.find('.subjectTemplate').val(),
            bodyTemplate: $template.find('.bodyTemplate').val()
        };

        data = {
            title: data.title ? data.title.trim() : '',
            fields: data.fields ? data.fields.trim() : '',
            subjectTemplate: data.subjectTemplate ? data.subjectTemplate.trim() : '',
            bodyTemplate: data.bodyTemplate ? data.bodyTemplate.trim() : ''    
        };

        if (data.title) {
            templates.push(data);
        } else {
            alert('Templates with blank titles are not being saved');
        }
    });

    chrome.storage.local.set({
        templates: templates
    }, function() {
        alert('Settings were successfully saved!');
        chrome.runtime.reload();
    });
}

function add_template(template) {
    $('.templates').append('<div class="template">        <input class="title" placeholder="Template title" value="' + template.title + '">        <input class="fields" placeholder="Template fields (comma-separated)" value="' + template.fields + '">        <input class="subjectTemplate" placeholder="Template subject source" value="' + template.subjectTemplate + '">        <textarea class="bodyTemplate" placeholder="Template body source">' + template.bodyTemplate + '</textarea>        <p>            <span class="delete-template">Delete this template</span>        </p>       </div>'); 
}


function restore_options() {
  chrome.storage.local.get(defaultOptions, function(items) {
    $.each(items.templates, function (index, template) {
        add_template(template);
    });
  });
}

$(function () {
    restore_options();
    $(document).on('click', '.delete-template', function () {
        $(this).closest('.template').remove();
    });

    $('#add-new').click(function () {
        add_template({
            title: 'New template',
            fields: '',
            subjectTemplate: '',
            bodyTemplate: ''    
        });
    });

    $('#save').click(save_options);

    $('#export').click(function () {
        chrome.storage.local.get(defaultOptions, function(items) {
            $('#export-box-textarea').val(JSON.stringify(items));    
            $('#export-box').fadeIn();
        }); 

    });

    $('#close-export').click(function () {
        $('#export-box').fadeOut();
        $('#export-box').val('');        
    });

    $('#import').click(function () {
        $('#import-box-textarea').val('');    
        $('#import-box').fadeIn();  
    });

    $('#accept-import').click(function () {
        var dataStr = $('#import-box-textarea').val();
        if (dataStr) {
            var data = JSON.parse(dataStr);
            chrome.storage.local.set(data, function() {
                alert('Settings were successfully imported!');
                chrome.runtime.reload();
            });
        }

    });
});