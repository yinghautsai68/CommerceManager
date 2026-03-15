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


INSERT INTO orders (order_date, payment_status, shipment_status, customer_name, customer_number, customer_address, shipping_method, shipping_fee, tax, total_amount, remarks)
VALUES
('2026-03-01 10:15:00','paid','completed','張小明','0912345678','台北市中正區忠孝路100號','宅配',100,50,2340,'首次購買'),
('2026-03-02 12:30:00','pending','pending','李大華','0923456789','新北市板橋區中山路200號','宅配',80,45,2890,'生日禮物'),
('2026-03-03 09:45:00','paid','shipped','王小美','0934567890','台中市西屯區文心路300號','超商取貨',60,30,1990,'請快速寄送'),
('2026-03-04 14:20:00','failed','cancelled','陳志明','0945678901','高雄市前鎮區中華五路400號','宅配',120,60,7990,'付款失敗'),
('2026-03-05 11:00:00','paid','completed','林怡君','0956789012','台南市東區府連路500號','宅配',100,50,2580,'公司用'),
('2026-03-06 15:30:00','paid','completed','劉建宏','0967890123','桃園市中壢區中央路600號','宅配',90,45,1980,'多件訂單'),
('2026-03-07 13:10:00','pending','pending','黃欣怡','0978901234','新竹市東區光復路700號','超商取貨',70,35,1290,'請盡快寄出'),
('2026-03-08 16:25:00','paid','shipped','蔡英豪','0989012345','台北市信義區信義路800號','宅配',100,50,3680,'回購商品'),
('2026-03-09 09:50:00','paid','completed','張婷','0990123456','台中市南區公益路900號','宅配',80,40,2890,'感謝優惠'),
('2026-03-10 18:22:45','pending','pending','王志偉','0901122334','台北市大安區復興南路1000號','超商取貨',60,30,690,'單件購買');

INSERT INTO orders (payment_status, shipment_status, customer_name, customer_number, customer_address, shipping_method, shipping_fee, tax, total_amount, remarks)
VALUES
('paid','completed','陳怡君','0911111111','台北市信義區松仁路1號','宅配',100,50,5120,'回購'),
('paid','shipped','林志豪','0922222222','新北市新莊區幸福路22號','宅配',90,45,3680,'一般訂單'),
('pending','pending','黃雅婷','0933333333','桃園市桃園區中正路33號','超商取貨',60,30,1990,'等待付款'),
('paid','completed','張志強','0944444444','台中市北屯區崇德路44號','宅配',100,50,4580,'公司採購'),
('paid','completed','吳佩玲','0955555555','高雄市三民區建國路55號','宅配',100,50,2580,''),
('pending','pending','劉俊傑','0966666666','台南市安平區安平路66號','超商取貨',60,30,1890,'急件'),
('paid','shipped','許雅雯','0977777777','新竹市東區光復路77號','宅配',100,50,2890,''),
('paid','completed','楊宗翰','0988888888','台北市士林區中山北路88號','宅配',100,50,6900,'多件商品'),
('paid','completed','鄭佳玲','0999999999','台中市西屯區台灣大道99號','宅配',100,50,3290,''),
('pending','pending','郭志宏','0901111111','桃園市中壢區中央路11號','超商取貨',60,30,1990,''),

('paid','completed','謝明哲','0902222222','高雄市苓雅區三多路22號','宅配',100,50,5200,''),
('paid','shipped','曾婉婷','0903333333','台南市東區東門路33號','宅配',100,50,2990,''),
('pending','pending','洪嘉宏','0904444444','台北市萬華區西園路44號','超商取貨',60,30,1290,''),
('paid','completed','潘怡萱','0905555555','新北市中和區中山路55號','宅配',100,50,4290,''),
('paid','completed','蕭冠宇','0906666666','台中市南屯區黎明路66號','宅配',100,50,2890,''),
('paid','shipped','周佳慧','0907777777','新竹縣竹北市光明路77號','宅配',100,50,2590,''),
('pending','pending','邱志偉','0908888888','桃園市龜山區文化路88號','超商取貨',60,30,1990,''),
('paid','completed','賴怡婷','0909999999','台南市北區成功路99號','宅配',100,50,4590,''),
('paid','completed','宋志豪','0910000000','台北市中山區南京東路','宅配',100,50,5990,''),
('paid','completed','簡佩珊','0911111112','高雄市左營區博愛路','宅配',100,50,2990,''),

('pending','pending','戴俊傑','0911111113','台中市北區學士路','超商取貨',60,30,1990,''),
('paid','completed','羅佳琪','0911111114','新北市板橋區文化路','宅配',100,50,4890,''),
('paid','completed','鍾偉倫','0911111115','桃園市平鎮區環南路','宅配',100,50,2690,''),
('paid','completed','徐雅婷','0911111116','台南市永康區中華路','宅配',100,50,3690,''),
('paid','shipped','江志宏','0911111117','台北市內湖區瑞光路','宅配',100,50,3190,''),
('pending','pending','杜佩琪','0911111118','高雄市鳳山區青年路','超商取貨',60,30,1290,''),
('paid','completed','葉志強','0911111119','台中市西區公益路','宅配',100,50,4290,''),
('paid','completed','鄧怡君','0911111120','新竹市北區經國路','宅配',100,50,3890,''),
('paid','completed','宋佳豪','0911111121','桃園市蘆竹區南崁路','宅配',100,50,4990,'');

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
