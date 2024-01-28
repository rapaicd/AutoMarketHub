const userRouter = require("express").Router();
import { findAllUsers, findUserById, updateUser, deleteUser } from '../controllers/user.controller';
import verifySignUp from '../middleware/auth.middleware';

userRouter.use(verifySignUp.verifyToken)
userRouter.get('/', findAllUsers)
userRouter.get('/:id', findUserById)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', verifySignUp.isAdmin, deleteUser)

export default userRouter;