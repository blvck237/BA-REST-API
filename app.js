// const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'http://localhost:*' });
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const products = require('./routes/products');
const auth = require('./routes/auth');


var interval;

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', products);
app.use('/auth', auth);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log('Log: err', err);
  // render the error page
  return res.status(err.status || 500).json({
    error: err.status === 500 ? `Internal Server Error: ${err}` : `${err}`,
  });
});

const emitProductList = async socket => {
  try {
    const producTable = require('./database/products.json');
    socket.emit('refreshProducts', producTable); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

io.on('connection', socket => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => emitProductList(socket), 60000);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports = app;
