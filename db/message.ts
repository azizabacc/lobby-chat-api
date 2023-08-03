
import {  QueryResult } from 'pg';
import { connection } from "../config/db";
import { Message } from "../model/message";


const selectAll = (): Promise<Message[]> => {
    return new Promise((resolve, reject) => {
        // Connect to the database
        connection.connect((err, client, done) => {
        if (err) {
        // Handle connection error
          console.error('Erreur lors de la connexion à la base de données :', err);
          return reject(err);
        }
        //Execute the SQL query to select all rows from the "message" table
        client.query('SELECT * FROM message', (err, result: QueryResult) => {
          done(); // Release the client back to the pool.
          if (err) {
            // Handle query execution error
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return reject(err);
          }
  
        // Make sure "result.rows" contains the query results.
        const resultSet: Message[] = result.rows;
        // Resolve the promise with the query results
          return resolve(resultSet);
        });
      });
    });
  };

  const add = (message: Message): Promise<Message> => {
    return new Promise((resolve, reject) => {
      connection.connect((err, client, done) => {
        if (err) {
          console.error('Erreur lors de la connexion à la base de données :', err);
          return reject(err);
        }
  
        const { lobbyId,userId,creation_date} = message;
        const query = 'INSERT INTO users (lobby_id,user_id,creation_date) VALUES ($1, $2, $3) RETURNING *';
        const values = [lobbyId,userId,creation_date];
  
        client.query(query, values, (err, result: QueryResult) => {
          done(); 
  
          if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return reject(err);
          }
  
          const insertedMessage: Message = result.rows[0];
  
          return resolve(insertedMessage);
        });
      });
    });
  };
export default { selectAll, add };
