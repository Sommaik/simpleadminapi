const express = require('express');
const auth = require('./helper/auth');
const bodyParser = require('body-parser');
const loginController = require('./controller/login');
const userController = require('./controller/user');
const app = express();
const cors = require('cors');

app.use(auth.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/login', loginController);
app.use('/user', userController);

module.exports = app;
