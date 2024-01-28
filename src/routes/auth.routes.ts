const authRouter = require("express").Router();
import verifySignUp from '../middleware/auth.middleware'
import { signup, signin, changePassword } from '../controllers/auth.controller';

authRouter.post('/signup', [
  verifySignUp.checkDuplicateEmail,
  verifySignUp.checkRolesExisted
], signup)
authRouter.post('/signin', signin)
authRouter.post('/change_password', verifySignUp.verifyToken, changePassword)

export default authRouter;