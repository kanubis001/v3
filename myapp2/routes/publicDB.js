var request = require('request');
var convert=require('xml-js');
const { Stocklist } = require('../models');

var url = 'http://api.seibro.or.kr/openapi/service/StockSvc/getShotnByMartN1';

//입력 받아서 목록 가져오기 코드 넣으셈 나중에

//11.유가증권시장, 12.코스닥, 13.K-OTC, 14.코넥스, 50.기타시장
var market='12';
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=tVAn6Vdy3yBqV6lRAgcWSogeaOJ8Eb7r5xV0M1ICCidG%2FJuheud8n1aO8DFzEVq95vr%2FDpKup6xOhZFlgjVJ4Q%3D%3D'; /* Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
//페이지번호
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100000'); /* */
//한 페이지 결과 수
queryParams += '&' + encodeURIComponent('martTpcd') + '=' + encodeURIComponent(market); /* */


request({
    url: url + queryParams,
    method: 'GET'
},  (error, response, body) =>{
    // console.log('Status', response.statusCode);
    // console.log('Headers', JSON.stringify(response.headers));
    if (error){
        console.log(error);
    }
    if(response.statusCode==200){
        var result=body;
        var xmlToJson=convert.xml2json(result,{compact:true, spaces:3});
        var parsed=JSON.parse(xmlToJson);
        var totalNum = parsed.response.body.items.item.length; 
        console.log("totalNum : ",totalNum);
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
        for (var i=0; i<totalNum; i++){
            var name=parsed.response.body.items.item[i].korSecnNm._text;
            var num=parsed.response.body.items.item[i].shotnIsin._text;
            console.log(num);
            num=num.padStart(6,'0');

            Stocklist.create({
                CompanyName:name, 
                StockCode:num,
                Market:_market,
            })
            .then(result=>{})
            .catch(err=>{console.error(err)})
      
        }//for
    }

});


    

