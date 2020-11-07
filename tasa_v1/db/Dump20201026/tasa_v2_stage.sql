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
-- Table structure for table `stage`
--

DROP TABLE IF EXISTS `stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stage_name` varchar(255) DEFAULT NULL,
  `segment_days` varchar(255) DEFAULT NULL,
  `notification_days` varchar(255) DEFAULT NULL,
  `after_img` text,
  `before_img` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stage`
--

LOCK TABLES `stage` WRITE;
/*!40000 ALTER TABLE `stage` DISABLE KEYS */;
INSERT INTO `stage` VALUES (1,'Quema para la Siembra - 5 a 8 días antes de la siembra','-5,-8',NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(2,'Tratamiento de semillas - 0 a 3 dias antes de la siembra','-0,-3',NULL,'/images/segments_images/2_despues.jpg','/images/segments_images/2_antes.jpg'),(3,'Pre-Emergencia Total',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(4,'Post Emergencia Temprana',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(5,'Fertilizacion #1',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(6,'Post Emergencia Tardía',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(7,'Fertilizacion #2',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(8,'Control de Enfermedades',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(9,'Fertilizacion #3',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(10,'Control de Enfermedades 2',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(11,'Fertilizacion #4',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(12,'Control de Enfermedades 3',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(13,'Proteccion de Espiga',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(14,'Fecha de Siembra',NULL,NULL,'/images/segments_images/14_siembra_tapado.jpg','/images/segments_images/1_antes.jpg'),(15,'Fecha de Cosecha',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(16,'Control de Hongos',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(17,'Preventiva',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(18,'Aplicación de Embucahmiento',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(19,'Protección de Espiga o de Grano',NULL,NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg'),(20,'Tratamiento de semillas - 1 a 2 dias antes de la siembra','-1,-2',NULL,'/images/segments_images/1_despues.jpg','/images/segments_images/1_antes.jpg');
/*!40000 ALTER TABLE `stage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-26 21:36:29
