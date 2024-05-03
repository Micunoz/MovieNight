import { Router } from "express";
import { ObjectId } from "mongodb";

const usersRouter = Router();

//GET /user
usersRouter.get("/", async (req, res) => {
    const db = req.app.get("db");
    const users = await db.collection("users").find().toArray();

    return res.json(users);
});

//GET /user/:userId/favorite
usersRouter.get("/:userId/favorite", async (req, res) => {

});

//GET /user/:userId/reviews
usersRouter.get("/:userId/reviews", async (req, res) => {

});

//POST /user
usersRouter.post("/", async (req, res) => {
    const db = req.app.get("db");

    // body should have first name, last name, maybe fav movie, etc.
    const result = await db.collection("users").insertOne(req.body);
    console.info(result);
    res.status(201).json(result.insertedId);
});

export default usersRouter;