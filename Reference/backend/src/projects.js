import { Router } from "express";
import { ObjectId } from "mongodb";
import todosRouter from "./todos.js";

const projectsRouter = Router();

// Use todosRouter for nested routes
projectsRouter.use("/:projectId/todo", todosRouter);

// GET /project
projectsRouter.get("/", async (req, res) => {
    const db = req.app.get("db");
    const todos = await db.collection("projects").find().toArray();

    return res.json(todos);
});

// GET /project/:projectId
projectsRouter.get("/:projectId", async (req, res) => {
    const db = req.app.get("db");
    const todo = await db.collection("projects").findOne({ _id: new ObjectId(req.params.projectId) });

    return res.json(todo);
});

// POST /project
projectsRouter.post("/", async (req, res) => {
    const db = req.app.get("db");

    try {
        const result = await db.collection("projects").insertOne(req.body);
        console.info(result);
        res.status(201).json(result.insertedId);
    } catch (e) {
        console.error(e);
        return res.status(500).end();
    }
});

export default projectsRouter;
