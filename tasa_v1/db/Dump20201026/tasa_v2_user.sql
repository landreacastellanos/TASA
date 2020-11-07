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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `profesion` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` decimal(12,0) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (55,' 123','123',123,'123','diegol.bustamantep@gmail.com',123,'$2b$12$z67ITtNKCcOGosrcEuUPJ.BS1aRUgLhnkkSEWyw7ZosBsbPkyBq.e','2020-10-19 10:56:15',2,1),(56,' administrador','123',12,'123','21@asdm.com',123,'$2b$12$uwrIYOz7EGyjQ.03RNfIt.hvZi.bRPlVlpL/P/DIwaxfQr04kutby','2020-10-19 10:57:01',1,1),(57,' Leonardo','Bustamante',123,'123','diegol.bustamantep@gmail.com2',123,'$2b$12$.V09XUd7qhoUVsmr6O.LKeyjnnSrcUzGUEawIVzIn0cEXr.8A0K9a','2020-10-19 10:58:00',4,1),(58,' Pedro','Bustamante',21,'21','diegol.bustamantep@gmail.com3',123,'$2b$12$R1oJDzsyVMyMUnAfAziRQ.JEz8LGczGCXZjt5ENCgh6DdFDfL.EJi','2020-10-19 10:58:20',8,1),(59,' Edilma','Bustamante',123,'123','diegol.bustamantep@gmail.com4',123,'$2b$12$sSsR.HfRBcNwUcc97BlmcefcXYInWkbmQO2j4hqRv/D/Yl/nO2i/C','2020-10-19 10:58:43',9,1),(60,' Sonia','Bustamante',12,'123','diegol.bustamantep@gmail.com5',123,'$2b$12$ITsLt9sXiu1cS0orpDmLZOlmFnce8GQo7Px.FUSLM5DlktfVZlfyi','2020-10-19 10:59:06',7,1),(61,' Diego','Bustamante',123,'123','diegol.bustamantep@gmail.com6',123,'$2b$12$6FvDDN7mMoDkFrq7wRKKM.WS/vnuDfqXlwsUxXnfHY3aGK1Na4Xba','2020-10-19 10:59:25',3,1),(63,' Loreto','Bustamante',12,'123','diegol.bustamantep@gmail.com7',123,'$2b$12$Pkg/3lCZGnj0B54oh.R5j.igRZ0kE508.bto32brjfIhzXQquSAUS','2020-10-19 11:00:07',5,1),(64,' asd','Bustamante',123,'123','diegol.bustamantep@gmail.com8',123,'$2b$12$A9CcWaiEPe9U1dsQNWJKD.mbMuCxgGpZdPk3kbcwsGkWkoIZxSL0G','2020-10-19 11:00:30',5,1),(65,' Mery','Bustamante',32,'12','diegol.bustamantep@gmail.com0',123,'$2b$12$75WUvfNWbFTZypgm/T5BsuhDguIqsn.6nTKiEOaTH39KiR9Y7bW9q','2020-10-19 11:00:53',6,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-26 21:36:28
