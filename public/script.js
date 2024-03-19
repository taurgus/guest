document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var country = document.getElementById('country').value;
    var message = document.getElementById('message').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/ajaxmessage', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.status === 200) {
            var messages = JSON.parse(this.responseText);
            var messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '';
            for (var i = 0; i < messages.length; i++) {
                messagesDiv.innerHTML += '<p><strong>' + messages[i].username + ' (' + messages[i].country + '):</strong> ' + messages[i].message + '</p>';
            }
        }
    };
    xhr.send(JSON.stringify({
        username: username,
        country: country,
        message: message
    }));
});