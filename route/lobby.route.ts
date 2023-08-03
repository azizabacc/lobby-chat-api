import { Router } from 'express';
import lobbyController from '../control/lobby.controller';
const lobbyRouter = Router();
// specifies the endpoint and the method to call
lobbyRouter.get('/', lobbyController.getAll);
lobbyRouter.get('/:lobbyId', lobbyController.getLobbyById);
lobbyRouter.post('/', lobbyController.addLobby);
// export the router
export default lobbyRouter;