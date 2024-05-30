
CREATE DATABASE JeweleryOrderProduction

CREATE TABLE Roles (
    role_id INT NOT NULL PRIMARY KEY,
    role_name NVARCHAR(50) NOT NULL,
    UNIQUE (role_name)
);

CREATE TABLE [User] ( 
    user_id INT NOT NULL PRIMARY KEY,
    email NVARCHAR(50) NOT NULL,
    phone NVARCHAR(50) NOT NULL,
    password NVARCHAR(50) NOT NULL,
    created_date DATE NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id),
    UNIQUE (email),
    UNIQUE (phone)
);

CREATE TABLE Payment_Status (
    payment_status_id INT NOT NULL PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL
);


CREATE TABLE Customer_Detail (
    customer_id INT NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    first_name NVARCHAR(35) NOT NULL,
    last_name NVARCHAR(35) NOT NULL,
    sex NVARCHAR(10) NOT NULL,
    birth_date DATE NOT NULL,
    address_line NVARCHAR(50) NOT NULL,
    province NVARCHAR(50) NOT NULL,
    district_town NVARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES [User](user_id),
    UNIQUE (user_id)
);

CREATE TABLE Product_Types (
    product_type_id INT NOT NULL PRIMARY KEY,
    type_name NVARCHAR(50) NOT NULL,
    UNIQUE (type_name)
);

CREATE TABLE Metals (
    metal_id INT NOT NULL PRIMARY KEY,
    metal_type_name NVARCHAR(50) NOT NULL,
    UNIQUE (metal_type_name)
);

CREATE TABLE Product (
    product_id INT NOT NULL PRIMARY KEY,
    product_type_id INT NOT NULL,
    product_name NVARCHAR(50) NOT NULL,
    product_description TEXT,
    inStock BIT NOT NULL,
    FOREIGN KEY (product_type_id) REFERENCES Product_Types(product_type_id),
    UNIQUE (product_name)
);


CREATE TABLE Gemstone (
    gemstone_id INT NOT NULL PRIMARY KEY,
    gemstone_type NVARCHAR(50) NOT NULL,
    gemstone_carat INT NOT NULL,
    color NVARCHAR(50),
    UNIQUE (gemstone_type, gemstone_carat, color)
);


CREATE TABLE Product_Stock (
    product_stock_id INT NOT NULL PRIMARY KEY,
    product_id INT NOT NULL,
    gemstone_id INT NOT NULL,
    metal_id INT NOT NULL,
    size INT,
    stock_quantity INT,
    price DECIMAL(10, 2) NOT NULL,
    gallery_url NVARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (gemstone_id) REFERENCES Gemstone(gemstone_id),
    FOREIGN KEY (metal_id) REFERENCES Metals(metal_id),
    UNIQUE (product_id, gemstone_id, metal_id, size)
);



CREATE TABLE Status (
    status_id INT NOT NULL PRIMARY KEY,
    status_detail NVARCHAR(50) NOT NULL,
    UNIQUE (status_detail)
);

CREATE TABLE Orders (
    order_id INT NOT NULL PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    order_status NVARCHAR(50) NOT NULL,
    payment_status_id INT NOT NULL,
    is_shipment BIT NOT NULL,
    is_custom BIT NOT NULL,
    order_total  DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer_Detail(customer_id),
    FOREIGN KEY (payment_status_id) REFERENCES Payment_Status(payment_status_id)

);

CREATE TABLE Order_Fixed_Items (
    order_fixed_item_id INT NOT NULL PRIMARY KEY,
    order_id INT NOT NULL,
    product_stock_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_stock_id) REFERENCES Product_Stock(product_stock_id),
    UNIQUE (order_id, product_stock_id)
);

CREATE TABLE Order_Custom_Items (
    order_item_id INT NOT NULL PRIMARY KEY,
    order_id INT NOT NULL,
    gemstone_id INT NOT NULL,
    metal_id INT NOT NULL,
    size INT,
    quantity INT,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (gemstone_id) REFERENCES Gemstone(gemstone_id),
    FOREIGN KEY (metal_id) REFERENCES Metals(metal_id),
    UNIQUE (order_id, gemstone_id, metal_id, size)
);

CREATE TABLE Transactions (
    transaction_id INT NOT NULL PRIMARY KEY,
    order_id INT NOT NULL,
    transaction_date DATE NOT NULL,
    transaction_total DECIMAL(10, 2) NOT NULL,
    payment_type NVARCHAR(50),
    is_deposit BIT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Quote (
    quote_id INT NOT NULL PRIMARY KEY,
    order_id INT NOT NULL,
    created_date DATE NOT NULL,
    metal_weight DECIMAL(10, 2),
    metal_cost DECIMAL(10, 2),
    carat_price DECIMAL(10, 2),
    carat_cost DECIMAL(10, 2),
    production_cost DECIMAL(10, 2),
    quote_total_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Design (
    design_id INT NOT NULL PRIMARY KEY,
    order_custom_id INT NOT NULL,
    order_id INT NOT NULL,
    description TEXT NOT NULL,
    designated_completion DATE NOT NULL,
    is_completed BIT NOT NULL,
    FOREIGN KEY (order_custom_id) REFERENCES Order_Custom_Items(order_item_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Design_Images (
    design_image_id INT NOT NULL PRIMARY KEY,
    design_id INT NOT NULL,
    image_url NVARCHAR(255) NOT NULL,
    FOREIGN KEY (design_id) REFERENCES Design(design_id)
);

CREATE TABLE Request_Images (
    request_image_id INT NOT NULL PRIMARY KEY,
    order_custom_id INT NOT NULL,
    image_url NVARCHAR(255) NOT NULL,
    FOREIGN KEY (order_custom_id) REFERENCES Order_Custom_Items(order_item_id)
);

CREATE TABLE Product_Images (
    product_image_id INT NOT NULL PRIMARY KEY,
    product_stock_id INT NOT NULL,
    image_url NVARCHAR(255) NOT NULL,
    alt TEXT,
    FOREIGN KEY (product_stock_id) REFERENCES Product_Stock(product_stock_id)
);


CREATE TABLE Shipment (
    order_id INT NOT NULL PRIMARY KEY,
    shipment_date DATE NOT NULL,
    shipping_address NVARCHAR(255) NOT NULL,
    shipping_province NVARCHAR(50) NOT NULL,
    shipping_district NVARCHAR(50) NOT NULL,
    is_shipping BIT NOT NULL,
    shipping_fee DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Review (
    review_id INT NOT NULL PRIMARY KEY,
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE Production_Status (
    production_status_id INT NOT NULL PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL
);




CREATE TABLE Production_Tracking (
    production_id INT NOT NULL PRIMARY KEY,
    product_id INT NOT NULL,
    start_date DATE NOT NULL,
    production_status_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (production_status_id) REFERENCES Production_Status(production_status_id)
);



--**NOTE: ONLY INSERT THE DATA YOU NEED, BECASUE YOUR DATABASE BE DIFFERENT FROM THIS ONE (VIEW COMMITS TO SEE CHANGES)
DROP DATABASE  JeweleryOrderProduction


-- Insert roles
INSERT INTO Roles (role_id, role_name) VALUES 
(1, 'Admin'), 
(2, 'Customer'), 
(3, 'Jeweler'),
(4, 'Supplier'),
(5, 'Designer');

-- Insert users
INSERT INTO [User] (user_id, email, phone, password, created_date, role_id) VALUES 
(1, 'admin@example.com', '1234567890', 'password', GETDATE(), 1),
(2, 'customer1@example.com', '0987654321', 'password', GETDATE(), 2),
(3, 'customer2@example.com', '1122334455', 'password', GETDATE(), 2),
(4, 'jeweler1@example.com', '2233445566', 'password', GETDATE(), 3),
(5, 'supplier1@example.com', '3344556677', 'password', GETDATE(), 4),
(6, 'designer1@example.com', '4455667788', 'password', GETDATE(), 5);

-- Insert payment status
INSERT INTO Payment_Status (payment_status_id, status_name) VALUES 
(1, 'Pending'), 
(2, 'Completed'),
(3, 'Failed'),
(4, 'Refunded'),
(5, 'Processing');

-- Insert customer details
INSERT INTO Customer_Detail (customer_id, user_id, first_name, last_name, sex, birth_date, address_line, province, district_town) VALUES 
(1, 2, 'John', 'Doe', 'Male', '1990-01-01', '123 Main St', 'Province1', 'Town1'),
(2, 3, 'Jane', 'Doe', 'Female', '1985-05-15', '456 Elm St', 'Province2', 'Town2'),
(3, 6, 'Alice', 'Smith', 'Female', '1992-03-22', '789 Oak St', 'Province3', 'Town3'),
(4, 4, 'Bob', 'Brown', 'Male', '1978-07-30', '101 Pine St', 'Province4', 'Town4'),
(5, 5, 'Carol', 'White', 'Female', '1980-11-11', '202 Maple St', 'Province5', 'Town5');

-- Insert product types
INSERT INTO Product_Types (product_type_id, type_name) VALUES 
(1, 'Ring'), 
(2, 'Necklace'),
(3, 'Earrings'),
(4, 'Bracelet'),
(5, 'Pendant');

-- Insert metals
INSERT INTO Metals (metal_id, metal_type_name) VALUES 
(1, 'Gold'), 
(2, 'Silver'),
(3, 'Platinum'),
(4, 'Titanium'),
(5, 'Palladium');

-- Insert products
INSERT INTO Product (product_id, product_type_id, product_name, product_description, inStock) VALUES 
(1, 1, 'Gold Ring', 'A beautiful gold ring', 1),
(2, 2, 'Silver Necklace', 'A shiny silver necklace', 1),
(3, 3, 'Platinum Earrings', 'Elegant platinum earrings', 0),
(4, 4, 'Titanium Bracelet', 'Durable titanium bracelet', 1),
(5, 5, 'Palladium Pendant', 'Stylish palladium pendant', 1);

-- Insert gemstones
INSERT INTO Gemstone (gemstone_id, gemstone_type, gemstone_carat, color) VALUES 
(1, 'Diamond', 1, 'Clear'),
(2, 'Ruby', 2, 'Red'),
(3, 'Sapphire', 3, 'Blue'),
(4, 'Emerald', 4, 'Green'),
(5, 'Amethyst', 5, 'Purple');

-- Insert product stock
INSERT INTO Product_Stock (product_stock_id, product_id, gemstone_id, metal_id, size, stock_quantity, price, gallery_url) VALUES 
(1, 1, 1, 1, 6, 10, 500.00, 'http://example.com/gold_ring.jpg'),
(2, 2, 2, 2, 18, 5, 300.00, 'http://example.com/silver_necklace.jpg'),
(3, 3, 3, 3, NULL, 0, 700.00, 'http://example.com/platinum_earrings.jpg'),
(4, 4, 4, 4, 7, 15, 200.00, 'http://example.com/titanium_bracelet.jpg'),
(5, 5, 5, 5, 9, 8, 400.00, 'http://example.com/palladium_pendant.jpg');

-- Insert statuses
INSERT INTO Status (status_id, status_detail) VALUES 
(1, 'Ordered'), 
(2, 'Processed'),
(3, 'Shipped'),
(4, 'Delivered'),
(5, 'Returned');

-- Insert orders
INSERT INTO Orders (order_id, customer_id, order_date, order_status, payment_status_id, is_shipment, is_custom, order_total) VALUES 
(1, 1, GETDATE(), 'Ordered', 1, 1, 0, 500.00),
(2, 2, GETDATE(), 'Processed', 2, 1, 0, 300.00),
(3, 3, GETDATE(), 'Shipped', 3, 1, 1, 700.00),
(4, 4, GETDATE(), 'Delivered', 4, 0, 1, 200.00),
(5, 5, GETDATE(), 'Returned', 5, 0, 0, 400.00);

-- Insert order fixed items
INSERT INTO Order_Fixed_Items (order_fixed_item_id, order_id, product_stock_id, quantity, unit_price, subtotal) VALUES 
(1, 1, 1, 1, 500.00, 500.00),
(2, 2, 2, 1, 300.00, 300.00),
(3, 3, 3, 1, 700.00, 700.00),
(4, 4, 4, 1, 200.00, 200.00),
(5, 5, 5, 1, 400.00, 400.00);

-- Insert order custom items
INSERT INTO Order_Custom_Items (order_item_id, order_id, gemstone_id, metal_id, size, quantity, subtotal) VALUES 
(1, 4, 1, 1, 6, 1, 600.00),
(2, 5, 2, 2, 7, 1, 700.00),
(3, 1, 3, 3, 8, 1, 800.00),
(4, 2, 4, 4, 9, 1, 900.00),
(5, 3, 5, 5, 10, 1, 1000.00);

-- Insert transactions
INSERT INTO Transactions (transaction_id, order_id, transaction_date, transaction_total, payment_type, is_deposit) VALUES 
(1, 1, GETDATE(), 500.00, 'Credit Card', 0),
(2, 2, GETDATE(), 300.00, 'PayPal', 1),
(3, 3, GETDATE(), 700.00, 'Credit Card', 0),
(4, 4, GETDATE(), 200.00, 'Debit Card', 0),
(5, 5, GETDATE(), 400.00, 'Bank Transfer', 1);

-- Insert quotes
INSERT INTO Quote (quote_id, order_id, created_date, metal_weight, metal_cost, carat_price, carat_cost, production_cost, quote_total_price) VALUES 
(1, 1, GETDATE(), 5.0, 100.00, 200.00, 400.00, 100.00, 600.00),
(2, 2, GETDATE(), 6.0, 120.00, 220.00, 440.00, 110.00, 660.00),
(3, 3, GETDATE(), 7.0, 140.00, 240.00, 480.00, 120.00, 720.00),
(4, 4, GETDATE(), 8.0, 160.00, 260.00, 520.00, 130.00, 780.00),
(5, 5, GETDATE(), 9.0, 180.00, 280.00, 560.00, 140.00, 840.00);

-- Insert designs
INSERT INTO Design (design_id, order_custom_id, order_id, description, designated_completion, is_completed) VALUES 
(1, 1, 4, 'Custom gold ring with diamond', '2024-12-01', 0),
(2, 2, 5, 'Custom silver necklace with ruby', '2024-12-02', 0),
(3, 3, 1, 'Custom platinum earrings with sapphire', '2024-12-03', 0),
(4, 4, 2, 'Custom titanium bracelet with emerald
keep generating

ChatGPT
Certainly! Let's continue generating mock data for the remaining tables:

sql
Copy code
-- Insert more designs
INSERT INTO Design (design_id, order_custom_id, order_id, description, designated_completion, is_completed) VALUES 
(5, 5, 3, 'Custom palladium pendant with amethyst', '2024-12-04', 0),
(6, 1, 5, 'Custom gold ring with diamond', '2024-12-05', 0),
(7, 2, 1, 'Custom silver necklace with ruby', '2024-12-06', 0),
(8, 3, 2, 'Custom platinum earrings with sapphire', '2024-12-07', 0),
(9, 4, 3, 'Custom titanium bracelet with emerald', '2024-12-08', 0);

-- Insert design images
INSERT INTO Design_Images (design_image_id, design_id, image_url) VALUES 
(1, 1, 'http://example.com/design1.jpg'),
(2, 2, 'http://example.com/design2.jpg'),
(3, 3, 'http://example.com/design3.jpg'),
(4, 4, 'http://example.com/design4.jpg'),
(5, 5, 'http://example.com/design5.jpg'),
(6, 6, 'http://example.com/design6.jpg'),
(7, 7, 'http://example.com/design7.jpg'),
(8, 8, 'http://example.com/design8.jpg'),
(9, 9, 'http://example.com/design9.jpg');

-- Insert request images
INSERT INTO Request_Images (request_image_id, order_custom_id, image_url) VALUES 
(1, 1, 'http://example.com/request1.jpg'),
(2, 2, 'http://example.com/request2.jpg'),
(3, 3, 'http://example.com/request3.jpg'),
(4, 4, 'http://example.com/request4.jpg'),
(5, 5, 'http://example.com/request5.jpg');

-- Insert product images
INSERT INTO Product_Images (product_image_id, product_stock_id, image_url, alt) VALUES 
(1, 1, 'http://example.com/product1.jpg', 'Gold Ring'),
(2, 2, 'http://example.com/product2.jpg', 'Silver Necklace'),
(3, 3, 'http://example.com/product3.jpg', 'Platinum Earrings'),
(4, 4, 'http://example.com/product4.jpg', 'Titanium Bracelet'),
(5, 5, 'http://example.com/product5.jpg', 'Palladium Pendant');

-- Insert shipments
INSERT INTO Shipment (order_id, shipment_date, shipping_address, shipping_province, shipping_district, is_shipping, shipping_fee) VALUES 
(1, '2024-05-30', '123 Shipping St', 'Province1', 'Town1', 1, 10.00),
(2, '2024-05-31', '456 Delivery St', 'Province2', 'Town2', 1, 12.00),
(3, '2024-06-01', '789 Shipment St', 'Province3', 'Town3', 1, 15.00),
(4, '2024-06-02', '101 Transport St', 'Province4', 'Town4', 1, 20.00),
(5, '2024-06-03', '202 Freight St', 'Province5', 'Town5', 1, 18.00);

-- Insert reviews
INSERT INTO Review (review_id, product_id, rating, comment) VALUES 
(1, 1, 4, 'Great ring, excellent quality!'),
(2, 2, 5, 'Beautiful necklace, exceeded my expectations!'),
(3, 3, 3, 'Earrings are nice, but a bit pricey.'),
(4, 4, 2, 'Bracelet broke after a few uses, not durable.'),
(5, 5, 5, 'Love the pendant, exactly what I wanted!');

-- Insert production statuses
INSERT INTO Production_Status (production_status_id, status_name) VALUES 
(1, 'Pending'), 
(2, 'In Progress'),
(3, 'Completed'),
(4, 'On Hold'),
(5, 'Cancelled');

-- Insert production tracking
INSERT INTO Production_Tracking (production_id, product_id, start_date, production_status_id) VALUES 
(1, 1, '2024-05-25', 2),
(2, 2, '2024-05-26', 2),
(3, 3, '2024-05-27', 1),
(4, 4, '2024-05-28', 1),
(5, 5, '2024-05-29', 3);


