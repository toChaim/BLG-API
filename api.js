const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const api = express();

// Middleware
api.use(morgan('dev'));
api.use(bodyParser.json());

// Routes
api.use('/users', require('./routes/users'));

// Start Server
const PORT = process.env.PORT || 3000;
api.listen(PORT);
console.log(`Server is Starting at ${PORT}`);