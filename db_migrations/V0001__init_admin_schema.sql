CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    length VARCHAR(100) NOT NULL,
    diameter VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL DEFAULT 'по запросу',
    description TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    author VARCHAR(255) NOT NULL,
    position VARCHAR(255),
    text TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    comment TEXT,
    source VARCHAR(50) DEFAULT 'contact_form',
    is_processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO products (name, type, length, diameter, price, description, sort_order) VALUES
('Сваи забивные железобетонные', 'С40-15', '4 метра', '150 мм', 'по запросу', 'Для частных домов и коттеджей', 1),
('Сваи забивные железобетонные', 'С30-15', '3 метра', '150 мм', 'по запросу', 'Для частных домов и коттеджей', 2),
('Сваи забивные железобетонные', 'С40-20', '4 метра', '200 мм', 'по запросу', 'Для частных домов и коттеджей', 3),
('Сваи забивные железобетонные', 'С30-20', '3 метра', '200 мм', 'по запросу', 'Для частных домов и коттеджей', 4);
