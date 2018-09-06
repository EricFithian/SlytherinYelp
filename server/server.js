const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const database = require('./Models/database.js');
const vizql = require('vizql');


app.get('/vizql', vizql(database.sequelize).pageRoute);

// app.get('/', function(req, res) {
//     res.send('GET REQUEST');
// })

app.listen(4000, () => {
    console.log('listening on port 4000!')
});