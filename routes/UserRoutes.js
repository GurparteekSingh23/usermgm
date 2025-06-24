const express=require('express');

const {getallUsers,getUserById,addUser,deleteUser,updateUser,loginUser}=require("../controllers/UserController"); // importing the addUser function from UserController

const router=express.Router();
const storage= require('node-persist');
// Get All users 

router.get('/',getallUsers)

// Get user by ID
router.get('/:id',getUserById)

// Add a new user
router.post('/',addUser)

// Delete user by ID
router.delete('/:id',deleteUser)

// Update user by ID
router.put('/:id',updateUser)

router.post('/login',loginUser)
module.exports=router; // export the router to use it in app.js