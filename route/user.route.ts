import { Router } from 'express';
import userController from '../control/user.controller';
const userRouter = Router();
// specifies the endpoint and the method to call
userRouter.get('/', userController.getAll);
userRouter.get('/:userId', userController.getUserById);
userRouter.post('/register', userController.addUser);
// export the router
export default userRouter ;