const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// const Users = require('../models/user.model');
// const userController = require('../controllers/user.controller');
// const authController = require('../controllers/auth.controller');

// // user authentification
// router.post("/register", authController.signUp);

// // user BD
// router.get("/", userController.getAllUsers);
// router.get("/:id", userController.userInfo);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

router.post('/signup', userController.signup);
router.post('/login', userController.login);



module.exports = router;
