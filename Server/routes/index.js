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

router.get('/api/notice/detail', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT * FROM notice_detail WHERE id = ${req.query.id};`)

  res.json(rows)
});

router.get('/api/v2/notice', async (req, res) => {
  // console.log(req.query.site)
  let q = format(`SELECT * FROM notice_detail_no_contents WHERE site_id in (SELECT site_id FROM push_allow INNER JOIN site ON push_allow.site_id = site.id WHERE fcm_token = "${req.headers.token}") order by date desc, id desc`)
  console.log(q)
  let data = await promisePool.query(q)
  rows = data[0]
  rows.forEach(v=>{
    v.date = new Date(v.date).toLocaleDateString();
  })
  res.json(rows)
});
router.get('/api/v2/notice/major', async (req, res) => {
  // console.log(req.query.site)
  let q = format(`SELECT * FROM notice_detail_no_contents WHERE site_id in (SELECT site_id FROM push_allow INNER JOIN site ON push_allow.site_id = site.id WHERE fcm_token = "${req.headers.token}") and site_id < 140000 order by date desc, id desc`)
  console.log(q)
  let data = await promisePool.query(q)
  rows = data[0]
  rows.forEach(v=>{
    v.date = new Date(v.date).toLocaleDateString();
  })
  res.json(rows)
});
router.get('/api/v2/notice/common', async (req, res) => {
  // console.log(req.query.site)
  let q = format(`SELECT * FROM notice_detail_no_contents WHERE site_id in (SELECT site_id FROM push_allow INNER JOIN site ON push_allow.site_id = site.id WHERE fcm_token = "${req.headers.token}") and site_id >= 140000 order by date desc, id desc`)
  console.log(q)
  let data = await promisePool.query(q)
  rows = data[0]
  rows.forEach(v=>{
    v.date = new Date(v.date).toLocaleDateString();
  })
  res.json(rows)
});

module.exports = router;
