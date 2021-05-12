const express = require('express');
const router = express.Router();

const Listing = require('../models/listing')

/* CREATE a listing. */
router.post('/', function (req, res, next) {
    Listing.create({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        price: req.body.price
    }, function (e, newListing) {
        if (e) {
            return res.status(500).json({
                errors: e.errors
            })
        }

        return res.status(201).json(newListing)
    });
});

/* GET a listing. */
router.get('/:id', function (req, res, next) {
    // TODO: Business logic here
    const listing1 = {
        description: "Gym equipment",
        type: "Equipment",
        price: 125,
        title: "item 1",
        id: req.params.id,
        inquiries: [],
    };

    res.send(listing1);
});

/* VIEW listings. */
router.get('/', function (req, res, next) {

    // TODO: Business logic here
    const listing1 = {
        description: "Gym equipment",
        type: "Equipment",
        price: 125,
        title: "item 1",
        id: '234567',
        inquiries: [],
    };

    const listing2 = {
        description: "Surfing equipment",
        type: "Equipment",
        price: 90,
        title: "item 2",
        id: '435678',
        inquiries: [],
    };

    res.send([listing1, listing2]);
});

/* DELETE a listing. */
router.delete('/:id', (req, res, next) => {
    // TODO: Business logic here
    res.send({ id: req.query.id, message: 'Deleted listing successfully' });
});

/* MAKE an Inquiry. */
router.post('/:id/inquiries', (req, res, next) => {
    const id = Math.random().toString(26).substr(2, 8);
    // TODO: Business logic here

    res.send({ listingId: req.params.id, id: id, message: 'Successfully created an inquiry' });
});

/* GET Inquiries. */
router.get('/:id/inquiries', (req, res, next) => {
    // TODO: add business logic here
    const inquiry1 = {
        id: '1234',
        message: "Interested",
    }

    const inquiry2 = {
        id: '5678',
        message: "When can I see the item",
    }

    res.send([inquiry1, inquiry2]);
});

module.exports = router;
