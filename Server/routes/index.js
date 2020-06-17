/**
 * This Script Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */

var express = require('express');
const {
  promisePool
} = require('./db')
var router = express.Router();
var { format } = require('mysql2')

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/notice', async (req, res) => {
  let q = format(`SELECT * FROM notice_detail_no_contents WHERE site_id in (${req.query.site}) order by date desc, id desc limit 15 offset ${req.query.offset*15};`)
  let data = await promisePool.query(q)
  rows = data[0]
  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
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

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */

router.get('/api/v2/site/notice', async (req, res) => {
  let q = format(`SELECT * FROM notice_detail_no_contents WHERE category1 = '${req.query.site}' OR category2 = '${req.query.site}' order by date desc, id desc `)
  console.log(q)
  let data = await promisePool.query(q)
  rows = data[0]
  rows.forEach(v=>{
    v.date = new Date(v.date).toLocaleDateString();
  })
  res.json(rows)
});


/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
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

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
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

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/notice/noticeId', async (req, res) => {
  // console.log(req.query.site)
  let q = format(`SELECT * FROM notice_detail_no_contents WHERE id in (${req.query.notice}) order by date desc,id desc limit 15 offset ${req.query.offset*15};`)
  console.log(q)
  let data = await promisePool.query(q)
  rows = data[0]
  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/notice/detail', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT * FROM notice_detail WHERE id = ${req.query.id};`)

  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/v2/notice/detail', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT * FROM notice_detail WHERE id = ${req.query.id};`)

  rows.forEach(v=>{
    v.date = new Date(v.date).toLocaleDateString();
  })


  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/notice/site', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT * FROM notice_detail order by site_id;`)

  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/site', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT site.category2 as title, site.id as site_id FROM site;`)

  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/site/all', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT * FROM site;`)

  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/allow', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT * FROM push_allow WHERE fcm_token = '${req.headers.token}'`)

  rows = rows.map((item) => item.site_id)

  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/allow/major', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT * FROM push_allow WHERE fcm_token = '${req.headers.token}' and site_id < 140000`)

  rows = rows.map((item) => item.site_id)

  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/allow/common', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT * FROM push_allow WHERE fcm_token = '${req.headers.token}' and site_id >= 140000`)

  rows = rows.map((item) => item.site_id)

  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/allow/site', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT * FROM push_allow INNER JOIN site ON push_allow.site_id = site.id WHERE fcm_token = '${req.headers.token}'`)

  res.json(rows)
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.get('/api/v2/allow/site', async (req, res) => {
  [rows, fileds] = await promisePool.query(`SELECT DISTINCT category2 AS site FROM push_allow_detail WHERE fcm_token = "${req.headers.token}"`)

  res.json(rows.map(data=>data.site))
});

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */

router.post('/api/fcm_token', async (req, res) => {
  // console.log('asfasf')
  [rows, fileds] = await promisePool.query('SELECT * FROM user WHERE ?', {fcm_token:req.headers.token})
  if (rows.length == 0) await promisePool.query('INSERT INTO user SET ?', {fcm_token:req.headers.token})
  // console.log(req.body)
  res.send()
})

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.post('/api/allow', async (req, res) => {
  let data = {
    fcm_token : req.headers.token,
    site_id:req.body.site_id
  }

  console.log(data)

  let result = await promisePool.query('INSERT INTO push_allow SET ?', data)

  res.json(result)
})

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.post('/api/allow/site', async (req, res) => {

  try {
    let data = {
      fcm_token : req.headers.token,
      site_name:req.body.site_name
    }
  
    console.log(data)
  
    let result = await promisePool.query(`INSERT INTO push_allow SET fcm_token = '${data.fcm_token}', site_id = (SELECT id as site_id FROM site WHERE category2="${data.site_name}" LIMIT 1) `)
  
    res.json(result)
  } catch (error) {
    res.sendStatus(404)
  }



})

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.delete('/api/allow', async (req, res) => {
  let result = await promisePool.query('DELETE FROM push_allow WHERE fcm_token = ? and site_id = ?', [req.headers.token, req.query.site_id])
  res.json(result)
})

/**
 * This Function Created by 노기진
 * Copyright (c) 2020. All rights reserved.
 */
router.delete('/api/v2/allow', async (req, res) => {
  try {
    let result = await promisePool.query('DELETE FROM push_allow WHERE fcm_token = ? and site_id = (SELECT id as site_id FROM site WHERE category2= ? LIMIT 1) ', [req.headers.token, req.query.site_name])
    res.json(result) 
  } catch (error) {
    res.sendStatus(404)
  }
})



module.exports = router;
