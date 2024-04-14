const express = require('express')
const login = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/users')


login.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        })
        if (!user) {
            return res.status(404)
                .send({
                    statusCode: 404,
                    message: 'This user not exist!'
                })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordValid) {
            return res.status(401)
                .send({
                    statusCode: 401,
                    message: 'Email or password are not valid!'
                })
        }

        const token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }, process.env.SECRET_KEY, {
            expiresIn: '24h'
        })

        res.setHeader('authorization', token)
        res.status(200)
        .send({
            message: 'Login successful',
            statusCode: 200,
            token
        })

    } catch (e) {
        res.status(500)
            .send({
                message: 'Internal Server Error',
                statusCode: 500
            })
    }
})


module.exports = login;
