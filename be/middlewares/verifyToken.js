const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
    const token = req.headers['authorization']
    console.log("Token ricevuto:", token);
    if (!token) {
        console.log("Nessun token fornito");
        return res.status(401)
            .send({
                message: 'Your token is not valid',
                statusCode: 401
            })
    }


        const verified = jwt.verify(token, process.env.SECRET_KEY)
        console.log("Token verificato:", verified);
        req.user = verified

        next()
    } catch (e) {
        console.error("Errore durante la verifica del token:", e);
        res.status(403)
            .send({
                statusCode: 403,
                message: 'Your token is not valid or expired!'
            })
    }
}

