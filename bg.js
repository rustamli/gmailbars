
var patterns = ["https://*.google.com/*"];

var parentId = chrome.contextMenus.create({
    title: 'GmailBars: Run Template', 
    contexts: ['editable'],
    documentUrlPatterns: patterns
});

var defaultOptions = {
    templates: [
        {
            title: 'Sample template',
            fields: 'name,email',
            subjectTemplate: 'Hello {{name}}!',
            bodyTemplate: 'Hello {{name}} ({{email}})!'
        }
    ]
};

var onMenuItemClick = function (template) {
    return function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {template: template}, function(response) {});
        });
    }
};

chrome.storage.local.get(defaultOptions, function(items) {
    var i;
    for (i in items.templates) {
        if (items.templates.hasOwnProperty(i)) {
            var template = items.templates[i];
            
            chrome.contextMenus.create({
                title: template.title,
                contexts:['editable'], 
                documentUrlPatterns: patterns, 
                parentId: parentId, 
                onclick: onMenuItemClick(template) 
            });
        }
    }
});
