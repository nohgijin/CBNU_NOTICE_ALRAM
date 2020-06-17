/**
 * This Script Created by 조정제
 * Copyright (c) 2020. All rights reserved.
 */


const mysql = require('mysql2');

// create the connection to database
const pool = mysql.createPool(require('./account.json'));

promisePool = pool.promise()

module.exports = {
    promisePool,
    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    async hasNotice(notice) {
        const [rows, fields] = await promisePool.query('SELECT * FROM notice WHERE title = ? and url = ?', [notice.title, notice.url])
        if (rows.length == 0) return false
        else return true
    },
    /**
     * This Function Created by 조정제
     * Copyright (c) 2020. All rights reserved.
     */
    async insertNotice({site_id,title,url,date}){
        if(date == "") date=null
        const [result] = await promisePool.query('INSERT INTO notice SET ?', {site_id,title,url,date})
        return result;
    },
}
