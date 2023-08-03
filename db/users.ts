import { User } from "../model/user";
import {  QueryResult } from 'pg';
import { connection } from "../config/db";
import bcrypt from 'bcrypt'
const saltRounds = 10;
const selectAll = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        connection.connect((err, client, done) => {
        if (err) {
          console.error('Erreur lors de la connexion à la base de données :', err);
          return reject(err);
        }
  
        client.query('SELECT * FROM users', (err, result: QueryResult) => {
          done(); // Libérer le client de la pool.
  
          if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return reject(err);
          }
  
          // Assurez-vous que "result.rows" contient les résultats.
          const resultSet: User[] = result.rows;
  
          return resolve(resultSet);
        });
      });
    });
  };
  const getUserById = (userId: number): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      connection.connect((err, client, done) => {
        if (err) {
          console.error('Erreur lors de la connexion à la base de données :', err);
          return reject(err);
        }
  
        const query = 'SELECT * FROM users WHERE id = $1';
        const values = [userId];
  
        client.query(query, values, (err, result: QueryResult) => {
          done(); // Libérer le client de la pool.
  
          if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return reject(err);
          }
  
          const user: User | null = result.rows.length ? result.rows[0] : null;
  
          return resolve(user);
        });
      });
    });
  };

  const add = async (user: User): Promise<User> => {
    try {
      const { firstname, lastname, username, email, password } = user;
      
      // Generate the salt and hash the password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const query = 'INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [firstname, lastname, username, email, hashedPassword];
  
      const result = await connection.query(query, values);
      const insertedUser: User = result.rows[0];
  
      return insertedUser;
    } catch (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      throw err;
    }
  };
/*   const add = (user: User): Promise<User> => {
    return new Promise((resolve, reject) => {
      connection.connect((err, client, done) => {
        if (err) {
          console.error('Erreur lors de la connexion à la base de données :', err);
          return reject(err);
        }

        const { firstname, lastname, username,  email, password } = user;
        const query = 'INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [firstname, lastname,username, email, password];
  
        client.query(query, values, (err, result: QueryResult) => {
          done(); // Libérer le client de la pool.
  
          if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return reject(err);
          }
  
          // Assurez-vous que "result.rows" contient les résultats.
          const insertedUser: User = result.rows[0];
  
          return resolve(insertedUser);
        });
      });
    });
  }; */
export default { selectAll,getUserById, add };
