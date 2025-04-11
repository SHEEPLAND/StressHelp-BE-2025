-- User creation example, replace 'user' & 'password'
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `HealthDiary2`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
