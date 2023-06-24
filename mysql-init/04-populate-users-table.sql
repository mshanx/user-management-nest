use nest;
INSERT INTO users (email, password, name, bossId, online, role)
VALUES
  ('admin@example.com', 'adminpassword', 'Admin User', NULL, 0, 'admin'),
  ('boss@example.com', 'bosspassword', 'Boss User', NULL, 0, 'boss'),
  ('user1@example.com', 'password1', 'User 1', NULL, 0, 'regular'),
  ('user2@example.com', 'password2', 'User 2', 2, 1, 'regular'),
  ('user3@example.com', 'password3', 'User 3', 2, 0, 'regular'),
  ('user4@example.com', 'password4', 'User 4', 3, 0, 'boss'),
  ('user5@example.com', 'password5', 'User 5', 6, 0, 'regular');