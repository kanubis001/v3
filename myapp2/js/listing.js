const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
var controlDB=require('./handleDB.js');
var db=require('./db.js');

const app = express();
var connection = db.init();
connection.connect((err)=>{
    if(err){
      console.err('error'+err.stack);
      return;
    }
  });
app.post('/searching', (req, res, next) => {
  console.log("adslkfjalsdjf;laskjdf");






});