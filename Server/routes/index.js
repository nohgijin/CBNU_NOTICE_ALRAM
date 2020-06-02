var express = require('express');
const {
  promisePool
} = require('./db')
var router = express.Router();
var { format } = require('mysql2')

router.get('/api/notice', async (req, res) => {
  // console.log(req.query.site)
  let q = format(`SELECT * FROM notice_detail_no_contents WHERE site_id in (${req.query.site}) order by date desc`)
  // console.log(q)
  let data = await promisePool.query(q)
  rows = data[0]
  res.json(rows)
});


module.exports = router;
