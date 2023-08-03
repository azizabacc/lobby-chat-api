import { Router } from 'express';
import commentController from '../control/comment.controller';
const commentRouter = Router();
// specifies the endpoint and the method to call
commentRouter.get('/', commentController.getAll);
commentRouter.post('/', commentController.addComment);
// export the router
export default  commentRouter;