const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const hbs = require('hbs');


// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Middleware to serve static content

app.use(express.static('public'));

app.get('/hello-world', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.render('home', {
    name: 'Michael Scott',
    title: 'Node with Handlebars'
  });
});

app.get('/generic', (req, res) => {
  res.render('generic', {
    name: 'Michael Scott',
    title: 'Node with Handlebars'
  });
});

app.get('/elements', (req, res) => {
  res.render('elements', {
    name: 'Michael Scott',
    title: 'Node with Handlebars'
  });
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
