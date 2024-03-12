const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Root route - serves index.html
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

// New message route - adds data to json file
// Renderöi message.html -sivun
app.get('/message', (req, res) => {
    res.sendFile(__dirname + '/public/message.html');
});

app.post('/message', (req, res) => {
    // Add your code here to handle adding new messages to the json file
    
    
    
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});