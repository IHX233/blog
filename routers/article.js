const article = require('../model/article')
module.exports = function(req, res) {
    article.findById(req.params.id).populate("author")
        .then(data => {
            if (data) {
                res.render("article", { data })
            } else {
                res.redirect('/404.html')
            }
        })
        .catch(e => {
            res.redirect('/404.html')
        })
}