const user = require('../model/user')
module.exports = (req, res) => {
    if (req.session.ifLogin) {
        user.findById(req.session._id)
            .then(data => {
                res.render('usercenter', {
                    data: data
                })
            })

    } else {
        res.redirect("/")
    }
}