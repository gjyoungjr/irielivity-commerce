/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JEaAKLGRXDmGx9eApXbCazW70bmMtqgERfouDBKIovnoDLBhNPHUaTvSxw2ouZuDYguQI1iXSE3yjLYb562oypX005jg8gHat"
);
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

exports.api = functions.https.onRequest(app);
