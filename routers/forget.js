const user = require('../model/user')
const crypto = require("crypto");
module.exports = function(req, res) {
    let reqData = req.body;
    user.findOne({ name: reqData.name }).then(data => {
        if (data) {
            let pa = crypto.createHash('sha256').update(reqData.pa).digest("hex");
            if (pa === data.scret.pa) {
                user.updateOne(data, { password: crypto.createHash('sha256').update(reqData.password).digest("hex") }).then(() => {
                        res.send({
                            code: 0,
                            msg: '修改密码成功'
                        })
                    }

                ).catch(() => {
                    res.send({
                        code: 3,
                        msg: '服务器错误，请稍后再试～'
                    })
                })
            } else {
                res.send({
                    code: 7,
                    mag: '密保答案不正确'
                })
            }
        } else {
            res.send({
                code: 6,
                msg: '该用户名不存在'
            })
        }
    })
}