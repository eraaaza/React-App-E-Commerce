const express = require('express');
const randomstring = require("randomstring");
const router = express.Router();
const www = require('../bin/www')
const Listing = require('../models/listing')
const Inquiry = require('../models/inquiry')

/* CREATE a listing. */
router.post('/', function (req, res, next) {
    Listing.create({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        price: req.body.price,
        password: `${randomstring.generate(16)}`
    }, function (e, newListing) {
        if (e) {
            return res.status(500).json({
                errors: e.errors
            })
        }

        www.listingCreatedMessage({
            title: req.body.title,
            createdAt: newListing.createdAt
        })

        return res.status(200).json(newListing)
    });
});

/* VIEW listings. */
router.get('/', function (req, res, next) {
    Listing.find({}, function (e, allListings) {
        if (e) {
            return res.status(500).json({
                errors: e.errors
            })
        }

        return res.status(200).json(allListings)
    });
});

/* GET a listing. */
router.get('/:id', function (req, res, next) {
    Listing.findById(req.params.id).populate("inquiries").exec(function (e, foundListing) {
        if (e) {
            return res.status(500).json({
                errors: e.errors
            })
        }

        if (!foundListing) {
            return res.status(404).json({
                errors: "Listing does not exist"
            })
        }

        return res.status(200).json(foundListing)
    });
});

/* DELETE a listing. */
router.delete('/:id', function (req, res, next) {
    Listing.findOneAndDelete({ _id: req.params.id, password: req.body.password }).exec(function (e) {
        if (e) {
            return res.status(500).json({
                errors: e.errors
            })
        }

        return res.status(200).json({
            message: "deleted"
        })
    });
});

/* Password Test */
router.post('/:id/password', function (req, res, next) {
    Listing.findById(req.params.id).select('+password').exec(function (e, foundListing) {
        if (e) {
            return res.status(500).json({
                errors: e.errors
            })
        }

        if (!foundListing) {
            return res.status(404).json({
                errors: "Listing does not exist"
            })
        }

        if (req.body.password === foundListing.password) {
            return res.status(200).json(foundListing)
        } else {
            return res.status(401).json({
                message: 'Wrong password'
            })
        }
    });
});

/* MAKE an Inquiry. */
router.post('/:id/inquiries', function (req, res, next) {
    Listing.findById(req.params.id).populate("inquiries").exec(function (e, foundListing) {
        if (e) {
            return res.status(500).json({
                errors: e.errors
            })
        }
        if (!foundListing) {
            return res.status(404).json({
                errors: "Listing does not exist"
            })
        } else {
            Inquiry.create({
                text: req.body.text
            }, function (e, newInquiry) {
                if (e) {
                    return res.status(500).json({
                        errors: e.errors
                    })
                }

                foundListing.inquiries.push(newInquiry);
                foundListing.save();

                return res.status(200).json(newInquiry)
            });
        }
    });
});

/* GET Inquiries. */
router.get('/:id/inquiries', function (req, res, next) {
    Listing.findById(req.params.id).populate("inquiries").exec(function (e, foundListing) {
        if (e) {
            return res.status(500).json({
                errors: e.errors
            })
        }
        if (!foundListing) {
            return res.status(404).json({
                errors: "Listing does not exist"
            })
        } else {
            Inquiry.find({}, function (e, allInquiries) {
                if (e) {
                    return res.status(500).json({
                        errors: e.errors
                    })
                }

                return res.status(200).json(allInquiries)
            });
        }
    });
});

module.exports = router;
