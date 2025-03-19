DROP DATABASE IF EXISTS healthdiary;
CREATE DATABASE healthdiary;
USE healthdiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    energy_level INT,
    stress_level INT,  -- ✅ Corrected from "stres_level" to "stress_level"
    sleep_hours INT,
    notes TEXT,
    goals TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- ALTER example, adding a new column to existing table
ALTER TABLE Users ADD COLUMN user_level VARCHAR(10) DEFAULT 'regular';

-------------------
-- Insert test data
-------------------

-- Inserting a single user record (now explicitly defining columns to match order)
INSERT INTO Users (user_id, username, password, email, created_at, user_level) 
VALUES (1, 'johndoe', 'temp-pw-1', 'johndoe@example.com', '2025-03-02 10:00:00', 'regular');

-- Inserting multiple user rows at once
INSERT INTO Users (username, password, email, user_level) VALUES
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

-- Inserting diary entry (✅ Fixed column name "stress_level")
INSERT INTO DiaryEntries (user_id, entry_date, mood, energy_level, stress_level, sleep_hours, notes, goals, created_at) 
VALUES 
  (1, '2025-01-10', 'Happy', 10, 4, 8, 'Had a great day, felt energetic', 'Save money', '2025-01-10 20:00:00');
