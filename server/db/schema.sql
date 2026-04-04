DROP DATABASE IF EXISTS GLC_DB;
CREATE DATABASE IF NOT EXISTS GLC_DB;
USE GLC_DB;


CREATE USER 'glcdbuser'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON GLC_DB.* TO 'glcdbuser'@'localhost';
FLUSH PRIVILEGES;

-- ==========================
-- User Role Table
-- ==========================
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- ==========================
-- Users Table
-- ==========================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);