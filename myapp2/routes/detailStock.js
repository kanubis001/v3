const convert = require('xml-js');
const request = require('request');

module.exports={
    detail:(CODE)=>{
        const HOST = 'http://asp1.krx.co.kr/servlet/krx.asp.XMLSise?code=';
        var requestUrl = `${HOST}${CODE}`;
        var detailValue;
        // saveParsed=(value)=>{
        //     // console.log(value);
        //     detailValue=value;
        // }
        // console.log(detailValue);
        return new Promise(resolve=>{
            request.get(requestUrl, (err, res, body)=> {
                if(err) {
                        console.log(`err => ${err}`);
                } else {
                    if(res.statusCode == 200) {
                        var result = body;
                        // console.log(`body data => ${result}`);
                        var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
                        // console.log(`xml to json => ${xmlToJson}`);
                        var parsed=JSON.parse(xmlToJson);
                        // var totalNum = parsed.response.body.items.item.length; 
                        // console.log("parsed:",parsed.stockprice.TBL_StockInfo._attributes.JongName);
                        var name=parsed.stockprice.TBL_StockInfo._attributes.JongName;
                        // console.log(parsed.stockprice.TBL_StockInfo._attributes);
                        resolve(parsed.stockprice.TBL_StockInfo._attributes);
                    /*
                    JongName: 'NAVER보통주',
                    CurJuka: '281,500',
                    DungRak: '2',
                    Debi: '500',
                    PrevJuka: '281,000',
                    Volume: '564,210',
                    Money: '158,682,529,500',
                    StartJuka: '282,000',
                    HighJuka: '282,500',
                    LowJuka: '278,500',
                    High52: '339,000',
                    Low52: '143,000',
                    UpJuka: '365,000',
                    DownJuka: '197,000',
                    Per: '70.27',
                    Amount: '164,263,395',
                    FaceJuka: '100'
                    */
        
                    }
        
                }
        
                })//request.get

        })
        

    }
}