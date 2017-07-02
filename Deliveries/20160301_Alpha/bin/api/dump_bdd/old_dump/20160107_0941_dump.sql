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
    experience int DEFAULT 0,
    last_dailyreward_used_at datetime DEFAULT NOW(),
    ftue_complet boolean,
    last_parade_at datetime DEFAUlT NOW(),
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
    user_id int NOT NULL,
    pinata_ready datetime,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_motel
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_bar
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_altar
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_casino
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_brothel
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_pyrotechnician
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_house
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_main_square
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_park
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_statue
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_big_flower_pot
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_floating_flower
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_harbor
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_city_hall
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_lanterns
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_church
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_market
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_cantina
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_tapas_stand
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_gift_shop
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_hotel
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_rocket_factory
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    lvl int NOT NULL DEFAULT 1,
    last_recolt_at datetime NOT NULL DEFAULT NOW(),
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
    construct_end_at datetime NOT NULL DEFAULT NOW(),
    color varchar(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (building_type_id) REFERENCES building_type(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS lantern_users
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    created_at datetime NOT NULL DEFAULT NOW(),
    updated_at datetime NOT NULL DEFAULT NOW(),
    x int NOT NULL,
    y int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `resource_type` (`id`, `name`) VALUES ('1', 'gold');
INSERT INTO `resource_type` (`id`, `name`) VALUES ('2', 'offering');
INSERT INTO `resource_type` (`id`, `name`) VALUES ('3', 'spice');

INSERT INTO `building_type` (`id`, `building_name`) VALUES ('1', 'temple');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('2', 'rocket_factory');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('3', 'motel');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('4', 'bar');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('5', 'altar');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('6', 'casino');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('7', 'brothel');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('8', 'fireworks_shop');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('9', 'house');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('10', 'main_square');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('11', 'park');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('12', 'statue');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('13', 'big_flower_pot');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('14', 'floating_flower');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('15', 'harbor');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('16', 'city_hall');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('17', 'lanterns');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('18', 'church');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('19', 'market');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('20', 'cantina');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('21', 'tapas_stand');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('22', 'gift_shop');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('23', 'hotel');