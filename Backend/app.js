const express=require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


module.exports = app;