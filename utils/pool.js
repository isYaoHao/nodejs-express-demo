const mysql = require("mysql");

let pool = mysql.createPool({
	connectionLimit:30,
	host:"localhost",	
	user:"root",	
	password:"",	
	database:"secoonet"

})

module.exports = pool;