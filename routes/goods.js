const express = require('express');
const router = express.Router();
const pool = require("../utils/pool");


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('users/datalist', {});
});


router.route("/datalist").get(function (req, res) {
    let {datalist} = req.query;

    let sql = `select * from secoonet.goodsdata where goodsid="${datalist}"`
    pool.query(sql, function (err, data) {


        if (err) {
            res.send({status: 0, msg: "服务器正忙"})
        } else {
            if (data.length == 0) {
                res.send({status: 0, msg: "服务器正忙"})
            } else {
                res.send(data[0])
            }
        }
    })
})

router.route("/datalist").get(function (req, res) {
    let {datalist} = req.query;

    let sql = `select * from secoonet.goodsdata where goodsid="${datalist}"`
    pool.query(sql, function (err, data) {


        if (err) {
            res.send({status: 0, msg: "服务器正忙"})
        } else {
            if (data.length == 0) {
                res.send({status: 0, msg: "服务器正忙"})
            } else {
                res.send(data[0])
            }
        }
    })
})



module.exports = router;
