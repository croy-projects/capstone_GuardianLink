USE GLC_DB;

-- Insert roles
INSERT INTO roles (id, name) VALUES
 (1, 'Admin'), (2, 'Organization'), (3, 'Volunteer');

 -- Insert default admin
INSERT INTO users (role_id, name, email, password) VALUES
(1, 'Admin', 'admin@guardianlink.com', '$2b$10$eVfb6rYk3UW6M4RHycwtAe4jecHXQg28Xz0PRT9Fg9fbZJZHt8hTi');