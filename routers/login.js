const user = require("../model/user")
const crypto = require('crypto')

module.exports = function(req, res) {

    //统一信息格式，返回给前端
    /*
    code：
        0 : 表示成功
        1 ： 用户不存在
        2:密码错误
        3:服务器错误
    msg :
        字符串
     */

    user
        .findOne({ name: req.body.name })
        //检测是否已经对应的有数据
        .then(data => {
            //如果用户名存在，继续密码比对
            if (data) {
                let pwd = crypto.createHash('sha256').update(req.body.password).digest("hex")
                if (pwd === data.password) {
                    res.send({ code: 0, msg: "登陆成功" })
                } else {
                    res.send({ code: 2, msg: '密码错误' })
                }
            } else {
                //如果不存在用户名，返回错误码给前端
                res.send({ code: 1, msg: "用户不存在" });
            }
        })
        //捕捉错误
        .catch(e => {
            res.send({ code: 3, msg: "服务器异常，请重试~" });
            console.log(e);
        });
};