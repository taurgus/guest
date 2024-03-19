document.getElementById('messageForm').addEventListener('submit', function(event) {
    // Prevent the form from submitting 
    event.preventDefault();

    // Get the form data
    var username = document.getElementById('username').value;
    var country = document.getElementById('country').value;
    var message = document.getElementById('message').value;

    // Check if the form data is not empty
    if (!username || !country || !message) {
        alert('All fields are required!');
        return;
    }

    // Create a new AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/ajaxmessage', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Handle the response
    xhr.onload = function() {
        if (this.status === 200) {
            var messages = JSON.parse(this.responseText);
            var messagesDiv = document.getElementById('messages');

            // Clear the messages div
            messagesDiv.innerHTML = '';

            // Add each message to the messages div
            for (var i = 0; i < messages.length; i++) {
                var messageDiv = document.createElement('div');
                messageDiv.textContent = messages[i].username + ' (' + messages[i].country + '): ' + messages[i].message;
                messagesDiv.appendChild(messageDiv);
            }
        } else {
            alert('Virhe');
        }
    };

    // Send the AJAX request
    xhr.send(JSON.stringify({
        username: username,
        country: country,
        message: message
    }));
});