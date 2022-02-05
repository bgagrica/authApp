const express = require('express');
const { sequelize, Users } = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const BP = require('body-parser')
const usrMsgs = require('./routes/userMessages')
const path = require('path')

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(BP.urlencoded({extended: false}));

app.use('/admin', BP.json());
app.use(express.json());
app.use(cors(corsOptions));

app.use('/admin', usrMsgs)




app.listen({ port: 3000 }, async () => {
    await sequelize.authenticate();
});