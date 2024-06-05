const { error } = require("console");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
require('./config/dbconnection');
const Route=require('./routes/Route');
const bodyParser=require("body-parser");
const app = express(); 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/Green_Thumb',Route);
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Index Error";
    res.status(err.statusCode).json({
        message:err.message,
    });

});

app.listen(4400, function(){
    console.log('Server started on Port 4400');
});