const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers['authorization'];  // Assicurati che il front-end invii l'header auth in questo modo
        if (!authHeader) {
            return res.status(401).send({
                message: 'Accesso negato. Token non fornito.',
                statusCode: 401
            });
        }

        const token = authHeader.split(' ')[1];  // Estrai il token da "Bearer <token>"
        if (!token) {
            return res.status(401).send({
                message: 'Accesso negato. Token non fornito.',
                statusCode: 401
            });
        }

        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();  // Procedi al middleware successivo o al gestore della richiesta
    } catch (e) {
        res.status(403).send({
            statusCode: 403,
            message: 'Il tuo token non è valido o è scaduto!'
        });
    }
};
