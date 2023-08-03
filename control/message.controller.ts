import { Request, Response } from 'express';


import { Message} from '../model/message';
import message from '../db/message';

const getAll = (req: Request, res: Response) => {
  message.selectAll().then(products => { // .then for async call
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
  

  
  
  
  
const messageToInsert: Message = {
    lobbyId: 1,
    userId: 1,
    creation_date: getCurrentDate()

};
const addMessage = (req: Request, res: Response) => {
  message.add(messageToInsert).then(products => { // .then for async call
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
export default { getAll, addMessage }