
import {  QueryResult } from 'pg';
import { connection } from "../config/db";
import { Lobby } from "../model/lobby";


const selectAll = (): Promise<Lobby[]> => {
    return new Promise((resolve, reject) => {
        // Connect to the database
        connection.connect((err, client, done) => {
        if (err) {
        // Handle connection error
          console.error('Erreur lors de la connexion à la base de données :', err);
          return reject(err);
        }
        //Execute the SQL query to select all rows from the "lobby" table
        client.query('SELECT * FROM lobby', (err, result: QueryResult) => {
          done(); // Release the client back to the pool.
          if (err) {
            // Handle query execution error
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return reject(err);
          }
  
        // Make sure "result.rows" contains the query results.
        const resultSet: Lobby[] = result.rows;
        // Resolve the promise with the query results
          return resolve(resultSet);
        });
      });
    });
  };
  const getLobbyById = (lobbyId: number): Promise<Lobby | null> => {
    return new Promise((resolve, reject) => {
      connection.connect((err, client, done) => {
        if (err) {
          console.error('Erreur lors de la connexion à la base de données :', err);
          return reject(err);
        }
  
        const query = 'SELECT * FROM lobby WHERE id = $1';
        const values = [lobbyId];
  
        client.query(query, values, (err, result: QueryResult) => {
          done(); 
  
          if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return reject(err);
          }
  
          const lobby: Lobby | null = result.rows.length ? result.rows[0] : null;
  
          return resolve(lobby);
        });
      });
    });
  };
  const add = (lobby: Lobby): Promise<Lobby> => {
    return new Promise((resolve, reject) => {
      connection.connect((err, client, done) => {
        if (err) {
          console.error('Erreur lors de la connexion à la base de données :', err);
          return reject(err);
        }
  
        const { userId,name,creation_date} = lobby;
        const query = 'INSERT INTO lobby (user_id,name,creation_date) VALUES ($1, $2, $3) RETURNING *';
        const values = [userId,name,creation_date];
  
        client.query(query, values, (err, result: QueryResult) => {
          done(); 
  
          if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return reject(err);
          }
  
          const insertedLobby: Lobby = result.rows[0];
  
          return resolve(insertedLobby);
        });
      });
    });
  };
export default { selectAll,getLobbyById, add };
