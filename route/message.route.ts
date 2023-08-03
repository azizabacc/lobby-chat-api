import { Router } from 'express';
import userController from '../control/message.controller';
const messageRouter = Router();
// specifies the endpoint and the method to call
messageRouter.get('/', userController.getAll);
messageRouter.post('/', userController.addMessage);
// export the router
export default messageRouter;