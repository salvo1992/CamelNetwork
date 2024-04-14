const validateUserBody = (req, res, next) => {
    const errors = []

    const  {
        firstName,
        lastName,
        email,
        password,
        age,
    } = req.body;

    if (typeof firstName !== 'string') {
        errors.push('firstName must be a string')
    }

    if (typeof lastName !== 'string') {
        errors.push('lastName must be a string')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('please insert a valid email!')
    }

    if (typeof password !== 'string' || password.length < 8) {
        errors.push('Password must be a string with min 8 char')
    }

    if (typeof age !== 'number') {
        errors.push('Age must be a valid number, not string')
    }

    if (errors.length > 0) {
        res.status(400).send({ errors })
    } else {
        next()
    }
}

module.exports = validateUserBody;