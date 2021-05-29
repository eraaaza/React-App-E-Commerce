const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const listingsRouter = require('./routes/listings');
const paymentsRouter = require('./routes/payments');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/listings', listingsRouter);
app.use('/payments', paymentsRouter);

mongoose.connect('mongodb://localhost:27017/team6project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to the Database.')
}).catch((e) => {
    console.log(e)
})

module.exports = app;
