const article = require('../model/article')
module.exports = function(req, res) {
    if (req.session.ifLogin) {
        let reqData = req.body
        let searchData = {}
        if (reqData.srh) {
            searchData = { title: new RegExp(reqData.srh) }
            article.find(searchData)
                .then(data => {
                    res.send(data)
                })
                .catch(e => {
                    res.send({ code: 2, msg: e })
                })
        }
    } else {
        res.send({
            code: 4,
            msg: '登陆超时，请重新登陆'
        })
    }

}