import { Request, Response } from 'express';


import { Lobby } from '../model/lobby';
import lobby from '../db/lobby';

const getAll = (req: Request, res: Response) => {
  lobby.selectAll().then(products => { // .then for async call
    res.status(200).send({
        message: 'OK',
        result: products
    })
}).catch(err => {
    res.status(500).send({
        message: 'DATABASE ERROR',
        error: err.code
    })
})
}
function getCurrentDate(): string {
    const date = new Date();
  
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',     
      year: 'numeric',      
      month: 'long',        
      day: 'numeric',       
      hour: '2-digit',  
      minute: '2-digit',   
      second: '2-digit',    
      hour12: false         
    };
  
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
  }
  
// select lobby by id 
const getLobbyById = (req: Request, res: Response) => {
    const lobbyId: number = parseInt(req.params.lobbyId, 10);
  
    if (isNaN(lobbyId)) {
      return res.status(400).send({
        message: 'Invalid Lobby ID format',
      });
    }
  
    lobby.getLobbyById(lobbyId).then((lobby: Lobby | null) => {
      if (!lobby) {
        return res.status(404).send({
          message: 'Lobby not found',
        });
      }
  
      res.status(200).send({
        message: 'OK',
        result: lobby,
      });
    }).catch((err) => {
      res.status(500).send({
        message: 'DATABASE ERROR',
        error: err.code,
      });
    });
  };
  
  
  
  
const lobbyToInsert: Lobby = {
    userId: 1,
    name: 'first Lobby',
    creation_date: getCurrentDate()

};
const addLobby = (req: Request, res: Response) => {
  lobby.add(lobbyToInsert).then(products => { // .then for async call
    res.status(200).send({
        message: 'OK',
        result: products
    })
}).catch(err => {
    res.status(500).send({
        message: 'DATABASE ERROR',
        error: err.code
    })
})
}
export default { getAll,getLobbyById, addLobby }