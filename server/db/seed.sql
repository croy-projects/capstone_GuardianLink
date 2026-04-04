USE GLC_DB;

-- Insert roles
INSERT INTO roles (name) VALUES
 ('Admin'), ('Organization'), ('Volunteer');

 -- Insert default admin
INSERT INTO users (role_id, name, email, password) VALUES
(1, 'Admin', 'admin@guardianlink.com', 'admin');