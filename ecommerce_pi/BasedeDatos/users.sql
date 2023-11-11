CREATE TABLE productos_vinos.users (
    user_id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) unique NOT NULL,
    password VARCHAR(255) NOT NULL
)
