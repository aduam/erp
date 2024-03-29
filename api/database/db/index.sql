CREATE TABLE roles (
  id SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(256),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP
);

CREATE TABLE organizations (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  business_name VARCHAR(256) NOT NULL,
  social_reason VARCHAR(256) NOT NULL,
  nit VARCHAR(10) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(25) NOT NULL,
  mobile VARCHAR(25) NOT NULL,
  photo VARCHAR(256),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP
);

CREATE TABLE markets (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  business_name VARCHAR(256),
  social_reason VARCHAR(256),
  nit VARCHAR(10),
  address TEXT NOT NULL,
  phone VARCHAR(25) NOT NULL,
  mobile VARCHAR(25) NOT NULL,
  photo VARCHAR(256),
  id_organization INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_organization) REFERENCES organizations(id)
);

CREATE TABLE collaborators (
  id SERIAL NOT NULL PRIMARY KEY,
  names VARCHAR(250) NOT NULL,
  surnames VARCHAR(250) NOT NULL,
  identification VARCHAR(15) NOT NULL,
  profile_photo VARCHAR(256),
  active BOOLEAN NOT NULL,
  id_role INTEGER NOT NULL,
  id_market INTEGER,
  id_organization INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_role) REFERENCES roles (id),
  FOREIGN KEY (id_market) REFERENCES markets (id),
  FOREIGN KEY (id_organization) REFERENCES organizations(id)
);

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(256) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id) REFERENCES collaborators (id)
);

CREATE TABLE type_products (
  id SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  id_organization INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_organization) REFERENCES organizations(id)
);

CREATE TABLE providers (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  description TEXT,
  business_name VARCHAR(256),
  social_reason VARCHAR(256),
  nit VARCHAR(10),
  address TEXT,
  phone VARCHAR(25),
  mobile VARCHAR(25),
  photo VARCHAR(256),
  id_organization INTEGER NOT NULL,
  id_market INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_organization) REFERENCES organizations(id),
  FOREIGN KEY (id_market) REFERENCES markets(id)
);

CREATE TABLE products (
  id SERIAL NOT NULL PRIMARY KEY,
  code VARCHAR(50),
  title VARCHAR(100),
  description TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL,
  --base_price NUMERIC(15,2) NOT NULL,
  --price NUMERIC(15,2),
  --gain NUMERIC(15,2),
  id_type_product INTEGER NOT NULL,
  --id_provider INTEGER NOT NULL,
  id_organization INTEGER NOT NULL,
  id_market INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_type_product) REFERENCES type_products(id),
  --FOREIGN KEY (id_provider) REFERENCES providers(id),
  FOREIGN KEY (id_organization) REFERENCES organizations(id),
  FOREIGN KEY (id_market) REFERENCES markets(id)
);

CREATE TABLE status (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR(20) NOT NULL,
  description TEXT
);

CREATE TABLE shoppings (
  id SERIAL NOT NULL PRIMARY KEY,
  recipe VARCHAR(50) NOT NULL,
  id_market INTEGER,
  id_status INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_market) REFERENCES markets(id),
  FOREIGN KEY (id_status) REFERENCES status(id)
);

CREATE TABLE shoppings_products (
  id SERIAL NOT NULL PRIMARY KEY,
  amount INTEGER NOT NULL,
  price NUMERIC(15,2) NOT NULL,
  id_product INTEGER NOT NULL,
  id_shopping INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_shopping) REFERENCES shoppings(id),
  FOREIGN KEY (id_product) REFERENCES products(id)
);

CREATE TABLE customers (
  id SERIAL NOT NULL PRIMARY KEY,
  names VARCHAR(250),
  surnames VARCHAR(250),
  nit VARCHAR(15) NOT NULL,
  profile_photo VARCHAR(256),
  address TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP
);

CREATE TABLE sales (
  id SERIAL NOT NULL PRIMARY KEY,
  id_customer INTEGER,
  id_status INTEGER NOT NULL,
  id_market INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_customer) REFERENCES customers(id),
  FOREIGN KEY (id_status) REFERENCES status(id),
  FOREIGN KEY (id_market) REFERENCES markets(id)
);

CREATE TABLE sales_products (
  id SERIAL NOT NULL PRIMARY KEY,
  amount INTEGER NOT NULL,
  price NUMERIC(15,2) NOT NULL,
  id_product INTEGER NOT NULL,
  id_sale INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_sale) REFERENCES sales(id),
  FOREIGN KEY (id_product) REFERENCES products(id)
);

CREATE OR REPLACE FUNCTION adjust_products_shopping()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
    stocks integer;
BEGIN
	stocks := stock from products where id = NEW.id_product;
	UPDATE products set stock = (stocks + NEW.amount) WHERE id = NEW.id_product;
	RETURN NEW;
END;
$$

CREATE TRIGGER update_products_shopping
  AFTER INSERT ON shoppings_products
  FOR EACH ROW
  EXECUTE PROCEDURE adjust_products_shopping();


insert into status (id, title) values (1, 'Aprobado');
insert into status (id, title) values (2, 'Anulado');

ALTER TABLE customers ADD COLUMN phone varchar(25);

CREATE TABLE accounts (
  id SERIAL NOT NULL PRIMARY KEY,
  term INTEGER NOT NULL,
  interest NUMERIC(3) NOT NULL,
  amount NUMERIC(9, 2) NOT NULL,
  debit NUMERIC(9,2) NOT NULL DEFAULT 0,
  id_customer INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_customer) REFERENCES customers(id)
);

CREATE TABLE projection_fees (
  id SERIAL NOT NULL PRIMARY KEY,
  amount NUMERIC(9, 2) NOT NULL,
  due_date NUMERIC(13) NOT NULL,
  paid NUMERIC(9, 2),
  id_account INTEGER NOT NULL,
  FOREIGN KEY (id_account) REFERENCES accounts(id)
);

CREATE TABLE paids (
  id SERIAL NOT NULL PRIMARY KEY,
  id_account INTEGER NOT NULL,
  amount NUMERIC(9, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_account) REFERENCES accounts(id)
);

ALTER TABLE customers ADD COLUMN indentification VARCHAR(25);