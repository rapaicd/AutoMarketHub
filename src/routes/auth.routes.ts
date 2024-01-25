const authRouter = require("express").Router();
import verifySignUp from '../middleware/auth.middleware'
import { signup, signin } from '../controllers/auth.controller';

authRouter.post('/signup',[
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkRolesExisted
  ], signup)
  authRouter.post('/signin', signin)
//   authRouter.post('/change_password', changePassword)

export default authRouter;