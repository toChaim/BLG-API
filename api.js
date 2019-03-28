const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const api = express();

// Middleware

// Routes

// Start Server
const PORT = process.env.PORT || 3000;
api.listen(PORT);
console.log(`Server is Starting at ${PORT}`);