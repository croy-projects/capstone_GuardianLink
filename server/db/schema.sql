DROP DATABASE IF EXISTS GLC_DB;
CREATE DATABASE IF NOT EXISTS GLC_DB;
USE GLC_DB;


--CREATE USER 'glcdbuser'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON GLC_DB.* TO 'glcdbuser'@'localhost';
FLUSH PRIVILEGES;

-- ==========================
-- User Role Table
-- ==========================
CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY,
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

-- ==========================
-- Organizations Table (NGOs/Small Companies)
-- ==========================
CREATE TABLE IF NOT EXISTS organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    area_of_concern TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================
-- Files Table 
-- ==========================
CREATE TABLE IF NOT EXISTS files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(500) NOT NULL,
    type VARCHAR(50) NOT NULL
);

-- ==========================
-- Volunteers Table 
-- ==========================
CREATE TABLE IF NOT EXISTS volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    hours_by_week INT,
    resume_id INT,
    background_check_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES files(id) ON DELETE SET NULL,
    FOREIGN KEY (background_check_id) REFERENCES files(id) ON DELETE SET NULL

);