import { Router } from "express";
import { ObjectId } from "mongodb";

const usersRouter = Router();

//GET /user
usersRouter.get("/", async (req, res) => {

});

//GET /user/:userId/favorite
usersRouter.get("/:userId/favorite", async (req, res) => {

});

//GET /user/:userId/reviews
usersRouter.get("/:userId/reviews", async (req, res) => {

});

//POST /user
usersRouter.post("/", async (req, res) => {

});