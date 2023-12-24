const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const userRouter = express.Router();

userRouter.post('/signup', authController.Signup);
userRouter.post('/login', authController.Login);

userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

userRouter
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
