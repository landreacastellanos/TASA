CREATE TABLE `type_planting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE `security` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(1000) NOT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8;



CREATE TABLE `stage` (
  `id` int(11) NOT NULL,
  `stage_name` varchar(255) NOT NULL,
  `type_planting` int(11) NOT NULL,
  `stage_number` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_planting_idx` (`type_planting`),
  CONSTRAINT `fk_planting` FOREIGN KEY (`type_planting`) REFERENCES `type_planting` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `profesion` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` decimal(12,0) NOT NULL,
  `password` varchar(500) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8;


CREATE TABLE `property` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `business_name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `web_site` varchar(255) DEFAULT NULL,
  `sowing_system` int(11) NOT NULL,
  `property_ca` int(11) DEFAULT NULL,
  `property_df` int(11) NOT NULL,
  `property_ec` int(11) DEFAULT NULL,
  `property_ep` int(11) DEFAULT NULL,
  `property_idc` int(11) DEFAULT NULL,
  `property_rdc` int(11) DEFAULT NULL,
  `property_sa` int(11) DEFAULT NULL,
  `property_v` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sowing_system_fk` (`sowing_system`),
  CONSTRAINT `sowing_system_fk` FOREIGN KEY (`sowing_system`) REFERENCES `type_planting` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=latin1;

CREATE TABLE `land` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `land_name` varchar(255) NOT NULL,
  `land_ha` decimal(10,2) NOT NULL,
  `variety` varchar(255) DEFAULT NULL,
  `realtime` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `land_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=324 DEFAULT CHARSET=latin1;


CREATE TABLE `calendar_activitie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `planning_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `land_id` int(11) NOT NULL,
  `stage_id` int(11) NOT NULL,
  `land_name` varchar(45) DEFAULT NULL,
  `property_name` varchar(45) DEFAULT NULL,
  `stage_number` int(11) DEFAULT NULL,
  `property_id` int(11) DEFAULT NULL,
  `stage_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_fk_idx` (`user_id`),
  KEY `land_fk_idx` (`land_id`),
  KEY `stage_fk_idx` (`stage_id`),
  CONSTRAINT `land_fk` FOREIGN KEY (`land_id`) REFERENCES `land` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `stage_fk` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2941 DEFAULT CHARSET=latin1;

CREATE TABLE `chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(1000) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `lote` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `autor_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

CREATE TABLE `historical` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_land` int(11) NOT NULL,
  `data` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_land` (`id_land`),
  CONSTRAINT `historical_ibfk_3` FOREIGN KEY (`id_land`) REFERENCES `land` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;



CREATE TABLE `Notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Notification` json NOT NULL,
  `id_user` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `id_land` int(11) DEFAULT NULL,
  `stage_id` int(11) DEFAULT NULL,
  `alarm` tinyint(1) DEFAULT NULL,
  `alarm_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_notification_fk_idx` (`id_user`),
  CONSTRAINT `user_notification_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6294 DEFAULT CHARSET=latin1;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stage_id` int(11) NOT NULL,
  `type_planting_id` int(11) NOT NULL,
  `commercial_name` varchar(255) NOT NULL,
  `ing_active` varchar(255) NOT NULL,
  `segment` varchar(255) NOT NULL,
  `presentation` varchar(255) NOT NULL,
  `concentration` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `formulator` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `dose_by_ha` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stage_id` (`stage_id`),
  KEY `type_planting_id` (`type_planting_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`),
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`type_planting_id`) REFERENCES `type_planting` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=280 DEFAULT CHARSET=utf8;


CREATE TABLE `property_procedure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_crop` varchar(250) NOT NULL,
  `stage_id` int(11) NOT NULL,
  `land_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `data` json DEFAULT NULL,
  `stage_complete` tinyint(1) NOT NULL,
  `procedure_image` json DEFAULT NULL,
  `crop_complete` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stage_id` (`stage_id`),
  KEY `land_id` (`land_id`),
  CONSTRAINT `property_procedure_ibfk_2` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`),
  CONSTRAINT `property_procedure_ibfk_3` FOREIGN KEY (`land_id`) REFERENCES `land` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=latin1;
