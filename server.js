const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const messagesFile = __dirname + '/data/data.json'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
          const messages = JSON.parse(data);
          let results = `
          <head>
              <link rel="stylesheet" type="text/css" href="/styles.css">
          </head>
          <body>
              <table border="1">
      `;
      
          results += '<tr><td colspan="3"><a href="/">Palaa etusivulle</a></td></tr>';

          for (let i = 0; i < messages.length; i++) {
              results +=
                  '<tr>' +
                  '<td>' + messages[i].username + '</td>' +
                  '<td>' + messages[i].country + '</td>' +
                  '<td>' + messages[i].message + '</td>' +
                  '</tr>';
          }

          results += '</table>';
          res.send(results);
      }
  });
});

// Render message.html 
app.get('/message', (req, res) => {
    res.sendFile(__dirname + '/public/message.html');
});
//app.post to send the message to the server
//Required const's in shortened form
app.post('/message', (req, res) => {
    const { username, country, message } = req.body;
  
    let messages = [];
    if (fs.existsSync(messagesFile)) {
      messages = JSON.parse(fs.readFileSync(messagesFile));
    }
  //Push data to the messages at bottom
    messages.push({ username, country, message });
  
    fs.writeFileSync(messagesFile, JSON.stringify(messages));
  //Redirect to the guestbook page after the message has been added
    res.redirect('/guestbook');
  });

  // Serve the guestbook page, showing messages
  app.get('/guestbook', (req, res) => {
    const messages = JSON.parse(fs.readFileSync(messagesFile));
    res.json(messages); // Directly return the JSON for simplicity
  });
  
  //Serve the ajaxmessage.html
  app.get('/ajaxmessage', (req, res) => {
    res.sendFile(__dirname + '/public/ajaxmessage.html');
});

app.post('/ajaxmessage', (req, res) => {
  const { username, country, message } = req.body;

  let messages = [];
  if (fs.existsSync(messagesFile)) {
    messages = JSON.parse(fs.readFileSync(messagesFile));
  }

  messages.push({ username, country, message });

  fs.writeFileSync(messagesFile, JSON.stringify(messages));

  res.json(messages);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});