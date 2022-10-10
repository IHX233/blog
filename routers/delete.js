const article = require('../model/article')
module.exports = function(req, res) {
    if (req.session.ifLogin) {
        let id = req.body._id
        article.deleteOne({ id })
            .then(() => {
                res.send({ msg: '删除成功', code: 0 })
            })
            .catch(() => {
                res.send({ msg: e, code: 2 })
            })
    } else {
        res.send({
            code: 4,
            msg: '登陆超时，请重新登陆'
        })
    }

}