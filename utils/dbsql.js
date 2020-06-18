const dbs = (sql, callback) => {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'schoolmates'
    });
    connection.connect()
    connection.query(sql, function(error, results, fields){
        if (error) throw error;
        callback(results)
    });
    connection.end()
}

module.exports = { dbs }