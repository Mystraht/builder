CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	created_at datetime NOT NULL DEFAULT NOW(),
	updated_at datetime NOT NULL DEFAULT NOW(),
	username varchar(255),
	password varchar(255),
	mail varchar(255),
	is_facebook boolean,
	token varchar(255) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE (token)
);	
​
CREATE TABLE ressource_type
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255),
	PRIMARY KEY (id),
	UNIQUE (name)
);
​
CREATE TABLE ressource_users
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	created_at datetime NOT NULL DEFAULT NOW(),
	updated_at datetime NOT NULL DEFAULT NOW(),
	ressource_type_id int NOT NULL,
	count int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (ressource_type_id) REFERENCES ressource_type(id)
);
​
CREATE TABLE bonus_users
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	created_at datetime NOT NULL DEFAULT NOW(),
	updated_at datetime NOT NULL DEFAULT NOW(),
	bonus_name varchar(255) NOT NULL,
	date_end datetime,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);
​
CREATE TABLE building_type
(
	id int NOT NULL AUTO_INCREMENT,
	building_name varchar(255) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE (building_name)
);
​
/*building_{building_name}
(
	id int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id)
)*/
​
CREATE TABLE building_users
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	created_at datetime NOT NULL DEFAULT NOW(),
	updated_at datetime NOT NULL DEFAULT NOW(),
	building_type_id int NOT NULL,
	building_id int NOT NULL,
	x int NOT NULL,
	y int NOT NULL,
	construct_end datetime NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (building_type_id) REFERENCES building_type(id)
)
​
CREATE TABLE tiles_users
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	created_at datetime NOT NULL DEFAULT NOW(),
	updated_at datetime NOT NULL DEFAULT NOW(),
	x int NOT NULL,
	y int NOT NULL,
	is_buildable boolean NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
)