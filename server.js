const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;


const messagesFile = __dirname + '/data/data.json'
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Root route - index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Guestbook route - reads json data file
app.get('/guestbook', (req, res) => {
    fs.readFile(__dirname + '/data/data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Renderöi message.html -sivun
app.get('/message', (req, res) => {
    res.sendFile(__dirname + '/public/message.html');
});

app.post('/message', (req, res) => {
    const { username, country, message } = req.body;
  
    let messages = [];
    if (fs.existsSync(messagesFile)) {
      messages = JSON.parse(fs.readFileSync(messagesFile));
    }
  
    messages.push({ username, country, message });
  
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  
    res.redirect('/guestbook');
  });

  // Serve the guestbook page, showing messages
  app.get('/guestbook', (req, res) => {
    const messages = JSON.parse(fs.readFileSync(messagesFile));
    res.json(messages); // Directly return the JSON for simplicity
  });


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});