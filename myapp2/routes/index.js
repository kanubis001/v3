var express = require('express');
var router = express.Router();
var controlDB=require('../js/handleDB.js');
var db=require('../js/db.js');
const handleDB = require('../js/handleDB.js');
const { Stocklist, Sangjanglist } = require('../models');


/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Welcome' , message:'Pug style'});
});
router.get('/home', (req, res, next) =>{
  res.render('index', { title: 'Welcome' , message:'Pug style'});
});
router.get('/news', (req, res, next) =>{
  res.render('news', { });
});
// router.get('/market', (req, res, next) =>{
//   res.render('market', { title: 'Market'});
// });

router.get('/login', (req, res, next) =>{
  res.render('login', { title: 'login'});
});
router.get('/testtrading', (req, res, next) =>{
  res.render('testtrading', { title: 'test_trading'});
});

router.get('/buysellprocess', (req, res, next)=>{
   res.render('sell_stock', { title: 'sell_process'});
});
// 

router.post('/searching',(req,res, next)=>{
  var category=req.body.searhingCategory;
  var contents=req.body.contents;
  var connection = db.init();
  connection.connect((err)=>{
      if(err){
        console.err('error!!!!:'+err.stack);
        return;
      }
  });//connection.connect
  switch (category){
      case 'none':
        res.render('market');
        break;
      case 'num':
        connection.query(`SELECT * FROM stocklist WHERE StockCode=?`,[contents],(err, result)=>{
          if(result[0]==undefined){
            res.render('market', {name:'Wrong Code'});
          } else {
            if(err){
              throw err;
            }
            var name=result[0].CompanyName;
            var market=result[0].Market;
            var code=result[0].StockCode;
            res.render('market', {name,market,code});
          }
        });//connection query
        connection.end();
        break;
      case 'name':
        contents="%"+contents+"%";
        console.log(contents);
        connection.query(`SELECT * FROM stocklist WHERE CompanyName like ?`,[contents],(err, result)=>{
          for(var i=0; i<result.length; i++){
            console.log(result[i]);
            // var name=result[0].CompanyName;
            // var market=result[0].Market;
            // var code=result[0].StockCode;
          }
          var jsonData=JSON.stringify(result);
          res.writeHead(200, { "Content-Type": "application/json;characterset=utf-8" });
          res.write(jsonData);
          res.end('market');

          // res.writeHead(200,result);
          // res.end('market', {name,market,code});
          
        });//connection query
        /*
        connection.query(`SELECT * FROM stocklist WHERE CompanyName=?`,[contents],(err, result)=>{
          if(result[0]==undefined){
            res.render('market', {name:'Wrong Code'});
          } else {
            if(err){
              throw err;
            }
            var name=result[0].CompanyName;
            var market=result[0].Market;
            var code=result[0].StockCode;
            res.render('market', {name,market,code});
          }
        });//connection query*/
          break;
  }//switch-case
});//router.post


// router.post('/searching',(req,res, next)=>{
//   res.redirect(301,'javascripts/search_process.js');

// });




// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
