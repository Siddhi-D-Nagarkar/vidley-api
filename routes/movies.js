const express = require('express');
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const router = express.Router();
const mongoose = require('mongoose');


//api/movies

router.get("/",async (req , res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get("/:id",async (req , res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send("The movie with given id not there ");
    res.send(movie);
});

router.post("/",async (req , res) => {
    console.log("chu");
    
    const {error}  = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    console.log("hello");
    
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid Genre ");
        console.log("Hi");
        
    let movie = new Movie({
        title : req.body.title,
        genre : {
            _id : genre._id,
            name : genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.send(movie);
});

router.put("/:id", async (req ,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    let movie =await Movie.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        genre : {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    },{new : true});
    try{
    if(!movie) return res.status(404).send("THe movie with given Id is not found");
    res.send(movie);
    }catch(err){
        console.log(err);
        
    }
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  });   



module.exports = router;

