const mysql = require("mysql");
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'earysystem',
    port:'3306',//new
});

connection.connect((err) => {
    if(err)throw err;
    console.log("DB CONNECTED")
})
module.exports = connection;