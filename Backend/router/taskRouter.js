const express=require("express");
const router=express.Router();
const TaskController=require("../Controllers/taskController");
const {body}=require("express-validator");
const userController=require("../Controllers/userController");

router.post("/create",[
    body("title").isLength({min:1}).withMessage("Title must be at least 1 characters long!"),
    body("description").isLength({min:20}).withMessage("Description must be at least 20 characters long!"),
    body("projectId").notEmpty().withMessage("Project ID is required!")
],userController.auth,TaskController.createTask);
router.get('/getAllTask',userController.auth,TaskController.getAllTask);
router.get('/getTask/:taskId',userController.auth,TaskController.getTask);
router.get('/getAlltaskByProject/:projectId', userController.auth, TaskController.getTaskByProject);
router.delete('/deleteTask/:taskId',userController.auth,TaskController.deleteTask);
router.put('/updateTask/:taskId',[
    body("title").isLength({min:1}).withMessage("Title must be at least 1 characters long!"),
    body("description").isLength({min:20}).withMessage("Description must be at least 20 characters long!"),
    body("projectId").notEmpty().withMessage("Project ID is required!"),
    body("status").isIn(["pending","in-progress","completed"]).withMessage("Status must be either 'pending', 'in-progress', or 'completed'!")
], userController.auth, TaskController.UpdateTask);
router.put('/updateTaskStatus/:taskId',[
    body("status").isIn(["pending","in-progress","completed"]).withMessage("Status must be either 'pending', 'in-progress', or 'completed'!")
],userController.auth,TaskController.updateTaskStatus);
module.exports=router;