const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Accesso negato. Token non fornito." });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Accesso negato. Token non fornito." });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Utente decodificato:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).send({
            statusCode: 403,
            message: 'Il tuo token non è valido o è scaduto!'
        });
    }
};