/* eslint-disable no-eval */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JEaAKLGRXDmGx9eApXbCazW70bmMtqgERfouDBKIovnoDLBhNPHUaTvSxw2ouZuDYguQI1iXSE3yjLYb562oypX005jg8gHat"
);
const nodemailer = require("nodemailer");
const app = express();

app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

// routes
app.get("*", (req, res) => {
  res.status(404).send("404, Not Found.");
});

app.post("/payments/create", async (req, res) => {
  try {
    // destrucute date coming from request
    const { amount, shipping } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      shipping,
      amount,
      currency: "usd",
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});

/**
 * Here we're using Gmail to send
 */
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jdirtbag20@gmail.com",
    pass: "tbpwrkolkcqqkwzm",
  },
});

app.post("/sendMail", (req, res) => {
  console.log(process.env.REACT_APP_EMAIL_PW);
  // getting dest email by query string
  const { dest } = req.body;

  const mailOptions = {
    from: "Your Account Name <jdirtbag20@gmail.com", // Something like: Jane Doe <janedoe@gmail.com>
    to: dest,
    subject: "This a test email", // email subject
    html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
            <br />
            <img src="https://images.unsplash.com/photo-1628456610536-27762799df31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" />
        `, // email content in HTML
  };

  // returning result
  return transporter.sendMail(mailOptions, (erro, info) => {
    if (erro) {
      return res.send(erro.toString());
    }
    return res.send("Sended");
  });
});

exports.api = functions.https.onRequest(app);
