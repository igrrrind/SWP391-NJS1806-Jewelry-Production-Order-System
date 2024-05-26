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
    payment_status NVARCHAR(50) NOT NULL,
    is_shipment BIT NOT NULL,
    is_custom BIT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer_Detail(customer_id)
);

CREATE TABLE Order_Fixed_Items (
    order_fixed_item_id INT NOT NULL PRIMARY KEY,
    order_id INT NOT NULL,
    product_stock_id INT NOT NULL,
    order_date DATE NOT NULL,
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
    gallery_url NVARCHAR(255) NOT NULL,
    alt TEXT,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
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
    FOREIGN KEY (status_id) REFERENCES Production_Status(production_status_id)
);
