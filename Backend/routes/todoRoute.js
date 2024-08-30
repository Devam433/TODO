import express from "express"
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controller/todoController.js";

const router = express.Router();

// router.route("/").get((req,res)=>{ //for ease to code, we can put the logic part in another file
//   res.json({meaage:"Get All Todos"});
// })
router.route("/").get(getAllTodos)

router.route("/").post(createTodo)

router.route("/:id").put(updateTodo)

router.route("/:id").delete(deleteTodo)

export default router