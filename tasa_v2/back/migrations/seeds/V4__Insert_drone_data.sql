CREATE TABLE  `drone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `state` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE tasa_v2.property_procedure ADD air_application json NULL;
ALTER TABLE tasa_v2.land ADD dron BOOL DEFAULT false NOT NULL;
