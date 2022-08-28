module.exports = (req, res) => {
    let code = req.session.ifLogin ? 1 : 0
    res.send({ code })
}