
var j = document.createElement('script');
j.src = chrome.extension.getURL('jquery-1.10.2.min.js');
(document.head || document.documentElement).appendChild(j);

var g = document.createElement('script');
g.src = chrome.extension.getURL('handlebars.min.js');
(document.head || document.documentElement).appendChild(g);

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.template) {

    var hiddenDiv = document.createElement('div');
    hiddenDiv.innerHTML = msg.template.bodyTemplate;
    hiddenDiv.setAttribute('id', 'hidden-gmailbars-div');
    hiddenDiv.setAttribute('data-fields', msg.template.fields);
    hiddenDiv.setAttribute('data-subject', msg.template.subjectTemplate);
    hiddenDiv.style.display = 'none';
    document.body.appendChild(hiddenDiv);

    var m = document.createElement('script');
    m.src = chrome.extension.getURL('add-log.js');
    (document.head || document.documentElement).appendChild(m);
  }
});
