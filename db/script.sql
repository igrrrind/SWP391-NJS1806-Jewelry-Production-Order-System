
CREATE DATABASE JeweleryOrderProduction

CREATE TABLE Roles (
    role_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    role_name NVARCHAR(50) NOT NULL,
    UNIQUE (role_name)
);

CREATE TABLE [User] ( 
    uid NVARCHAR(50) NOT NULL PRIMARY KEY, -- Changed from string to NVARCHAR(50)
    email NVARCHAR(50) NOT NULL,
    phone NVARCHAR(50) NOT NULL,
    first_name NVARCHAR(35) NOT NULL,
    last_name NVARCHAR(35) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id),
    UNIQUE (email),
    UNIQUE (phone)
);

CREATE TABLE Payment_Status (
    payment_status_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    status_name VARCHAR(50) NOT NULL
);

CREATE TABLE Customer_Detail (
    customer_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    uid NVARCHAR(50) NOT NULL,
    sex NVARCHAR(10) NOT NULL,
    birth_date DATE NOT NULL,
    address_line NVARCHAR(50) NOT NULL,
    province NVARCHAR(50) NOT NULL,
    district_town NVARCHAR(50) NOT NULL,
    FOREIGN KEY (uid) REFERENCES [User](uid),
    UNIQUE (uid)
);

CREATE TABLE Product_Types (
    product_type_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    type_name NVARCHAR(50) NOT NULL,
    UNIQUE (type_name)
);

CREATE TABLE Metals (
    metal_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    metal_type_name NVARCHAR(50) NOT NULL,
    UNIQUE (metal_type_name)
);

CREATE TABLE Product (
    product_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    product_type_id INT NOT NULL,
    product_name NVARCHAR(50) NOT NULL,
    product_description TEXT,
    isActive BIT,
    FOREIGN KEY (product_type_id) REFERENCES Product_Types(product_type_id),
    UNIQUE (product_name)
);

CREATE TABLE Gemstone (
    gemstone_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    gemstone_type NVARCHAR(50) NOT NULL,
    gemstone_carat INT NOT NULL,
    color NVARCHAR(50),
    UNIQUE (gemstone_type, gemstone_carat, color)
);

CREATE TABLE Product_Stock (
    product_stock_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    product_id INT NOT NULL,
    gemstone_id INT NOT NULL,
    metal_id INT NOT NULL,
    size INT,
    stock_quantity INT,
    price DECIMAL(10, 2) NOT NULL,
    gallery_url NVARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (gemstone_id) REFERENCES Gemstone(gemstone_id),
    FOREIGN KEY (metal_id) REFERENCES Metals(metal_id),
    UNIQUE (product_id, gemstone_id, metal_id, size)
);

CREATE TABLE Status (
    status_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    status_detail NVARCHAR(50) NOT NULL,
    UNIQUE (status_detail)
);

CREATE TABLE Orders (
    order_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    status_id INT NOT NULL,
    payment_status_id INT NOT NULL,
    is_shipment BIT NOT NULL,
    is_custom BIT NOT NULL,
    order_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer_Detail(customer_id),
    FOREIGN KEY (payment_status_id) REFERENCES Payment_Status(payment_status_id),
    FOREIGN KEY (status_id) REFERENCES [Status](status_id)
);



CREATE TABLE Order_Fixed_Items (
    order_fixed_item_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    order_id INT NOT NULL,
    product_stock_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_stock_id) REFERENCES Product_Stock(product_stock_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    UNIQUE (order_id, product_stock_id)
);

CREATE TABLE Order_Custom_Items (
    order_item_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    order_id INT NOT NULL,
    product_type_id INT NOT NULL,
    gemstone_id INT NOT NULL,
    metal_id INT NOT NULL,
    size INT,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    request_description NVARCHAR(MAX) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_type_id) REFERENCES Product_Types(product_type_id),
    FOREIGN KEY (gemstone_id) REFERENCES Gemstone(gemstone_id),
    FOREIGN KEY (metal_id) REFERENCES Metals(metal_id),
    UNIQUE (order_id, product_type_id, gemstone_id, metal_id, size)
);


CREATE TABLE Transactions (
    transaction_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    order_id INT NOT NULL,
    transaction_date DATE NOT NULL,
    transaction_total DECIMAL(10, 2) NOT NULL,
    payment_type NVARCHAR(50),
    is_deposit BIT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Quote (
    quote_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
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
    design_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    order_custom_id INT NOT NULL,
    order_id INT NOT NULL,
    description TEXT NOT NULL,
    designated_completion DATE,
    is_completed BIT NOT NULL,
    FOREIGN KEY (order_custom_id) REFERENCES Order_Custom_Items(order_item_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Design_Images (
    design_image_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    design_id INT NOT NULL,
    image_url NVARCHAR(255),
    FOREIGN KEY (design_id) REFERENCES Design(design_id)
);

/*
CREATE TABLE Request (
    request_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    order_id INT NOT NULL,    
    order_custom_id INT,
    request_description NVARCHAR(MAX) NOT NULL,
    FOREIGN KEY (order_custom_id) REFERENCES Order_Custom_Items(order_item_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)    
)
*/

CREATE TABLE Product_Images (
    product_image_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    product_stock_id INT NOT NULL,
    image_url NVARCHAR(255),
    alt TEXT,
    FOREIGN KEY (product_stock_id) REFERENCES Product_Stock(product_stock_id)
);

CREATE TABLE Shipment (
    shipment_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    order_id INT NOT NULL,
    shipment_date DATE NOT NULL,
    shipping_address NVARCHAR(255) NOT NULL,
    shipping_province NVARCHAR(50) NOT NULL,
    shipping_district NVARCHAR(50) NOT NULL,
    is_shipping BIT NOT NULL,
    shipping_fee DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

CREATE TABLE Review (
    review_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE Production_Status (
    production_status_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    status_name VARCHAR(50) NOT NULL
);


CREATE TABLE Production_Tracking (
    production_id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    order_id INT NOT NULL,
    start_date DATE NOT NULL,
    production_status_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (production_status_id) REFERENCES Production_Status(production_status_id)
);





--**NOTE: ONLY INSERT THE DATA YOU NEED, BECASUE YOUR DATABASE BE DIFFERENT FROM THIS ONE (VIEW COMMITS TO SEE CHANGES)
DROP DATABASE  JeweleryOrderProduction


-- Inserting into Roles
INSERT INTO Roles (role_name) VALUES ('Admin');
INSERT INTO Roles (role_name) VALUES ('Customer');
INSERT INTO Roles (role_name) VALUES ('Manager');
INSERT INTO Roles (role_name) VALUES ('Staff');
INSERT INTO Roles (role_name) VALUES ('Guest');

-- Inserting into User
INSERT INTO [User] (uid, email, phone, first_name, last_name, role_id) VALUES ('U001', 'user1@example.com', '1234567890', 'John', 'Doe', 1);
INSERT INTO [User] (uid, email, phone, first_name, last_name, role_id) VALUES ('U002', 'user2@example.com', '0987654321', 'Jane', 'Smith', 2);
INSERT INTO [User] (uid, email, phone, first_name, last_name, role_id) VALUES ('U003', 'user3@example.com', '5551234567', 'Bob', 'Brown', 3);
INSERT INTO [User] (uid, email, phone, first_name, last_name, role_id) VALUES ('U004', 'user4@example.com', '7778889999', 'Alice', 'Johnson', 4);
INSERT INTO [User] (uid, email, phone, first_name, last_name, role_id) VALUES ('U005', 'user5@example.com', '3334445555', 'Charlie', 'Williams', 5);

-- Inserting into Payment_Status
INSERT INTO Payment_Status (status_name) VALUES ('Pending');
INSERT INTO Payment_Status (status_name) VALUES ('Completed');
INSERT INTO Payment_Status (status_name) VALUES ('Failed');
INSERT INTO Payment_Status (status_name) VALUES ('Refunded');
INSERT INTO Payment_Status (status_name) VALUES ('Cancelled');

-- Inserting into Customer_Detail
INSERT INTO Customer_Detail (uid, sex, birth_date, address_line, province, district_town) VALUES ('U001', 'Male', '1985-01-01', '123 Main St', 'Some Province', 'Some District');
INSERT INTO Customer_Detail (uid, sex, birth_date, address_line, province, district_town) VALUES ('U002', 'Female', '1990-02-02', '456 Oak St', 'Another Province', 'Another District');
INSERT INTO Customer_Detail (uid, sex, birth_date, address_line, province, district_town) VALUES ('U003', 'Male', '1975-03-03', '789 Pine St', 'Different Province', 'Different District');
INSERT INTO Customer_Detail (uid, sex, birth_date, address_line, province, district_town) VALUES ('U004', 'Female', '1988-04-04', '101 Maple St', 'Yet Another Province', 'Yet Another District');
INSERT INTO Customer_Detail (uid, sex, birth_date, address_line, province, district_town) VALUES ('U005', 'Male', '2000-05-05', '202 Birch St', 'New Province', 'New District');

-- Inserting into Product_Types
INSERT INTO Product_Types (type_name) VALUES ('Ring');
INSERT INTO Product_Types (type_name) VALUES ('Necklace');
INSERT INTO Product_Types (type_name) VALUES ('Bracelet');
INSERT INTO Product_Types (type_name) VALUES ('Earring');
INSERT INTO Product_Types (type_name) VALUES ('Watch');

-- Inserting into Metals
INSERT INTO Metals (metal_type_name) VALUES ('Gold');
INSERT INTO Metals (metal_type_name) VALUES ('Silver');
INSERT INTO Metals (metal_type_name) VALUES ('Platinum');
INSERT INTO Metals (metal_type_name) VALUES ('Titanium');
INSERT INTO Metals (metal_type_name) VALUES ('Palladium');

-- Inserting into Product
INSERT INTO Product (product_type_id, product_name, product_description, isActive) VALUES (1, 'Gold Ring', 'A beautiful gold ring.', 1);
INSERT INTO Product (product_type_id, product_name, product_description, isActive) VALUES (2, 'Silver Necklace', 'A shiny silver necklace.', 1);
INSERT INTO Product (product_type_id, product_name, product_description, isActive) VALUES (3, 'Platinum Bracelet', 'An elegant platinum bracelet.', 1);
INSERT INTO Product (product_type_id, product_name, product_description, isActive) VALUES (4, 'Titanium Earring', 'A sleek titanium earring.', 1);
INSERT INTO Product (product_type_id, product_name, product_description, isActive) VALUES (5, 'Palladium Watch', 'A stylish palladium watch.', 1);

-- Inserting into Gemstone
INSERT INTO Gemstone (gemstone_type, gemstone_carat, color) VALUES ('Diamond', 1, 'White');
INSERT INTO Gemstone (gemstone_type, gemstone_carat, color) VALUES ('Ruby', 2, 'Red');
INSERT INTO Gemstone (gemstone_type, gemstone_carat, color) VALUES ('Sapphire', 3, 'Blue');
INSERT INTO Gemstone (gemstone_type, gemstone_carat, color) VALUES ('Emerald', 1, 'Green');
INSERT INTO Gemstone (gemstone_type, gemstone_carat, color) VALUES ('Topaz', 2, 'Yellow');

-- Inserting into Product_Stock
INSERT INTO Product_Stock (product_id, gemstone_id, metal_id, size, stock_quantity, price, gallery_url) VALUES (1, 1, 1, 6, 10, 500.00, 'http://example.com/gallery1.jpg');
INSERT INTO Product_Stock (product_id, gemstone_id, metal_id, size, stock_quantity, price, gallery_url) VALUES (2, 2, 2, 7, 20, 1000.00, 'http://example.com/gallery2.jpg');
INSERT INTO Product_Stock (product_id, gemstone_id, metal_id, size, stock_quantity, price, gallery_url) VALUES (3, 3, 3, 8, 15, 1500.00, 'http://example.com/gallery3.jpg');
INSERT INTO Product_Stock (product_id, gemstone_id, metal_id, size, stock_quantity, price, gallery_url) VALUES (4, 4, 4, 9, 25, 2000.00, 'http://example.com/gallery4.jpg');
INSERT INTO Product_Stock (product_id, gemstone_id, metal_id, size, stock_quantity, price, gallery_url) VALUES (5, 5, 5, 10, 30, 2500.00, 'http://example.com/gallery5.jpg');

-- Inserting into Status
INSERT INTO Status (status_detail) VALUES ('Processing');
INSERT INTO Status (status_detail) VALUES ('Shipped');
INSERT INTO Status (status_detail) VALUES ('Delivered');
INSERT INTO Status (status_detail) VALUES ('Cancelled');
INSERT INTO Status (status_detail) VALUES ('Returned');

-- Inserting into Orders
INSERT INTO Orders (customer_id, order_date, status_id, payment_status_id, is_shipment, is_custom, order_total) VALUES (1, '2023-01-01', 1, 1, 1, 0, 600.00);
INSERT INTO Orders (customer_id, order_date, status_id, payment_status_id, is_shipment, is_custom, order_total) VALUES (2, '2023-02-02', 1, 2, 1, 1, 1100.00);
INSERT INTO Orders (customer_id, order_date, status_id, payment_status_id, is_shipment, is_custom, order_total) VALUES (3, '2023-03-03', 2, 2, 1, 0, 1600.00);
INSERT INTO Orders (customer_id, order_date, status_id, payment_status_id, is_shipment, is_custom, order_total) VALUES (4, '2023-04-04', 3, 3, 0, 1, 2100.00);
INSERT INTO Orders (customer_id, order_date, status_id, payment_status_id, is_shipment, is_custom, order_total) VALUES (5, '2023-05-05', 4, 4, 0, 0, 2600.00);

-- Inserting into Order_Fixed_Items
INSERT INTO Order_Fixed_Items (order_id, product_stock_id, product_id, quantity, unit_price, subtotal) VALUES (1, 1, 1, 1, 500.00, 500.00);
INSERT INTO Order_Fixed_Items (order_id, product_stock_id, product_id, quantity, unit_price, subtotal) VALUES (2, 2, 2, 1, 1000.00, 1000.00);
INSERT INTO Order_Fixed_Items (order_id, product_stock_id, product_id, quantity, unit_price, subtotal) VALUES (3, 3, 3, 1, 1500.00, 1500.00);
INSERT INTO Order_Fixed_Items (order_id, product_stock_id, product_id, quantity, unit_price, subtotal) VALUES (4, 4, 4, 1, 2000.00, 2000.00);
INSERT INTO Order_Fixed_Items (order_id, product_stock_id, product_id, quantity, unit_price, subtotal) VALUES (5, 5, 5, 1, 2500.00, 2500.00);

-- Inserting into Order_Custom_Items
INSERT INTO Order_Custom_Items (order_id, product_type_id, gemstone_id, metal_id, size, unit_price, quantity, request_description, subtotal) 
VALUES (1, 1, 1, 1, 6, 500.00, 1, 'Custom ring with diamond', 500.00);

INSERT INTO Order_Custom_Items (order_id, product_type_id, gemstone_id, metal_id, size, unit_price, quantity, request_description, subtotal) 
VALUES (2, 2, 2, 2, 7, 1000.00, 1, 'Custom necklace with emerald', 1000.00);

INSERT INTO Order_Custom_Items (order_id, product_type_id, gemstone_id, metal_id, size, unit_price, quantity, request_description, subtotal) 
VALUES (3, 3, 3, 3, 8, 1500.00, 1, 'Custom bracelet with sapphire', 1500.00);

INSERT INTO Order_Custom_Items (order_id, product_type_id, gemstone_id, metal_id, size, unit_price, quantity, request_description, subtotal) 
VALUES (4, 4, 4, 4, 9, 2000.00, 1, 'Custom earrings with ruby', 2000.00);

INSERT INTO Order_Custom_Items (order_id, product_type_id, gemstone_id, metal_id, size, unit_price, quantity, request_description, subtotal) 
VALUES (5, 5, 5, 5, 10, 2500.00, 1, 'Custom pendant with amethyst', 2500.00);

-- Inserting into Transactions
INSERT INTO Transactions (order_id, transaction_date, transaction_total, payment_type, is_deposit) VALUES (1, '2023-01-02', 500.00, 'Credit Card', 0);
INSERT INTO Transactions (order_id, transaction_date, transaction_total, payment_type, is_deposit) VALUES (2, '2023-02-03', 1000.00, 'PayPal', 1);
INSERT INTO Transactions (order_id, transaction_date, transaction_total, payment_type, is_deposit) VALUES (3, '2023-03-04', 1500.00, 'Bank Transfer', 0);
INSERT INTO Transactions (order_id, transaction_date, transaction_total, payment_type, is_deposit) VALUES (4, '2023-04-05', 2000.00, 'Cash', 1);
INSERT INTO Transactions (order_id, transaction_date, transaction_total, payment_type, is_deposit) VALUES (5, '2023-05-06', 2500.00, 'Credit Card', 0);

-- Inserting into Quote
INSERT INTO Quote (order_id, created_date, metal_weight, metal_cost, carat_price, carat_cost, production_cost, quote_total_price) VALUES (1, '2023-01-03', 10.0, 100.0, 200.0, 300.0, 50.0, 650.0);
INSERT INTO Quote (order_id, created_date, metal_weight, metal_cost, carat_price, carat_cost, production_cost, quote_total_price) VALUES (2, '2023-02-04', 20.0, 200.0, 400.0, 600.0, 100.0, 1300.0);
INSERT INTO Quote (order_id, created_date, metal_weight, metal_cost, carat_price, carat_cost, production_cost, quote_total_price) VALUES (3, '2023-03-05', 30.0, 300.0, 600.0, 900.0, 150.0, 1950.0);
INSERT INTO Quote (order_id, created_date, metal_weight, metal_cost, carat_price, carat_cost, production_cost, quote_total_price) VALUES (4, '2023-04-06', 40.0, 400.0, 800.0, 1200.0, 200.0, 2600.0);
INSERT INTO Quote (order_id, created_date, metal_weight, metal_cost, carat_price, carat_cost, production_cost, quote_total_price) VALUES (5, '2023-05-07', 50.0, 500.0, 1000.0, 1500.0, 250.0, 3250.0);

-- Inserting into Design
INSERT INTO Design (order_custom_id, order_id, description, designated_completion, is_completed) VALUES (1, 1, 'Design for custom ring', '2023-02-01', 0);
INSERT INTO Design (order_custom_id, order_id, description, designated_completion, is_completed) VALUES (2, 2, 'Design for custom necklace', '2023-03-01', 0);
INSERT INTO Design (order_custom_id, order_id, description, designated_completion, is_completed) VALUES (3, 3, 'Design for custom bracelet', '2023-04-01', 0);
INSERT INTO Design (order_custom_id, order_id, description, designated_completion, is_completed) VALUES (4, 4, 'Design for custom earring', '2023-05-01', 0);
INSERT INTO Design (order_custom_id, order_id, description, designated_completion, is_completed) VALUES (5, 5, 'Design for custom watch', '2023-06-01', 0);

-- Inserting into Design_Images
INSERT INTO Design_Images (design_id, image_url) VALUES (1, 'http://example.com/design1.jpg');
INSERT INTO Design_Images (design_id, image_url) VALUES (2, 'http://example.com/design2.jpg');
INSERT INTO Design_Images (design_id, image_url) VALUES (3, 'http://example.com/design3.jpg');
INSERT INTO Design_Images (design_id, image_url) VALUES (4, 'http://example.com/design4.jpg');
INSERT INTO Design_Images (design_id, image_url) VALUES (5, 'http://example.com/design5.jpg');

-- Inserting into Product_Images
INSERT INTO Product_Images (product_stock_id, image_url, alt) VALUES (1, 'http://example.com/product1.jpg', 'Gold Ring');
INSERT INTO Product_Images (product_stock_id, image_url, alt) VALUES (2, 'http://example.com/product2.jpg', 'Silver Necklace');
INSERT INTO Product_Images (product_stock_id, image_url, alt) VALUES (3, 'http://example.com/product3.jpg', 'Platinum Bracelet');
INSERT INTO Product_Images (product_stock_id, image_url, alt) VALUES (4, 'http://example.com/product4.jpg', 'Titanium Earring');
INSERT INTO Product_Images (product_stock_id, image_url, alt) VALUES (5, 'http://example.com/product5.jpg', 'Palladium Watch');

-- Inserting into Shipment
INSERT INTO Shipment (order_id, shipment_date, shipping_address, shipping_province, shipping_district, is_shipping, shipping_fee) VALUES (1, '2023-01-10', '123 Main St', 'Some Province', 'Some District', 1, 20.00);
INSERT INTO Shipment (order_id, shipment_date, shipping_address, shipping_province, shipping_district, is_shipping, shipping_fee) VALUES (2, '2023-02-15', '456 Oak St', 'Another Province', 'Another District', 1, 25.00);
INSERT INTO Shipment (order_id, shipment_date, shipping_address, shipping_province, shipping_district, is_shipping, shipping_fee) VALUES (3, '2023-03-20', '789 Pine St', 'Different Province', 'Different District', 1, 30.00);
INSERT INTO Shipment (order_id, shipment_date, shipping_address, shipping_province, shipping_district, is_shipping, shipping_fee) VALUES (4, '2023-04-25', '101 Maple St', 'Yet Another Province', 'Yet Another District', 1, 35.00);
INSERT INTO Shipment (order_id, shipment_date, shipping_address, shipping_province, shipping_district, is_shipping, shipping_fee) VALUES (5, '2023-05-30', '202 Birch St', 'New Province', 'New District', 1, 40.00);

-- Inserting into Review
INSERT INTO Review (product_id, rating, comment) VALUES (1, 5, 'Excellent product!');
INSERT INTO Review (product_id, rating, comment) VALUES (2, 4, 'Very good necklace.');
INSERT INTO Review (product_id, rating, comment) VALUES (3, 3, 'Average bracelet.');
INSERT INTO Review (product_id, rating, comment) VALUES (4, 2, 'Not satisfied with the earring.');
INSERT INTO Review (product_id, rating, comment) VALUES (5, 1, 'Poor quality watch.');

-- Inserting into Production_Status
INSERT INTO Production_Status (status_name) VALUES ('Started');
INSERT INTO Production_Status (status_name) VALUES ('In Progress');
INSERT INTO Production_Status (status_name) VALUES ('Completed');
INSERT INTO Production_Status (status_name) VALUES ('Delayed');
INSERT INTO Production_Status (status_name) VALUES ('On Hold');

-- Inserting into Production_Tracking
INSERT INTO Production_Tracking (order_id, start_date, production_status_id) VALUES (1, '2023-01-05', 1);
INSERT INTO Production_Tracking (order_id, start_date, production_status_id) VALUES (2, '2023-02-10', 2);
INSERT INTO Production_Tracking (order_id, start_date, production_status_id) VALUES (3, '2023-03-15', 3);
INSERT INTO Production_Tracking (order_id, start_date, production_status_id) VALUES (4, '2023-04-20', 4);
INSERT INTO Production_Tracking (order_id, start_date, production_status_id) VALUES (5, '2023-05-25', 5);
