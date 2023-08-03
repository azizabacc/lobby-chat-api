import { Router } from 'express';
import userRouter  from './user.route';
import lobbyRouter from './lobby.route';
import messageRouter from './message.route';
import  commentRouter from  './comment.route';
const routes = Router();
//users
routes.use('/users', userRouter );
//lobby
routes.use('/lobby', lobbyRouter );
//message
routes.use('/message', messageRouter );
//comment
routes.use('/comment', commentRouter );
// export the route
export default routes;