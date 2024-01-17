const userRouter = require("express").Router();
import {create, findAll} from '../controllers/users.controller';

userRouter.route('/')
    .get(findAll)
    .post(create);

export default userRouter;