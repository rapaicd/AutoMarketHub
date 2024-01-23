const userRouter = require("express").Router();
import {create, findAll, findById, updateObject, deleteObject} from '../controllers/user.controller';

userRouter.route('/')
    .get(findAll)
    .post(create);
userRouter.get('/:id',findById)
userRouter.put('/:id',updateObject)
userRouter.delete('/:id',deleteObject)

export default userRouter;