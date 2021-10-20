module.exports = (req, res, next) => {
    if (req.session.isAdmin) {
        res.locals.admin = req.session.isAdmin
    }
    next()
}