-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: tasa_v2
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `property_procedure`
--

DROP TABLE IF EXISTS `property_procedure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_procedure` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `stage_id` int DEFAULT NULL,
  `land_id` int DEFAULT NULL,
  `visit_date` datetime DEFAULT NULL,
  `segment_start` datetime DEFAULT NULL,
  `segment_end` datetime DEFAULT NULL,
  `observation` text,
  `procedure_image` text,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `stage_id` (`stage_id`),
  KEY `land_id` (`land_id`),
  CONSTRAINT `property_procedure_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  CONSTRAINT `property_procedure_ibfk_2` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`),
  CONSTRAINT `property_procedure_ibfk_3` FOREIGN KEY (`land_id`) REFERENCES `land` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_procedure`
--

LOCK TABLES `property_procedure` WRITE;
/*!40000 ALTER TABLE `property_procedure` DISABLE KEYS */;
INSERT INTO `property_procedure` VALUES (29,78,14,25,NULL,NULL,NULL,NULL,NULL),(30,78,14,25,NULL,NULL,NULL,NULL,NULL),(31,78,14,25,NULL,NULL,NULL,NULL,NULL),(32,78,14,25,NULL,NULL,NULL,NULL,NULL),(33,78,14,25,NULL,NULL,NULL,NULL,NULL),(34,78,14,25,NULL,NULL,NULL,NULL,NULL),(35,78,14,25,NULL,NULL,NULL,NULL,NULL),(36,78,14,25,NULL,NULL,NULL,NULL,NULL),(37,79,14,27,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `property_procedure` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-26 21:36:27
