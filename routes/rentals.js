const express = require('express');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const router = express.Router();


//api/rentals
router.get("/",async (req , res) => {
    res.send(await Rental.find());
});

router.get("/:id",async (req , res)=>{
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send("The rental with given id is not found");
    res.send(rental);
});

router.post("/",async (req , res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("Invalid Customer...");

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Invalid Movie");

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id : movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});




module.exports =router;