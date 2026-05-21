DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id PRIMARY_KEY,
    productName VARCHAR(255),
    productDesc VARCHAR(255),
    productType VARCHAR(50),
    producePrice DECIMAL(10, 2),
    image_url VARCHAR(255)
);