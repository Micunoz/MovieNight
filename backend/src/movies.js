import { Router } from "express";
import { ObjectId } from "mongodb";

const moviesRouter = Router();

//GET /movie 
moviesRouter.get("/", async (req, res) => {
    const db = req.app.get("db");
    const movies = await db.collection("movies").find().toArray();

    return res.json(movies);
});

//GET /movie/:movieId
moviesRouter.get("/:movieId", async (req, res) => {
    const db = req.app.get("db");
    const movie = await db.collection("movies").findOne({ _id: new ObjectId(req.params.movieId) })

    return res.json(movie);
});

// POST /movie/:movieId/reviews
moviesRouter.post("/:movieId/reviews", async (req, res) => {
    const db = req.app.get("db");

    const review = {
        movieId: req.params.movieId,
        userId: req.body.userId,
        userName: req.body.userName,
        review: req.body.review,
    };

    const result = await db.collection("reviews").insertOne(review);

    res.status(201).json(result.insertedId);
})

//GET /movie/:movieTitle/reviews 
moviesRouter.get("/:movieTitle/reviews", async (req, res) => {
    const db = req.app.get("db");
    const movies = await db.collection("movies").find().toArray();

    return res.json(movies);
});

//PUT /movie/:movieId/favorites
moviesRouter.put("/:movieId/favorites", async (req, res) => {
    const db = req.app.get("db");

    const movieId = req.params.movieId;
    const user = await db.collection("users").findOne({ _id: new ObjectId(req.body.userId) });

    // res.status(201).json(user);

    user.favoriteMovies.push(movieId);

    await db.collection("users").updateOne({ _id: new ObjectId(req.body.userId)}, { $set: { favoriteMovies: user.favoriteMovies } });
    return res.status(200).end();
});

//POST /movie 
moviesRouter.post("/", async (req, res) => {
    const db = req.app.get("db");
    var response;
    if (req.body.Year) {
        response = await fetch(`http://www.omdbapi.com/?t=${req.body.Title}&y=${req.body.Year}&apikey=352ecf23`);
    } else {
        response = await fetch(`http://www.omdbapi.com/?t=${req.body.Title}&apikey=352ecf23`);
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