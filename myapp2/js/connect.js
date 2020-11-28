var mysql = require('mysql');
const { connect } = require('../routes');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wogh190',
  database : 'genco2'
});

connection.connect((err)=>{
  if(err){
    console.err('error'+err.stack);
    return;
  }

});
// var check=connection.query('SELECT StockCode FROM sangjanglist WHERE StockCode=000000;')
// connection.query('SELECT StockCode FROM sangjanglist WHERE StockCode=000000;', (error, rows, fields) => {
//   if (error) throw error;
//   console.log('User info is: ', rows);
//   if(rows==""){
//       console.log("noop");
//     }else{
//       console.log("yeah");//정보가 있는지 없는지 확인

//     }
// });





//   //데이터베이스에 정보가 있는지 확인 START
//       query_result=async(callback)=>{
//           return connection.query(query_content2,(err, result) =>{
//               if(err){
//                   callback(err);                        
//               }
//               callback(null,result);
//           });
//       }
//       selectQuery=()=>{
//           query_result((err, result)=>{     
              
//           if(result[0]==undefined){                                                
//               console.log("no : ");
              
//           }else{
//           console.log("already Exist! Code :", result[0].StockCode);                    
//           }    
//       });
//       //데이터베이스에 정보가 있는지 확인 END

//       //정보 없을시 삽입 로직 START
//       // _insert=async(callback)=>{
//       //     return connection.query(query_content,(err, result) =>{
//       //         if(err){
//       //             callback(err);                        
//       //         }
//       //         callback(null,result);
//       //     });
//       // }
      
//       Query_insert=()=>{
//           connection.query(query_content,(err,res)=>{

//           });
          
//       }
//   //정보 없을시 삽입 로직 END
// }  
// selectQuery();

// }

// connection.end();
