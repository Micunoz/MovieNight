import { Router } from "express";
import { ObjectId } from "mongodb";

const moviesRouter = Router();

//GET /movie 
moviesRouter.get("/", async (req, res) => {
    const db = req.app.get("db");
    const movies = await db.collection("movies").find().toArray();

    return res.json(movies);
});

//GET /movie/:movieTitle
moviesRouter.get("/:movieId", async (req, res) => {
    const db = req.app.get("db");
    const movie = await db.collection("movies").findOne({ _id: new ObjectId(req.params.movieId) })

    return res.json(movie);
});

//GET /movie/:movieTitle/reviews 
moviesRouter.get("/:movieTitle/reviews", async (req, res) => {

});

//POST /movie 
moviesRouter.post("/", async (req, res) => {
    const db = req.app.get("db");
    var response;
    if (req.body.movieYear) {
        response = await fetch(`http://www.omdbapi.com/?t=${req.body.movieTitle}&y=${req.body.movieYear}&apikey=352ecf23`);
    } else {
        response = await fetch(`http://www.omdbapi.com/?t=${req.body.movieTitle}&apikey=352ecf23`);
    }
    const data = await response.json();

    const dupe = await db.collection("movies").findOne({ Title: data.Title, Year: data.Year });

    if (data.Response == 'False' || dupe) {
        res.status(404).end();
    } else {
        const result = await db.collection("movies").insertOne(data);
        console.info(result);
        res.status(201).json(result.insertedId);
    }
});

export default moviesRouter;