const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const api = express();

// Middleware
api.use(morgan('dev'));
api.use(bodyParser.json());

// Routes
api.use('/users', require('./routes/users'));

// catch Not Found
api.use((req,res,next)=>{
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// Error Handlers
api.use((err, req, res, next)=>{
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    error: api.get('env') === 'development' ? err : {}
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
api.listen(PORT);
console.log(`Server is Starting at ${PORT}`);