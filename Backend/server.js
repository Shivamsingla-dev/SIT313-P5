const cors = require("cors");
const express = require("express");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = 3000;

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Allow Express to read JSON data
app.use(express.json());

// Serve the frontend files
app.use(express.static(__dirname));

// Handle newsletter subscriptions
app.post("/subscribe", async (req, res) => {

    const email = req.body.email;

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
            message: "Please enter a valid email address."
        });
    }
    const message = {
        to: email,
        from: "shivamsingla972@gmail.com",
        subject: "Welcome to DEV@Deakin",
        text: "Thank you for subscribing to the DEV@Deakin Daily Insider!",
        html: `
            <h2>Welcome to DEV@Deakin!</h2>
            <p>Thank you for subscribing to our Daily Insider.</p>
            <p>You will receive our latest updates and news.</p>
        `
    };


    try {
        const [sendGridResponse] = await sgMail.send(message);

        console.log("SendGrid API Status:", sendGridResponse.statusCode);
        console.log("Welcome email accepted for:", email);

        return res.status(200).json({
            message: "Thank you for subscribing! A welcome email has been requested."
        });

    } catch (error) {
        console.error(
            "Email error:",
            error.response?.body || error.message
        );

        return res.status(500).json({
            message: "The email could not be sent. Please try again."
        });
    }


});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});