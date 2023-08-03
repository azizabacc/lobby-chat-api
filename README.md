# ERD Diagram
![ERD_Diagram](/src/public/images/lobby_database.png)

## Database Schema

Below is the SQL code for creating the necessary tables and constraints in the database:

```sql
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    firstname varchar(150) NOT NULL,
    lastname varchar(150) NOT NULL,
    username varchar(150) NOT NULL UNIQUE,
    email varchar(250) NOT NULL UNIQUE,
    password varchar(250) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE lobby (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE lobby_users (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    lobby_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE message (
    id INT NOT NULL AUTO_INCREMENT,
    lobby_id INT NOT NULL,
    users_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE comment (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    lobby_id INT NOT NULL,
    message_id INT NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE lobby ADD CONSTRAINT lobby_fk0 FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE lobby_users ADD CONSTRAINT lobby_users_fk0 FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE lobby_users ADD CONSTRAINT lobby_users_fk1 FOREIGN KEY (lobby_id) REFERENCES lobby(id);

ALTER TABLE message ADD CONSTRAINT message_fk0 FOREIGN KEY (lobby_id) REFERENCES lobby(id);

ALTER TABLE message ADD CONSTRAINT message_fk1 FOREIGN KEY (users_id) REFERENCES users(id);

ALTER TABLE comment ADD CONSTRAINT comment_fk0 FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE comment ADD CONSTRAINT comment_fk1 FOREIGN KEY (lobby_id) REFERENCES lobby(id);

ALTER TABLE comment ADD CONSTRAINT comment_fk2 FOREIGN KEY (message_id) REFERENCES message(id);
```
