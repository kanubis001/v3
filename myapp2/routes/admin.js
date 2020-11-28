const express = require('express');
const router = express.Router();
const { Sangjanglist } = require('../models');
const http = require('http');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const xlsx = require('xlsx');
var dateFormat=require('dateformat');
var fs=require('fs');
const app = express();
var dateFormat=require('dateformat');
var controlDB=require('../js/handleDB.js');
// var db=require('./js/db.js');
const { timeStamp } = require('console');
const { SSL_OP_CISCO_ANYCONNECT } = require('constants');
const { RequestHeaderFieldsTooLarge } = require('http-errors');
ExcelDateToJSDate=(serial)=>{        //엑셀에서 넘어온 시리얼 날짜를 변경해줌.
    var utc_days  = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;                                        
    var date_info = new Date(utc_value * 1000);
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
 }

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     limit: '150mb',
//     extended: false,
// }));

router.get('/', (req, res, next) => {
    done="not yet";
    let contents = '';
    contents += '<html><body>';
    contents += '   <form action="/admin/updatedb" method="POST" enctype="multipart/form-data">';
    contents += '       <input type="file" name="xlsx" />';
    contents += '       <input type="submit" />';
    contents += '   </form>';
    contents += `   <p> ${done}`;
    contents += '</body></html>';
    res.send(contents);
});
router.post('/updatedb',  (req, res, next) => {
    let today=dateFormat(new Date(),"yyyymmdd");
    console.log(today);
    const resData = {};
    const form = new multiparty.Form({
        autoFiles: true,
    });
    form.on('file', (name, file) => {
        const workbook = xlsx.readFile(file.path);
        const sheetnames = Object.keys(workbook.Sheets);
        let i = sheetnames.length;
        while (i--) {
            const sheetname = sheetnames[i];
            resData[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
        }
    });
    form.on('close', () => {
        //res.send(resData);
        console.log("total : ",resData.상장법인목록.length,"개");
        for(var i=0; i<resData.상장법인목록.length; i++){
            var rawdate_sangjang=resData.상장법인목록[i].상장일;
            var r_date=ExcelDateToJSDate(rawdate_sangjang);
            var sangjangDate=dateFormat(r_date,"yyyy-mm-dd")
            var mainProduct=resData.상장법인목록[i].주요제품;
            var code=resData.상장법인목록[i].종목코드.padStart(6,'0');
            if (mainProduct==undefined)
            {//remove small quota
                mainProduct="-";
            } else {
                mainProduct=mainProduct.replace(/'/gi,"");
            }
            Sangjanglist.findOne({where: { StockCode: resData.상장법인목록[i].종목코드 } })
            // const listyon=Sangjanglist.findOne({where: { StockCode: '090000' } })
            .then(result=>{
            })
            .catch(err=>{
                console.error(err);
            });
            Sangjanglist.create({
                CompanyName: resData.상장법인목록[i].회사명,
                StockCode: code,
                Category: resData.상장법인목록[i].업종,
                MainProduct: mainProduct,
                GyulSanMonth: resData.상장법인목록[i].결산월,
                President: resData.상장법인목록[i].대표자명,
                Homepage: resData.상장법인목록[i].홈페이지,
                Localarea: resData.상장법인목록[i].지역,
                SangJangDay: sangjangDate,
                })
                .then(result=>{
                   console.log('inserted');
                })
                .catch(err=>{
                    console.error(err);
                    //삽입까지는 잘 됨.
                    //이 부분 추후 수정 필요.
                });
        }//for문
     });//form.on문
    form.parse(req);
});//router.post
module.exports = router;
