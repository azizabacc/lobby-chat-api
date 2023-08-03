import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
/* export const connection = new Pool({
	database: process.env.DATABASE_NAME,
	host: process.env.DATABASE_HOST,
	port : 5432,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD
}) */
export const connection = new Pool({
    database: 'lobbydb',                 
    host: 'localhost',                    
    port: 5432,                         
    user: 'lobbydb_admin',               
    password: 'azizabacc'                
});