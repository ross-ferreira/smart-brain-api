-- Seed data with a fake user for testing
BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Test User', 'tim@gmail.com', 1, '2018-01-01');
INSERT into login (hash, email) values ( '$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u','tim@gmail.com');

COMMIT;