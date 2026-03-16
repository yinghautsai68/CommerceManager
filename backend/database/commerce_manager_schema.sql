CREATE DATABASE IF NOT EXISTS commerce_manager_dev;
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

INSERT INTO users(password,name,email,phone, role, work, status) VALUES
('$2b$10$reHNwuG1bmfxEYXuYsDOuepxMI7.xUMZfZa1F7G266ZS9C2S6WPYu','阿豪', 'yinghautsai86@gmail.com', '0958060589','admin', 'developer', 'active'),
('$2b$10$reHNwuG1bmfxEYXuYsDOuepxMI7.xUMZfZa1F7G266ZS9C2S6WPYu','阿豪2', 'yinghautsai90@gmail.com', '0948060589','worker', 'developer', 'active');


ALTER TABLE users
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO users (password, name, email, phone, role, work, status) VALUES
('123456', '王小明', 'user1@example.com', '0903621601', 'worker', 'developer', 'active'),
('123456', '陳大華', 'user2@example.com', '0903621602', 'worker', 'desk', 'active'),
('123456', '林美麗', 'user3@example.com', '0903621603', 'worker', 'developer', 'active'),
('123456', '張志強', 'user4@example.com', '0903621604', 'worker', 'desk', 'inactive'),
('123456', '李佳慧', 'user5@example.com', '0903621605', 'worker', 'developer', 'active'),
('123456', '劉建國', 'user6@example.com', '0903621606', 'worker', 'desk', 'active'),
('123456', '黃怡婷', 'user7@example.com', '0903621607', 'worker', 'developer', 'active'),
('123456', '周宗翰', 'user8@example.com', '0903621608', 'worker', 'desk', 'inactive'),
('123456', '徐婉婷', 'user9@example.com', '0903621609', 'worker', 'developer', 'active'),
('123456', '謝明哲', 'user10@example.com', '0903621610', 'worker', 'desk', 'active'),
('123456', '林志玲', 'user11@example.com', '0903621611', 'worker', 'developer', 'active'),
('123456', '鄭凱文', 'user12@example.com', '0903621612', 'worker', 'desk', 'inactive'),
('123456', '王婉如', 'user13@example.com', '0903621613', 'worker', 'developer', 'active'),
('123456', '陳思穎', 'user14@example.com', '0903621614', 'worker', 'desk', 'active'),
('123456', '李宗翰', 'user15@example.com', '0903621615', 'worker', 'developer', 'active'),
('123456', '劉怡君', 'user16@example.com', '0903621616', 'worker', 'desk', 'inactive'),
('123456', '黃志明', 'user17@example.com', '0903621617', 'worker', 'developer', 'active'),
('123456', '周怡婷', 'user18@example.com', '0903621618', 'worker', 'desk', 'active'),
('123456', '徐凱文', 'user19@example.com', '0903621619', 'worker', 'developer', 'active'),
('123456', '謝怡婷', 'user20@example.com', '0903621620', 'worker', 'desk', 'inactive');


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
('P1001', '無線藍牙耳機', '3C電子', '高音質無線藍牙耳機，支援降噪功能與長時間續航。', 1990.50, 50, 'active', 'https://ying-cmanager-images.s3.us-east-1.amazonaws.com/sony_wh1000xm4.jpg'),
('P1002', '機械式鍵盤', '電腦周邊', 'RGB背光機械式鍵盤，適合打字與遊戲使用。', 2890.10, 30, 'active', 'https://ying-cmanager-images.s3.us-east-1.amazonaws.com/glorious_keyboard.png'),
('P1003', '無線滑鼠', '電腦周邊', '人體工學設計無線滑鼠，操作流暢且省電。', 690.20, 80, 'active', 'https://ying-cmanager-images.s3.us-east-1.amazonaws.com/logitech_mouse.png'),
('P1004', '27吋電腦螢幕', '3C電子', '27吋IPS螢幕，解析度2560x1440，適合辦公與娛樂。', 7990.20, 20, 'active', 'https://ying-cmanager-images.s3.us-east-1.amazonaws.com/asus_monitor.png'),
('P1005', '筆電包', '電腦周邊', '可保護筆記型電腦的防震筆電包，適合日常攜帶與通勤使用。', 1290.30, 60, 'active', 'https://ying-cmanager-images.s3.us-east-1.amazonaws.com/laptop_bag.png');

DROP TABLE IF EXISTS orders;
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
('failed','cancelled','陳志明','0945678901','高雄市前鎮區中華五路400號','宅配',120,60,7990,''),
('paid','completed','林怡君','0956789012','台南市東區府連路500號','宅配',100,50,2580,'公司用');

INSERT INTO orders 
(order_date, payment_status, shipment_status, customer_name, customer_number, customer_address, shipping_method, shipping_fee, tax, total_amount, remarks)
VALUES
('2026-01-01','paid','completed','王志豪','0911000001','台北市信義區松仁路1號','宅配',100,50,3500,''),
('2026-01-02','paid','completed','林子涵','0911000002','新北市板橋區文化路2號','超商取貨',60,30,2600,''),
('2026-01-03','pending','pending','陳柏宇','0911000003','桃園市中壢區中央路3號','宅配',100,50,4200,''),
('2026-01-04','paid','shipped','李怡婷','0911000004','台中市西屯區台灣大道4號','宅配',100,50,1800,''),
('2026-01-05','paid','completed','張凱文','0911000005','台南市東區林森路5號','超商取貨',60,30,2900,''),
('2026-01-06','failed','cancelled','黃雅雯','0911000006','高雄市左營區博愛路6號','宅配',120,60,5100,''),
('2026-01-07','paid','completed','周家豪','0911000007','台北市士林區中山北路7號','宅配',100,50,3600,''),
('2026-01-08','pending','pending','徐嘉玲','0911000008','新竹市東區光復路8號','超商取貨',60,30,2100,''),
('2026-01-09','paid','completed','鄭智翔','0911000009','基隆市仁愛區仁一路9號','宅配',100,50,4800,''),
('2026-01-10','paid','shipped','劉思妤','0911000010','台中市北屯區崇德路10號','宅配',100,50,3100,''),

('2026-01-11','paid','completed','王俊凱','0911000011','台北市內湖區瑞光路11號','宅配',100,50,2700,''),
('2026-01-12','pending','pending','林佩珊','0911000012','新北市新莊區幸福路12號','超商取貨',60,30,1900,''),
('2026-01-13','paid','completed','陳志豪','0911000013','桃園市桃園區中正路13號','宅配',100,50,3300,''),
('2026-01-14','paid','completed','李佳穎','0911000014','台中市南屯區五權西路14號','宅配',100,50,4100,''),
('2026-01-15','paid','shipped','張家銘','0911000015','台南市安平區永華路15號','超商取貨',60,30,2500,''),
('2026-01-16','paid','completed','黃子豪','0911000016','高雄市三民區建國路16號','宅配',100,50,3800,''),
('2026-01-17','pending','pending','周雅婷','0911000017','台北市大安區和平東路17號','宅配',100,50,2900,''),
('2026-01-18','paid','completed','徐建宏','0911000018','新北市永和區中正路18號','宅配',100,50,3400,''),
('2026-01-19','paid','completed','鄭雅文','0911000019','台中市西區公益路19號','超商取貨',60,30,2100,''),
('2026-01-20','paid','shipped','劉冠廷','0911000020','高雄市苓雅區成功一路20號','宅配',100,50,3600,''),

('2026-01-21','paid','completed','王雅婷','0911000021','台北市萬華區成都路21號','宅配',100,50,2700,''),
('2026-01-22','pending','pending','林志豪','0911000022','新北市三重區重新路22號','超商取貨',60,30,2300,''),
('2026-01-23','paid','completed','陳怡君','0911000023','桃園市八德區介壽路23號','宅配',100,50,3200,''),
('2026-01-24','paid','completed','李俊傑','0911000024','台中市北區學士路24號','宅配',100,50,4500,''),
('2026-01-25','paid','shipped','張雅涵','0911000025','台南市中西區民族路25號','超商取貨',60,30,2000,'');



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
(1, 2, 1, 0, 350),   
(1, 3, 1, 0, 350),   
(2, 2, 1, 0, 2890),
(3, 1, 1, 0, 1990),
(3, 2, 1, 0, 1990),
(4, 4, 1, 0, 7990),
(4, 5, 1, 0, 7990),
(5, 2, 1, 0, 2890),
(5, 3, 1, 310, 310);

INSERT INTO order_items (order_id, product_id, quantity, discount, sub_total)
VALUES
(6,1,1,0,1990),(6,3,1,0,690),
(7,2,1,0,2890),(7,3,1,0,690),
(8,4,1,0,7990),(8,5,1,0,1290),
(9,1,1,0,1990),(9,2,1,0,2890),
(10,3,2,0,1380),(10,5,1,0,1290),

(11,1,1,0,1990),(11,3,1,0,690),(11,5,1,0,1290),
(12,2,1,0,2890),(12,3,1,0,690),
(13,1,1,0,1990),(13,4,1,0,7990),
(14,2,1,0,2890),(14,5,1,0,1290),
(15,3,1,0,690),(15,1,1,0,1990),

(16,4,1,0,7990),(16,3,1,0,690),
(17,5,1,0,1290),(17,2,1,0,2890),
(18,1,1,0,1990),(18,3,1,0,690),
(19,2,1,0,2890),(19,5,1,0,1290),
(20,4,1,0,7990),(20,1,1,0,1990),

(21,3,1,0,690),(21,2,1,0,2890),
(22,5,1,0,1290),(22,1,1,0,1990),
(23,3,1,0,690),(23,4,1,0,7990),
(24,2,1,0,2890),(24,1,1,0,1990),
(25,5,1,0,1290),(25,3,1,0,690),

(26,4,1,0,7990),(26,2,1,0,2890),
(27,1,1,0,1990),(27,5,1,0,1290),
(28,3,1,0,690),(28,2,1,0,2890),
(29,5,1,0,1290),(29,1,1,0,1990),
(30,4,1,0,7990),(30,3,1,0,690);