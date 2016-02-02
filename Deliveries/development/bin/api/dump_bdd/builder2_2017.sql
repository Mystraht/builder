CREATE TABLE IF NOT EXISTS users
(
    id int NOT NULL AUTO_INCREMENT,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    username varchar(255),
    password varchar(255),
    mail varchar(255),
    is_facebook boolean,
    token varchar(255) NOT NULL,
    experience int DEFAULT 0,
    last_dailyreward_used_at datetime,
    ftue_complet boolean,
    last_parade_at datetime,
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
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
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

CREATE TABLE IF NOT EXISTS building_rocket_factory
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    lvl int NOT NULL DEFAULT 1,
    last_recolt_at datetime NOT NULL,
    UNIQUE (id)
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
    lvl int NOT NULL DEFAULT 1,
    last_recolt_at datetime NOT NULL,
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
    lvl int NOT NULL DEFAULT 1,
    last_recolt_at datetime NOT NULL,
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

CREATE TABLE IF NOT EXISTS building_altar
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
    lvl int NOT NULL DEFAULT 1,
    last_recolt_at datetime NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_church
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    lvl int NOT NULL DEFAULT 1,
    last_recolt_at datetime NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_cantina
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    lvl int NOT NULL DEFAULT 1,
    last_recolt_at datetime NOT NULL,
    UNIQUE (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS building_gift_shop
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
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
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    building_type_id int NOT NULL,
    building_id int NOT NULL,
    x int NOT NULL,
    y int NOT NULL,
    construct_end_at datetime NOT NULL,
    color varchar(1),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (building_type_id) REFERENCES building_type(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS lantern_users
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    x int NOT NULL,
    y int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS gift_users
(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    name varchar(255) NOT NULL,
    is_collected boolean NOT NULL,
    author_users_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (author_users_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `resource_type` (`id`, `name`) VALUES ('1', 'gold');
INSERT INTO `resource_type` (`id`, `name`) VALUES ('2', 'offering');
INSERT INTO `resource_type` (`id`, `name`) VALUES ('3', 'spice');

INSERT INTO `building_type` (`id`, `building_name`) VALUES ('1', 'temple');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('2', 'pyrotechnician');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('3', 'motel');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('4', 'bar');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('5', 'brothel');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('6', 'rocket_factory');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('7', 'house');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('8', 'main_square');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('9', 'park');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('10', 'statue');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('11', 'big_flower_pot');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('12', 'floating_flower');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('13', 'gift_shop');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('14', 'city_hall');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('15', 'church');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('16', 'cantina');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('17', 'harbor');
INSERT INTO `building_type` (`id`, `building_name`) VALUES ('18', 'altar');