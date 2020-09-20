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
  FOREIGN KEY (id_origanization) REFERENCES organizations(id)
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
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  delete_at TIMESTAMP,
  FOREIGN KEY (id_role) REFERENCES roles (id),
  FOREIGN KEY (id_market) REFERENCES markets (id)
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
