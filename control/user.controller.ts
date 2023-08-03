import { Request, Response } from 'express';
import users from '../db/users'
import { User } from '../model/user';
//get all users
const getAll = (req: Request, res: Response) => {
  users.selectAll().then(products => { // .then for async call
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
const userToInsert: User = {
  firstname: 'Aziza',
  lastname :' Bacc',
  username : 'azizabacc',
  email: 'azizabacc@example.com',
  password: 'azizabacc',
};
// select user by id 
const getUserById = (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).send({
      message: 'Invalid user ID format',
    });
  }

  users.getUserById(userId).then((user: User | null) => {
    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    res.status(200).send({
      message: 'OK',
      result: user,
    });
  }).catch((err) => {
    res.status(500).send({
      message: 'DATABASE ERROR',
      error: err.code,
    });
  });
};

//add user
const addUser = (req: Request, res: Response) => {
  users.add(userToInsert).then(products => { // .then for async call
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
export default { getAll,getUserById, addUser }