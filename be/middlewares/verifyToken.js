const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401)
            .send({
                message: 'Your token is not valid',
                statusCode: 401
            })
    }


        const verified = jwt.verify(token, process.env.SECRET_KEY)
        console.log(verified)
        req.user = verified

        next()
    } catch (e) {
        res.status(403)
            .send({
                statusCode: 403,
                message: 'Your token is not valid or expired!'
            })
    }
}
