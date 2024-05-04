import { Router } from "express";
import { ObjectId } from "mongodb";

const usersRouter = Router();

//GET /user
usersRouter.get("/", async (req, res) => {
    const db = req.app.get("db");
    const users = await db.collection("users").find().toArray();

    return res.json(users);
});

//GET /user/:userId
usersRouter.get("/:userId", async (req, res) => {
    const db = req.app.get("db");
    const user = await db.collection("users").findOne({ _id: new ObjectId(req.params.userId) });
    const reviews = await db.collection("reviews").find({ userId: req.params.userId }).toArray();

    return res.json({favorites: user.favoriteMovies, reviews: reviews});
});

//POST /user
usersRouter.post("/", async (req, res) => {
    const db = req.app.get("db");

    // body should have first name, last name, etc.
    const fullUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }

    const result = await db.collection("users").insertOne(req.body);
    await db.collection("users").updateOne({ _id: result.insertedId}, { $set: { favoriteMovies: [] } });
    console.info(result);
    res.status(201).json(result.insertedId);
});

export default usersRouter;