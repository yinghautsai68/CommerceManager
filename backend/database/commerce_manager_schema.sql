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

DROP TABLE IF EXISTS products;
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
INSERT INTO products (sku, name, category, description, price, stock, status, image_url) 
VALUES
('P1001', '無線藍牙耳機', '3C電子', '高音質無線藍牙耳機，支援降噪功能與長時間續航。', 1990.50, 50, 'active', 'https://example.com/images/earbuds.jpg'),
('P1002', '機械式鍵盤', '電腦周邊', 'RGB背光機械式鍵盤，適合打字與遊戲使用。', 2890.10, 30, 'active', 'https://example.com/images/keyboard.jpg'),
('P1003', '無線滑鼠', '電腦周邊', '人體工學設計無線滑鼠，操作流暢且省電。', 690.20, 80, 'active', 'https://example.com/images/mouse.jpg'),
('P1004', '27吋電腦螢幕', '3C電子', '27吋IPS螢幕，解析度2560x1440，適合辦公與娛樂。', 7990.20, 20, 'active', 'https://example.com/images/monitor.jpg'),
('P1005', 'USB-C 多功能轉接器', '電腦周邊', '支援HDMI、USB與SD卡讀取的多功能轉接器。', 1290.30, 60, 'active', 'https://example.com/images/hub.jpg');


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
    remarks TEXT
);

INSERT INTO orders (payment_status, shipment_status, customer_name, customer_number, customer_address, shipping_method, shipping_fee, tax, total_amount, remarks)
VALUES
('paid','completed','張小明','0912345678','台北市中正區忠孝路100號','宅配',100,50,2340,'首次購買'),
('pending','pending','李大華','0923456789','新北市板橋區中山路200號','宅配',80,45,2890,'生日禮物'),
('paid','shipped','王小美','0934567890','台中市西屯區文心路300號','超商取貨',60,30,1990,'請快速寄送'),
('failed','cancelled','陳志明','0945678901','高雄市前鎮區中華五路400號','宅配',120,60,7990,'付款失敗'),
('paid','completed','林怡君','0956789012','台南市東區府連路500號','宅配',100,50,2580,'公司用'),
('paid','completed','劉建宏','0967890123','桃園市中壢區中央路600號','宅配',90,45,1980,'多件訂單'),
('pending','pending','黃欣怡','0978901234','新竹市東區光復路700號','超商取貨',70,35,1290,'請盡快寄出'),
('paid','shipped','蔡英豪','0989012345','台北市信義區信義路800號','宅配',100,50,3680,'回購商品'),
('paid','completed','張婷','0990123456','台中市南區公益路900號','宅配',80,40,2890,'感謝優惠'),
('pending','pending','王志偉','0901122334','台北市大安區復興南路1000號','超商取貨',60,30,690,'單件購買');


DROP TABLE IF EXISTS order_items;
CREATE TABLE IF NOT EXISTS order_items(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    discount DECIMAL(10,2) DEFAULT 0,
    sub_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);



INSERT INTO order_items (order_id, product_id, quantity, discount, sub_total)
VALUES
(1, 1, 1, 0, 1990),
(1, 3, 1, 0, 350),   -- subtotal for second product
(2, 2, 1, 0, 2890),
(3, 1, 1, 0, 1990),
(4, 4, 1, 0, 7990),
(5, 2, 1, 0, 2890),
(5, 3, 1, 310, 310), -- example discount applied
(6, 5, 1, 0, 1290),
(6, 3, 1, 0, 690),
(7, 5, 1, 0, 1290),
(8, 2, 1, 0, 2890),
(8, 3, 1, 0, 790),
(9, 2, 1, 0, 2890),
(10, 3, 1, 0, 690);


