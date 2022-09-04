const user = require('../model/user')
const crypto = require("crypto");
module.exports = function(req, res) {
    let reqData = req.body;
    if (req.session.ifLogin) {
        user.findById(req.session._id).then(data => {
            if (data) {
                let reqPwd = crypto.createHash('sha256').update(reqData.password).digest("hex")
                if (data.password = reqPwd) {
                    let newPwd = crypto.createHash('sha256').update(reqData.newPwd).digest("hex")
                    user.updateOne({ _id: data._id }, { password: newPwd }).then(() => {
                        req.session.destroy()
                        res.send({
                            code: 0,
                            msg: '更新成功，请重新登陆'
                        })
                    })
                } else {
                    res.send({
                        code: 7,
                        msg: '密码错误，请重新输入'
                    })
                }
            } else {
                res.send({
                    code: 6,
                    msg: '该用户名不存在'
                })
            }
        })
    } else {
        res.send({
            code: 4,
            msg: '登陆超时，请稍后再试'
        })
    }

}