BEGIN TRANSACTION;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    age BIGINT DEFAULT 0,
    pet VARCHAR(100),
    joined TIMESTAMP NOT NULL
    
);

COMMIT;