import { Router } from "express";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';

const todosRouter = Router();
todosRouter.mergeParams = true;

// GET /todo
todosRouter.get("/", async (req, res) => {
    const db = req.app.get("db");
    const todos = await db.collection("todos").find({ project_id: req.params.projectId }).toArray();
    res.status(200).json(todos);
});

// GET /todo/:todoId
todosRouter.get("/:todoId", async (req, res) => {
    const db = req.app.get("db");
    const todo = await db.collection("todos").findOne({ _id: new ObjectId(req.params.todoId), project_id: req.params.projectId });
    if (!todo) {
        res.status(404).end();
        return;
    }
    res.status(200).json(todo);
});

// POST /todo
todosRouter.post("/", async (req, res) => {
    const db = req.app.get("db");
    const { name, description, completed } = req.body;
    const project_id = req.params.projectId;
    const newTodo = { name, description, completed, project_id };
    const result = await db.collection("todos").insertOne(newTodo);
    const insertedTodo = await db.collection("todos").findOne({ _id: result.insertedId });
    res.status(201).json(insertedTodo);
});

// // PUT /todo/:todoId
// todosRouter.put("/todo/:todoId", async (req, res) => {
//     try {
//         // check if exists (will error if not)
//         const directory = await fs.open(`storage/${req.params.todoId}.json`);
//         const todo = JSON.parse(await directory.readFile("utf-8"));

//         // sep into desc & completed
//         const { description, completed } = req.body;

//         const updated = { // create updated todo, keep old data if not filled
//             id: todo.id,
//             description: description || todo.description,
//             completed: completed != undefined ? completed : todo.completed,
//         };

//         await fs.writeFile(`storage/${req.params.todoId}.json`, JSON.stringify(updated)); // write to file
//         res.status(200).json(updated);
//     } catch (error) {
//         console.error(error);
//         res.status(404).end();
//     }
// });

// // DELETE /todo/:todoId
// todosRouter.delete("/todo/:todoId", async (req, res) => {
//     try {
//         // open file w id, save for return
//         const directory = await fs.open(`storage/${req.params.todoId}.json`);
//         const todo = JSON.parse(await directory.readFile("utf-8"));

//         await directory.close(); // if this isn't here, causes file to 'persist' even though it is actually deleted

//         await fs.unlink(`storage/${req.params.todoId}.json`, (err) => { // delete file
//             if (err) {
//                 console.log(err);
//                 res.status(404).end();
//             }
//         });

//         res.json(todo);
//     } catch (error) {
//         console.error(error);
//         res.status(404).end();
//     }
// });

export default todosRouter;
