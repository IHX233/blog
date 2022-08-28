module.exports = (req, res) => {
    if (req.session.ifLogin) {
        res.render('usercenter')
    } else {
        res.redirect("/")
    }
}