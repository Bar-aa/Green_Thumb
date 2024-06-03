const {DATABASE, DATABASE_HOST, DATABASE_USER, DATABASE_PAEEWORD} = process.env;

var mysql = require("mysql");

var conn = mysql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PAEEWORD,
    database: DATABASE
});

conn.connect( (error) => {
    if(error){
        throw error;
    }else {
        console.log( DATABASE + " MYSQL Connected...")
    }
});
module.exports=conn;