const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require("./config.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'app/dist')));
app.use('/api', require('./api'));

app.listen(process.env.PORT, function() {
  console.log('Le serveur répond sur le port: '+ process.env.PORT);
});
