/* eslint-disable no-loop-func */

const mongoose = require('mongoose');
const faker = require('faker/locale/en');

const Listing = require('./models/listing')
const Inquiry = require('./models/inquiry')

// Do seeding
// For loop 1 - 100 make things with random names
const count = 100

mongoose.connect('mongodb://localhost:27017/team6project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((e) => {
    console.log(e)
})

mongoose.connection.on('connected', () => {
    console.log('Successfully connected to the Database.')

    for (let x = 0; x < count; x++) {
        Listing.create({
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            type: faker.commerce.department(),
            price: faker.commerce.price(),
            password: "1234"
        }, function (e, listing) {
            if (Math.random() >= 0.5) {
                Inquiry.create({
                    text: faker.lorem.sentences()
                }, function (e, inquiry) {
                    listing.inquiries.push(inquiry);
                    listing.save();
                })
            }
        })
    }

    console.log(`Successfully added ${count} listings to the database.`)
})
