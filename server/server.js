const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const database = require('./Models/database.js');
const vizql = require('vizql');

app.use(bodyParser.json());

app.get('/vizql', vizql(database.sequelize).pageRoute);

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/login.html'));
})

app.get('/register', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/register.html'));
})

app.post('register', function(req, res) {
  res.send("Thank you for creating an account");
})

app.post('/books/:book_id/review', function(req, res) {
  if (!:book_id) {
    res.send("Thank you for submitting a new book! :)")
  } else { 
    res.send("Thank you for submitting a review! :)");
  }
})

app.put('/books/:book_id/reviews/:review_id', function(req, res) {
  res.send("Thank you for updating your review! :)");
})

// app.get('/', function(req, res) {
//     res.send('GET REQUEST');
// })

app.listen(4000, () => {
    console.log('listening on port 4000!')
});