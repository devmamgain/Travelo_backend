const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router()

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'devmamgain123@gmail.com', // Your Gmail address
        pass: 'ktmw fbqm xgrb yzpb' // Your Gmail password or app-specific password
    }
});

// Endpoint to send thank you email
router.post('/send-email', (req, res) => {
    const { amount, email, hotelid , hotelname, paymentid, orderid, username } = req.body;

    const mailOptions = {
        from: 'devmamgain123@gmail.com',
        to: email,
        subject: 'Thank You for Booking',
        html: `
            <p>Hello ${username},</p>
            <p>Thank you for booking the hotel.</p>
            <p>Your paymentid : ${paymentid}</p>
            <p>Your Hotel Name : ${hotelname}</p>
            <p>Your Hotel Id : ${hotelid}</p>
            <p>Your Order Id : ${orderid}</p>
            <p>Your Amount : ${amount}</p>

            <p>Best regards,</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

module.exports=router
