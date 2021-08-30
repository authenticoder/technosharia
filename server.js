const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contactform.html');
});

app.post('https://techno-sharia.herokuapp.com/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
            user: 'authenticoderio@gmail.com',
            pass: 'Dicaprioliamsy646913',
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'authenticoderio@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Success');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});