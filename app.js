const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
var user = require('./users.js')

app.use(express.static('public'))
app.use(bodyParser.json())

// cors
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  credentials: true,
}));

// listen on port
app.listen(3030, () => console.log('Server started at port: 3030'));

// routes
app.use('/api', user);