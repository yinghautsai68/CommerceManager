USE commerce_manager_dev;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
 id INT AUTO_INCREMENT PRIMARY KEY,
 password VARCHAR(255) NOT NULL,
 
 name VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL UNIQUE,
 phone VARCHAR(20) NOT NULL UNIQUE,

 role ENUM('admin', 'worker') NOT NULL DEFAULT 'worker',
 work ENUM('desk','developer') DEFAULT NULL,
 status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
 
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (password, name, email, phone, role, work, status) 
VALUES('123456', '蔡英豪', 'yinghautsai68@gmail.com', '0903621669', 'worker', null, 'active');
INSERT INTO users (password, name, email, phone, role, work, status) 
VALUES('123456', '英豪', 'yinghautsai@gmail.com', '0903621668', 'worker', null, 'active');

CREATE TABLE IF NOT EXISTS products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    stock INT,
    status ENUM('active','archived') DEFAULT 'active',
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    shipment_status ENUM('pending','shipped', 'completed', 'cancelled') DEFAULT 'pending',
    customer_name VARCHAR(100) NOT NULL,
    customer_number VARCHAR(20) NOT NULL,
    customer_address VARCHAR(255) NOT NULL,
    shipping_method VARCHAR(50) NOT NULL,
    shipping_fee DECIMAL(10,2) DEFAULT 0,
    tax DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) DEFAULT 0,
    remarks TEXT,
);

CREATE TABLE IF NOT EXISTS order_items(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    discount DECIMAL(10,2) DEFAULT 0,
    sub_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)