var mysql=require('mysql');
var  db_world={
  host     : 'localhost',
  user     : 'root',
  password : 'wogh190',
  database : 'genco2'
};
module.exports ={
   
    init:()=>{
      return mysql.createConnection(db_world);
      // return mysql.createPool(db_world);
    }
}