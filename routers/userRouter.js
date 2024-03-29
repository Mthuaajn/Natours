const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const userRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/img/users' });
userRouter.post('/signup', authController.Signup);
userRouter.post('/login', authController.Login);
userRouter.get('/logout', authController.logout);

//all route is protect
userRouter.use(authController.protect);

userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);
userRouter.patch(
  '/updateMe',
  userController.UploadFile,
  userController.resizeUserPhoto,
  userController.updateMe
);
userRouter.delete('/deleteMe', userController.deleteMe);

userRouter.patch(
  '/updateMyPassword',

  authController.updatePassword
);
userRouter.route('/me').get(userController.getMe, userController.getUser);

userRouter.use(authController.restrictTo('admin'));

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
