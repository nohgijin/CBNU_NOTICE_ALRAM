const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool(require('./account.json'));

promisePool = pool.promise()

module.exports = {
    promisePool,
    async hasNotice(notice) {
        const [rows, fields] = await promisePool.query('SELECT * FROM notice WHERE title = ? and url = ?', [notice.title, notice.url])
        if (rows.length == 0) return false
        else return true
    }
}
