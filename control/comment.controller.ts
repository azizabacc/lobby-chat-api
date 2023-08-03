import { Request, Response } from 'express';


import { Comment} from '../model/comment';
import comment from '../db/comment';

const getAll = (req: Request, res: Response) => {
  comment.selectAll().then(products => { // .then for async call
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
  

  
  
  
  
const commentToInsert: Comment = {
    userId: 1,
    lobbyId: 1,
    messageId:1,
    creation_date: getCurrentDate()

};
const addComment = (req: Request, res: Response) => {
  comment.add(commentToInsert).then(products => { // .then for async call
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
export default { getAll, addComment }