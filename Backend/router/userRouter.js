const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../Controllers/'); // Ensure consistent casing in the import path

// Ensure consistent casing in the import path
router.post('/signup',[
    body("name").isLength({min:3}).withMessage('Name must be at least 3 characters long!'),
    body("email").isEmail().withMessage('Invalid email!'),
    body("password").isLength({min:5}).withMessage('Password must be at least 5 characters long!'),
    body("country").isLength({min:3}).withMessage('Country must be at least 3 characters long!'),
],UserController.signup);
router.post('/login',[
    body("email").isEmail().withMessage("Invalid email!"),
    body("password").isLength({min:5}).withMessage("Password must be at least 5 characters long!"),
],UserController.login);
router.get('/profile',UserController.auth,UserController.profile);
router.get('/logout',UserController.auth,UserController.logout);

module.exports=router;