-- Deploy fresh database tables

-- Order matters here if your tables depend on each other
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'

-- This is for seeding the tables
\i '/docker-entrypoint-initdb.d/seed/seed.sql'