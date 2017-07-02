CREATE TABLE IF NOT EXISTS users
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS resource_type
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255),
	PRIMARY KEY (id),
	UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS resource_users
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	created_at datetime NOT NULL DEFAULT NOW(),
	updated_at datetime NOT NULL DEFAULT NOW(),
	resource_type_id int NOT NULL,
	count int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (resource_type_id) REFERENCES resource_type(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS bonus_users
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	created_at datetime NOT NULL DEFAULT NOW(),
	updated_at datetime NOT NULL DEFAULT NOW(),
	bonus_name varchar(255) NOT NULL,
	date_end datetime,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_type
(
	id int NOT NULL AUTO_INCREMENT,
	building_name varchar(255) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE (building_name)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_temple
(
	id int NOT NULL AUTO_INCREMENT,
	pinata_ready datetime,
	UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_motel
(
	id int NOT NULL AUTO_INCREMENT,
	color varchar(255),
	UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_rocket_factory
(
	id int NOT NULL AUTO_INCREMENT,
	lvl int NOT NULL DEFAULT 1,
	lvl_max int NOT NULL DEFAULT 2,
	UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*building_{building_name}
(
	id int NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id)
)*/

CREATE TABLE IF NOT EXISTS building_users
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	created_at datetime NOT NULL DEFAULT NOW(),
	updated_at datetime NOT NULL DEFAULT NOW(),
	building_type_id int NOT NULL,
	building_id int NOT NULL,
	x int NOT NULL,
	y int NOT NULL,
	construct_end datetime NOT NULL DEFAULT NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (building_type_id) REFERENCES building_type(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `resource_type` (`id`, `name`) VALUES ('1', 'gold');
INSERT INTO `resource_type` (`id`, `name`) VALUES ('2', 'offering');
INSERT INTO `resource_type` (`id`, `name`) VALUES ('3', 'spice');

INSERT INTO `building_type` (`id`, `building_name`) VALUES ('1', 'temple');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('2', 'rocket_factory');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('3', 'motel');