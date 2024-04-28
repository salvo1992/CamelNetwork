const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const UsersModel = require('../models/users');
const validateUserBody = require('../middlewares/validateUserBody')
const verified = require('../middlewares/verifyToken')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


router.get('/getUsers', async (request, response) => {
    const { page = 1, pageSize = 5 } = request.query;
    try {
        const users = await UsersModel.find()
            .limit(pageSize)
            .skip((page - 1) * pageSize)

        const totalUsers = await UsersModel.countDocuments();

        response
            .status(200)
            .send({
                currentPage: +page,
                totalPages: Math.ceil(totalUsers / pageSize),
                users,
            })
    } catch (e) {
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
})

router.get('/getUsers/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const user = await UsersModel.findById(id);

        if (!user) {
            return response
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'The requested user does not exist!'
                })
        }

        response
            .status(200)
            .send(user)
    } catch (e) {
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal Server Error'
            })
    }
})

router.get('/getUsers/byName/:query', async (request, response) => {
    const {query} = request.params
    try {
        const user = await UsersModel.find({
            firstName: {
                $regex: '.*' + query + '.*',
                $options: 'i',
            }
        })
        if (!user) {
            return response.status(404).send({
                statusCode: 404,
                message: 'User not found with the given query'
            })
        }
        response.status(200).send(user);
    } catch (e) {
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal Server Error'
            })
    }
})

router.get('/getUsers/byAge/:age(\\d+)', async (request, response) => {
    const {age} = request.params

    try {
        const userByAge = await UsersModel.find({
            age: {
                $eq: age,
            }
        })
        response.status(200).send(userByAge)
    } catch (e) {
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal Server Error'
            })
    }
})

router.post('/createUser', validateUserBody, async (request, response) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        const newUser = new UsersModel({
            _id: new mongoose.Types.ObjectId(), // Genera un nuovo ID automaticamente
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: hashedPassword,
            age: Number(request.body.age)
        });
        
        const userToSave = await newUser.save();

        // Genera il token
        const token = jwt.sign(
            { 
                userId: userToSave._id, 
                email: userToSave.email 
            }, 
            process.env.SECRET_KEY,
            { expiresIn: '1h' } // Opzionale: specifica la scadenza del token
        );

        console.log("Utente salvato con successo:", userToSave);

        // Restituisci il token come parte della risposta
        response.status(201).send({
            statusCode: 201,
            token: token, // Invia il token al client
            payload: userToSave
        });
    } catch (error) {
        console.error("Errore durante il salvataggio dell'utente:", error);
        response.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});

router.patch('/updateUser/:id', async (request, response) => {
    const { id } = request.params

    const user = await UsersModel.findById(id);
    if (!user) {
        return response
            .status(404)
            .send({
                statusCode: 404,
                message: 'The requested user not exist!'
            })
    }

    try {

        const updatedData = request.body;
        const options = { new: true };

        const result = await UsersModel.findByIdAndUpdate(id, updatedData, options);

        response
            .status(200)
            .send(result)
    } catch (e) {
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
})

router.delete('/deleteUser/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const user = await UsersModel.findByIdAndDelete(id);
        if (!user) {
            return response
                .status(404)
                .send({
                    statusCode: 404,
                    message: 'The requested user not exist!'
                })
        }

        response
            .status(200)
            .send(`User with id ${id} successfully removed`)
    } catch (e) {
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
})

module.exports = router;