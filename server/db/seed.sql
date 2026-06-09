USE GLC_DB;

-- Insert roles
INSERT INTO roles (id, name) VALUES
 (1, 'Admin'), (2, 'Organization'), (3, 'Volunteer');

-- Admin password = admin1234

 -- Insert default admin
INSERT INTO users (role_id, name, email, password) VALUES
(1, 'Admin', 'admin@guardianlink.com', '$2b$10$W/tya58owN4K7fk3uVEoDONDEwUUEa0OaAJZh/CQbVPK8.Z1bT1nK');

INSERT INTO users (role_id, name, email, password) VALUES
(1, 'Admin Test', 'admin@admin.com', '$2b$10$Nj0GXVCbs1QbzBiP51g0P.Lsk.PJ110WikI32wXjVaGdYZ6XDu7Ti');



-- Create NGO users (role_id = 2) examples

INSERT INTO users (name, email, password, role_id)
VALUES
('Toronto Community Food Bank', 'contact@torontofoodbank.org', '$2b$10$7vvv1.ewiNa4PF0dNeyqcOYXcSQL5vmpfFadZI9MSOL15KAh2uDqW', 2),
('Youth Empowerment Network', 'info@youthnetwork.ca', '$2b$10$7vvv1.ewiNa4PF0dNeyqcOYXcSQL5vmpfFadZI9MSOL15KAh2uDqW', 2),
('Green Earth Initiative', 'support@greenearthinitiative.org', '$2b$10$7vvv1.ewiNa4PF0dNeyqcOYXcSQL5vmpfFadZI9MSOL15KAh2uDqW', 2),
('Hope Animal Rescue Society', 'admin@hopeanimals.org', '$2b$10$7vvv1.ewiNa4PF0dNeyqcOYXcSQL5vmpfFadZI9MSOL15KAh2uDqW', 2),
('Senior Care Outreach Foundation', 'help@seniorcareoutreach.org', '$2b$10$7vvv1.ewiNa4PF0dNeyqcOYXcSQL5vmpfFadZI9MSOL15KAh2uDqW', 2);


-- Create organization records 
-- password = usertest1234
INSERT INTO organizations (user_id, area_of_concern)
VALUES
(
    (SELECT id FROM users WHERE email = 'contact@torontofoodbank.org'),
    'Email security, phishing awareness, backup and disaster recovery planning.'
),
(
    (SELECT id FROM users WHERE email = 'info@youthnetwork.ca'),
    'Secure storage of volunteer and donor information, password policies, and staff cybersecurity training.'
),
(
    (SELECT id FROM users WHERE email = 'support@greenearthinitiative.org'),
    'Website security, malware protection, and cloud account security.'
),
(
    (SELECT id FROM users WHERE email = 'admin@hopeanimals.org'),
    'Data privacy for adoption records, ransomware prevention, and secure file sharing.'
),
(
    (SELECT id FROM users WHERE email = 'help@seniorcareoutreach.org'),
    'Protection of personal information, email spoofing prevention, and multi-factor authentication implementation.'
);


-- Create volunteer users (role_id = 3)

INSERT INTO users (name, email, password, role_id)
VALUES
('John Smith', 'john.smith@email.com', '$2b$10$7vvv1.ewiNa4PF0dNeyqcOYXcSQL5vmpfFadZI9MSOL15KAh2uDqW', 3),
('Emily Chen', 'emily.chen@email.com', '$2b$10$7vvv1.ewiNa4PF0dNeyqcOYXcSQL5vmpfFadZI9MSOL15KAh2uDqW', 3),
('Michael Rodriguez', 'michael.rodriguez@email.com', '$2b$10$7vvv1.ewiNa4PF0dNeyqcOYXcSQL5vmpfFadZI9MSOL15KAh2uDqW', 3),
('Sarah Patel', 'sarah.patel@email.com', '$2b$10$7vvv1.ewiNa4PF0dNeyqcOYXcSQL5vmpfFadZI9MSOL15KAh2uDqW', 3),
('David Wilson', 'david.wilson@email.com', '$2b$10$7vvv1.ewiNa4PF0dNeyqcOYXcSQL5vmpfFadZI9MSOL15KAh2uDqW', 3);


-- Create volunteer profiles

INSERT INTO volunteers (
    user_id,
    hours_by_week,
    resume,
    background_check,
    background_check_status
)
VALUES
(
    (SELECT id FROM users WHERE email = 'john.smith@email.com'),
    10,
    NULL,
    NULL,
    'pending'
),
(
    (SELECT id FROM users WHERE email = 'emily.chen@email.com'),
    15,
    NULL,
    NULL,
    'verified'
),
(
    (SELECT id FROM users WHERE email = 'michael.rodriguez@email.com'),
    8,
    NULL,
    NULL,
    'pending'
),
(
    (SELECT id FROM users WHERE email = 'sarah.patel@email.com'),
    20,
    NULL,
    NULL,
    'verified'
),
(
    (SELECT id FROM users WHERE email = 'david.wilson@email.com'),
    5,
    NULL,
    NULL,
    'flagged'
);