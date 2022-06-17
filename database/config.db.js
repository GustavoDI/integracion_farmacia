const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

connection.connect((err)=>{
  if (err) throw err; 
  console.log('Base datos en linea');
  
});




module.exports = connection


