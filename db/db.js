const mongoose = require('mongoose');
const MONGODB_URL = `mongodb+srv://mrj:dUvaMZNot0H0M5Po@cluster0-pdn58.mongodb.net/ba-db?retryWrites=true&w=majority`;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Mongoose connected'));
