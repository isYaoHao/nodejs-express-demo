const express = require('express');
const router = express.Router();
const pool = require("../utils/pool");


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.route("/login").post(function (req, res) {
    let {uname, upwd} = req.body;
    console.log(uname);

    let sql = `select * from secoonet.user where user_name="${uname}" and user_pwd="${upwd}"`
    pool.query(sql, function (err, data) {

        if (err) {
            res.send({status: 0, msg: "服务器正忙"})
        } else {
            if (data.length == 0) {
                res.send({status: 0, msg: "用户名或密码错误"})

            } else {
                res.send({status: 1, msg: "登录成功",data:{uname}})

            }
        }
    })

})

router.route("/reg").post(function (req, res) {
    let {uname, upwd} = req.body;

    let sql = `insert into secoonet.user(user_name,user_pwd) values ("${uname}","${upwd}")`;

    pool.query(sql, function (err, data) {

        if (err) {
            res.send({status: 0, msg: "服务器正忙"})
        } else {
            if (data.length == 0) {
                res.send({status: 0, msg: "用户名或密码错误"})

            } else {
                res.send({status: 1, msg: "注册成功"})
            }
        }
    })
})
router.route("/isrename").get(function (req, res) {
    let {uname} = req.query;
    let sql = `select * from secoonet.user where user_name="${uname}"`
    pool.query(sql, function (err, data) {

        if (err) {
            res.send({status: 0, msg: "服务器正忙"})
        } else {
            if (data.length == 0) {
                res.send("true")
            } else {
                res.send("false")
            }
        }
    })
})
module.exports = router;
