const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());
var genres =[
    { id : 1 , value : "Action"},
    { id : 2 , value : "Adventure"},
    { id : 3 , value : "Comedy"},
    { id : 4 , value : "Drama"},
    { id : 5 , value : "Horro"},
    { id : 6 , value : "Romance"},
]

app.get("/",(req, res) => res.send("Welcome To Movie Genres"));

app.get("/api/genres",(req , res) => {
    res.send(genres);
});

app.get("/api/genres/:id",(req , res)=>{
   // const genre = genres.find( (c) =>  c.id === parseInt(req.params.id));
   const genre = genres.find( c => c.id === parseInt(req.params.id));
   if(!genre) return res.status(404).send("The Course With given id was not found ");
    
    res.send(genre);
});

app.post("/api/genres",(req ,res) => {
    const schema = {
        value : Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body , schema);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
        
    }

    const genre = {
        id : genres.length+1,
        value : req.body.value,
    }
    genres.push(genre);
    res.send(genre);

});

app.put("/api/genres/:id",(req , res) => {
    const genre = genres.find( c => c.id === parseInt(req.params.id));
   if(!genre) return res.status(404).send("The Course With given id was not found ");

    const schema = {
        value : Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body , schema);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
        
    }

    genre.value=req.body.value;
    res.send(genre);
});


app.delete("/api/genres/:id",(req, res) => {
    const genre = genres.find( c => c.id === parseInt(req.params.id));
   if(!genre) return res.status(404).send("The Course With given id was not found ");

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);
});


app.listen(3000,() => console.log("Listening on Port 3000 ......"));