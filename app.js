const express = require('express');
const monggose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require("./routes/index");
require('dotenv').config();
const app = express();


require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use("/api",indexRouter);

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
monggose.connect(MONGODB_URI_PROD,{useNewUrlParser:true})
.then(()=>console.log("monggose connected"))
.catch((err)=> console.log("DB connection fail", err));

app.listen(process.env.PORT || 5000, ()=>{
    console.log("server on");
})