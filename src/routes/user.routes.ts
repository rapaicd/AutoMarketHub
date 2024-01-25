const userRouter = require("express").Router();
import { findAll, findById, updateUser, deleteObject } from '../controllers/user.controller';
import verifySignUp from '../middleware/auth.middleware';

userRouter.use(verifySignUp.verifyToken)
userRouter.get('/', findAll)
userRouter.get('/:id', findById)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', verifySignUp.isAdmin, deleteObject)

export default userRouter;