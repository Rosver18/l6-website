const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// Email Route
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Create transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rosver5439@gmail.com',     
      pass: 'tzdr gmbe muwa ezrj'         
    }
  });

  const mailOptions = {
    from: email,
    to: 'rosver5439@gmail.com', 
    subject: `Message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.redirect('/thankyou.html'); 
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).send('An error occurred while sending the email.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});