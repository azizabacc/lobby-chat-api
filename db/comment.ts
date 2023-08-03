
import {  QueryResult } from 'pg';
import { connection } from "../config/db";
import { Comment } from "../model/comment";


const selectAll = (): Promise<Comment[]> => {
    return new Promise((resolve, reject) => {
        // Connect to the database
        connection.connect((err, client, done) => {
        if (err) {
        // Handle connection error
          console.error('Erreur lors de la connexion à la base de données :', err);
          return reject(err);
        }
        //Execute the SQL query to select all rows from the "comment" table
        client.query('SELECT * FROM comment', (err, result: QueryResult) => {
          done(); // Release the client back to the pool.
          if (err) {
            // Handle query execution error
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return reject(err);
          }
  
        // Make sure "result.rows" contains the query results.
        const resultSet: Comment[] = result.rows;
        // Resolve the promise with the query results
          return resolve(resultSet);
        });
      });
    });
  };

  const add = (comment: Comment): Promise<Comment> => {
    return new Promise((resolve, reject) => {
      connection.connect((err, client, done) => {
        if (err) {
          console.error('Erreur lors de la connexion à la base de données :', err);
          return reject(err);
        }
  
        const { userId,lobbyId,messageId,creation_date} = comment;
        const query = 'INSERT INTO users (user_id,lobby_id,meesage_id,creation_date) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [userId,lobbyId,messageId,creation_date];
  
        client.query(query, values, (err, result: QueryResult) => {
          done(); 
  
          if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return reject(err);
          }
  
          const insertedComment: Comment = result.rows[0];
  
          return resolve(insertedComment);
        });
      });
    });
  };
export default { selectAll, add };
