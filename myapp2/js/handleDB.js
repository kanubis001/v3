var dateFormat=require('dateformat');
const { response } = require('express');
var db=require('./db.js');
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
checkDB=(code)=>{
    // checkDB=(sangjang_list,code)=>{
    var exStr='';
    var connection = db.init();
    connection.connect((err)=>{
        if(err){
          console.err('error'+err.stack);
          return;
        }
    });//connection.connect
    var code_chk=code;
    console.log("code : ",code,"|||code_chk : ",code_chk);
    var query_content2="SELECT StockCode FROM sangjanglist WHERE StockCode=";
    query_content2+=code+";";
    console.log(query_content2);
    connection.query(query_content2, (error, rows, fields) => {
        console.log("fields:",rows);
        if (error) throw error;
        if(rows==""){
            exStr='nonexist';
            return exStr;
        }else{
            console.log("yeah");//정보가 있는지 없는지 확인
            exStr='exist';
            return exStr;
        }
      });//connection.query
    // console.log(res);

    // connection.end();
}
module.exports ={
    insert:(sangjang_list,num)=>{
        var query_content;
        var rawdate_sangjang=sangjang_list.상장일;
        var r_date=ExcelDateToJSDate(rawdate_sangjang);
        var sangjangDate=dateFormat(r_date,"yyyymmdd")
        var mainProduct=sangjang_list.주요제품;
        if (mainProduct==undefined)
        {//remove small quota
            mainProduct="-";
        } else {
            mainProduct=mainProduct.replace(/'/gi,"");
        }
            query_content = "INSERT INTO sangjanglist(CompanyName, StockCode,Category,MainProduct,SangJangDay,GyulSanMonth,President,Homepage,Localarea)";
            query_content += "VALUES(\'";
            query_content += sangjang_list.회사명+"\',";
            query_content += sangjang_list.종목코드+",\'";
            query_content += sangjang_list.업종+"\',\'";
            query_content += mainProduct+"\',";
            query_content += sangjangDate+",\'";
            query_content += sangjang_list.결산월+"\',\'";
            query_content += sangjang_list.대표자명+"\',\'";
            query_content += sangjang_list.홈페이지+"\',\'";
            query_content += sangjang_list.지역+"\');"
            //console.log(query_content);
            return query_content;
        // }//else phrase
    },//insert module
    insert2:(name, num, market)=>{
        switch (market){
            case '11':
                var _market='유가증권시장';
                break;
            case '12':
                var _market='코스닥';
                break;
            case '13':
                var _market='K-OTC';
                break;
            case '14':
                var _market='코넥스';
                break;
            case '50':
                var _market='기타시장';
                break;
            }
        var query_content;
        query_content = "INSERT INTO stocklist(CompanyName, StockCode,Market)";
        query_content += "VALUES(\'";
        query_content += name+"\',\'";
        query_content += num+"\',\'";
        query_content += _market+"\');";
        return query_content;
    },//insert2 module
    find:(category,content)=>{
        var connection = db.init();
        connection.connect((err)=>{
            if(err){
              console.err('error'+err.stack);
              return;
            }
        });//connection.connect
        function query1(name){
            console.log("111:",name);
        }
        switch (category){

            case 'none':
                
                break;
            case 'num':
                var name
                var market
                var query_name = "SELECT CompanyName FROM stocklist WHERE StockCode=";
                query_name += content+";";
                var query_market="SELECT Market FROM stocklist WHERE StockCode=";
                query_market += content+";";
                connection.query(query_name,(err, result)=>{
                    name=result[0].CompanyName;
                    console.log(result[0].CompanyName);
                    query1(name);
                });//connection query
                connection.query(query_market,(err, result)=>{
                    market=result[0].Market;
                });//connection query
                connection.end();
                console.log(name,market);
                return {name:name,market:market};
                                
                
            case 'name':
                var _market='K-OTC';
                break;
        }

    },
    test:'test'
}//module export