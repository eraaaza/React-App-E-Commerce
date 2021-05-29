const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

// don't get too excited, not a real API key
const STRIPE_API_KEY = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
const stripe = Stripe(STRIPE_API_KEY);

const Listing = require('../models/listing')

/* MAKE a Payment. */
router.post('/', function (req, res, next) {
    // Array of Listing IDs
    const cart = req.body.cart
    let total = 0
    let notFound = false

    if (!cart || Object.keys(cart).length <= 0) {
        return res.status(400).json({
            errors: {
                message: "Cart is empty."
            }
        })
    }

    cart.forEach((id) => {
        Listing.findById(id)
            .then((foundListing) => {
                if (!foundListing) {
                    notFound = true
                    console.log(`Listing not found... ${id}`)
                } else {
                    total = total + Math.abs(foundListing.price)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    });

    // total = 100
    if (notFound) {
        return res.status(404).json({
            errors: {
                message: "One or more items could not be found."
            }
        })
    } else {
        if (total === 0) {
            // Not done.
            return res.status(200).json({
                message: 'Im still working on this feature'
            })
        } else {
            stripe.charges.create({
                amount: total,
                currency: "usd",
                source: "tok_visa",
                metadata: { 'order_id': '6735' }
            })
                .then((data) => {
                    cart.forEach((id) => {
                        Listing.findById(id)
                            .then((foundListing) => {
                                foundListing.purchased = true
                            })
                            .catch((e) => {
                                console.log(e)
                            })
                    });

                    return res.status(200).json(data)
                })
                .catch((e) => {
                    console.log(e.message)
                    return res.status(e.statusCode || 500).json(e.message)
                })
        }
    }
});

module.exports = router;
