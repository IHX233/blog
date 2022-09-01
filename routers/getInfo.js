const user = require('../model/user')
module.exports = function(req, res) {
    let reqData = req.body;
    user.findOne({ name: reqData.name }).then(data => {
        if (data) {
            res.send({
                code: 0,
                msg: '查找成功',
                pq: data.scret.pq
            })
        } else {
            res.send({
                code: 6,
                msg: '该用户名不存在'
            })
        }
    })
}