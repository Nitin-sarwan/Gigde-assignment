const express=require('express');
const router=express.Router();
const ProjectController=require('../Controllers/ProjectController');
const {body}=require('express-validator');
const userController=require('../Controllers/UserController');

router.post('/create',[
    body('title').isString().isLength({min:1}).withMessage("Title must be at least 1 characters long!"),
],userController.auth,ProjectController.createProject);
router.get('/getAllProject',userController.auth,ProjectController.getAllProject);
router.get('/getProject/:projectId',userController.auth,ProjectController.getProject);
router.delete('/deleteProject/:projectId',userController.auth,ProjectController.deleteProject);
module.exports=router;