var express = require('express');
var router = express.Router();
const { Stocklist, Sangjanglist } = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;
var detailS=require('./detailStock.js');
const { render } = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  Stocklist.findAll()
    .then((details) => {
      res.render('market', { details });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
router.get("/buysell/:type", (req, res,next) =>{
  var type=req.params.type;
  console.log(type);
  if(type=='buy'){
    res.render('buy_stock', { title: 'buy_stock'});
  }else if(type=='sell'){
    res.render('sell_stock', { title: 'sell_stock'});
  }else if(type=='jumoon'){
    res.render('jumoon_list', { title: 'jumoon_list'});
  }else{
    next(error);
  }
});

router.get('/list/:num',(req,res,next)=>{
  //리스트 출력을 위한 로직.
  Stocklist.findAll({where:{StockCode:req.params.num}})
    .then((_res) => {
      console.log("_res:",_res);
      res.json(_res);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });

})
router.get('/lists/:num/:category', (req, res, next)=>{
  //리스트 활성화를 위한 로직
  switch(req.params.category){
    //데이터 넣고 다시 ㄱㄱ
    case 'none':
      // res.render('searching',{name : 'none'});
      res.render('/',{name : 'none'});
      break;
    case 'num':
      Stocklist.findOne({where:{StockCode:req.params.num}})
      .then((_res) => {
        res.status(200).json( _res );
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
      break;
    case 'name':
      console.log("!!!!!!!!", req.params.category);
      Stocklist.findAll({
        where:{
          CompanyName:{
            [Op.like]:"%"+req.params.num+"%"
          }//CompanyName
        }//where
      })
      .then((_res)=>{
        // console.log("oh!:",_res);
        res.status(200).json( _res );
      })
      .catch(err=>{
        console.error(err);
        res.render('/',{name:'error'})
      })
      break;
  }//switch
 
  console.log("category:",req.params.category);
 
});
// router.get('/lists/:contents_num', (req, res, next)=>{
//   //리스트 활성화를 위한 로직
//   console.log(req.params.contents_num);
//   Stocklist.findAll({
//     where:{
//       CompanyName:{
//         [Op.like]:"%"+content+"%"
//       }//CompanyName
//     }//where
//   })//findAll
//   .then((_res) => {
//     res.status(200).json( _res );
//   })
//   .catch((err) => {
//     console.error(err);
//     next(err);
//   });
// });

router.get('/details/:id',(req,res,next)=>{
  //리스트 출력을 위한 로직.
  Sangjanglist.findAll({where:{StockCode:req.params.id}})
    .then((_res) => {
      console.log("_res2:",_res);
      res.json(_res);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get("/more/:code", (req, res, next)=>{
  //세부항목을 위한 로직
  var code=req.params.code;
  console.log("c:",code);
  detailS.detail(code)
  .then(result=>{
    mrk_price=result.CurJuka,
    highest_price=result.UpJuka,
    high_price=result.HighJuka,
    lowest_price=result.DownJuka,
    low_price=result.LowJuka,
    stock_price=result.FaceJuka,
    per=result.Per,
    high52_price=result.High52,
    low52_price=result.Low52,
    amount=result.Amount
    res.json([{mrk_price,highest_price,high_price,lowest_price,
      low_price,stock_price,per,high52_price,low52_price,amount}])
  })
  .catch((err)=>{
    console.err(err);
  })
})
router.post('/searching', (req,res,next)=>{
  //검색기능.
  const category=req.body.searhingCategory;
  const content=req.body.contents;
  switch(category){
    //데이터 넣고 다시 ㄱㄱ
    case 'none':
      // res.render('searching',{name : 'none'});
      res.render('searching',{name : 'none'});
      break;
    case 'num':
      Stocklist.findOne({where:{StockCode:content}})
      .then(result=>{
        res.render('searching',{
          name:result.CompanyName,
          code:result.StockCode,
          market:result.Market,
        })
      })
      .catch(err=>{
        console.error(err);
        res.render('searching',{name:'error'})
      })
      break;
    case 'name':
      Stocklist.findAll({
        where:{
          CompanyName:{
            [Op.like]:"%"+content+"%"
          }//CompanyName
        }//where
      })
      .then((result)=>{
        console.log(result);
        res.render('searching',{
          name:result.stocklist.CompanyName,
          code:result.StockCode,
          market:result.Market,
        })
      })
      .catch(err=>{
        console.error(err);
        res.render('searching',{name:'error'})
      })
      break;
  }//switch
});
module.exports = router;
