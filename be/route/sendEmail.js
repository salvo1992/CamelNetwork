const express = require('express')
const email = express.Router()
const { createTransport } = require('nodemailer')

const transporter = createTransport({
    host: 'smtp.aruba.com',
    port: 587,
    auth: {
        user: '89765132@aruba.it',
        pass: 'pUpA3Zducbse55yrnP'
    }
});

email.post('/sendEmail', async (req, res) => {
    const { recipient, subject, text } = req.body

    const mailOptions = {
        from: 'noreply@example.com',
        to: recipient,
        subject,
        html: `<p><strong>STRONG</strong></p>`,
        text: 'ciao'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
           res.status(403).send({
                message: 'Oops qualcosa è andato storto'
            })
        } else {
            console.log('email inviata')
            res.send('Email sent successfully')
        }
    })
})

module.exports = email