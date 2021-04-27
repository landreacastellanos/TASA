-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: tasa_v2
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

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
-- Dumping data for table `type_planting`
--

LOCK TABLES `type_planting` WRITE;
/*!40000 ALTER TABLE `type_planting` DISABLE KEYS */;
INSERT INTO `type_planting` VALUES (3,'Arroz Secano Favorecido'),(4,'Arroz de Riego');
/*!40000 ALTER TABLE `type_planting` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-26 20:40:41

-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: tasa_v2
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

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
-- Dumping data for table `stage`
--

LOCK TABLES `stage` WRITE;
/*!40000 ALTER TABLE `stage` DISABLE KEYS */;
INSERT INTO `stage` VALUES (1,'Fecha de Siembra',3,1),(2,'Fecha de Siembra',4,1),(3,'Quema para siembra',3,2),(4,'Quema para la siembra',4,2),(5,'Tratamiento de semillas',3,3),(6,'Tratamiento de semillas ',4,3),(7,'Premergencia total',3,4),(8,'Premergencia total',4,4),(9,'Posemergencia temprana',3,5),(10,'Posemergencia temprana',4,5),(11,'Fertilización de siembra # 1',3,6),(12,'Fertilización de siembra # 1',4,6),(13,'Posemergencia tardía',3,7),(14,'Posemergencia tardía',4,7),(15,'Fertilización # 2',3,8),(16,'Fertilización # 2',4,8),(17,'Control de enfermedades - Intermedia',3,9),(18,'Control de hongos - Prepreventiva',4,9),(19,'Fertilización # 3',3,10),(20,'Fertilización #3',4,10),(21,'Control de enfermedades - Preventiva',3,11),(22,'Control de Hongos - Preventiva',4,11),(23,'Fertilización # 4',3,12),(24,'Fertilización # 4',4,12),(25,'Control de enfermedades - Embuchamieto',3,13),(26,'Aplicación de Embuchamiento',4,13),(27,'Protección de espiga',3,14),(28,'Protección de espiga o de grano',4,14),(29,'Fecha de Cosecha',3,15),(30,'Fecha de Cosecha',4,15);
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

-- Dump completed on 2021-04-26 20:40:46


-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: tasa_v2
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

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
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (79,3,3,'Cosmo agua','Regulador de ph','Regulador de ph',' 1 Kg','N/D','N/D','Cosmoagro','Cosmoagro',0.10),(80,3,3,'Cosmo In D','Coadyuvante','Coadyuvante','1 lt,4 lt, 20 Lts','N/D','N/D','Cosmoagro','Cosmoagro',0.20),(81,3,3,'Tornado 48 SL','Glifosato','Herbicida','19 lts ','480 grs','Verde','Sunjoycrop','ABY tech SA',4.00),(82,3,3,'Fritzz 25 SC','Oxifluorfen ','Activador','1 lt y 5 Lts','250 gr','Verde','UH','UH',0.25),(83,3,3,'Stuble digest','Bacterias','Bactericida','1 y 20 Lts','0,05','N/D','Soiltec','Soiltec',1.00),(84,3,3,'Tricho plus','Trichoderma H y V','Biologico','1 y 20 Lts','1 x 109 U.F.C./gr','N/D','Soiltec','Soiltec',0.15),(85,4,4,'Cosmo agua','Regulador de ph','Regulador de ph','1 Kg','N/D','N/D','Cosmoagro','Cosmoagro',0.10),(86,4,4,'Cosmo In D','Coadyuvante','Coadyuvante','1 lt,4 lt, 20 Lts','N/D','N/D','Cosmoagro','Cosmoagro',0.20),(87,4,4,'Tornado 48 SL','Glifosato','Herbicida','19 lts','480 grs','Verde','ABY tech SA','Sunjoycrop',4.00),(88,4,4,'Stuble digest','Bacterias','Bactericida','Biologicos','0,05','N/D','Soilte','Soiltec',1.00),(89,4,4,'Tricho pus','Trichoderma H y V','Micro','Biologicos','1 x 109 U.F.C./gr','N/D','Soilte','Soiltec',0.15),(90,4,4,'Pilarice 10 WP','Piraxozulfuron','Preemergente','1 Kg','100 gr','Verde','Pilarquin','Pilarquin',0.40),(91,4,4,'Fritzz 25 SC','Oxifluorfen','Activador','1lt y 5 Lts','250 gr','Verde','UH','UH',1.00),(92,5,3,'Semillon','21.9 Zn+14.6 B+14.6 Mn','Nutricion de semillas','1 lts','186 grs','N/D','Aglukon','Aglukon',0.25),(93,5,3,'Robust','Rizobacterias y Bacillus','Biologicos','1 y 20 lts','3,1%','N/D','Soieltec','Soieltec',0.25),(94,5,3,'Tricho plus','Trichoderma H y V','Biologicos','1 kg','1 x 109 U.F.C./gr','N/D','Soieltec','Soieltec',0.15),(95,5,3,'Allectus 30 SC','Imidacloprid + Bifentrina','Insecticida','50 kg, 250 y Kg','800 gr','amarillo','DVA','FMC',0.30),(96,6,4,'Semillon','21.9 Zn+14.6 B+14.6 Mn','Nutricion de semillas','1 lts','186 grs','N/D','Aglukon','Aglukon',0.25),(97,6,4,'Robust','Rizobacterias','Rizobacterias','1 y 20 lts','S/N','N/D','Soilte','Soilte',0.25),(98,6,4,'Tricho plus','Trichoderma H y V','Hongos','1 kgs','1 x 109 U.F.C./gr','N/D','Soilte','Soilte',0.15),(99,6,4,'Allectus 30 SC','Imidacloprid + Bifentrina','Insecticida','250 grs y Kg','800 gr','Amarilla','DVA','FMC',0.30),(100,7,3,'Cosmo agua','Regulador de ph','Regulador de ph','1 Kg','N/D','N/D','Cosmoagro','Cosmoagro',0.10),(101,7,3,'Cosmo flux','Coadyuvante','Coadyuvante','1 lt,4 lts,20 lts','N/D','N/D','Cosmoagro','Cosmoagro',0.20),(102,7,3,'Up Stage 50 EC','Clomazone','Pre-emerg','1 y 10 lts','500 grs','Amarilla','UPL','UPL',0.70),(103,7,3,'Fritzz 25 SC','Oxifluorfen','Pre-emerg','1 lt,5 lt','250 gr','Verde','UH','UH',0.60),(104,7,3,'Pilarice 10 WP','Piraxozulfuron','Preemergente','1 Kg','100 gr','Verde','Pilarquin','Pilarquin',0.40),(105,8,4,'Cosmo agua','Regulador de ph','Regulador de ph','1 Kg','N/D','N/D','Cosmoagro','Cosmoagro',0.10),(106,8,4,'Cosmo flux','Coadyuvante','Coadyuvante','1 lt,4 lt,20 lts','N/D','N/D','Cosmoagro','Cosmoagro',0.20),(107,8,4,'Up Stage 50 EC','Clomazone','Pre-emergente','1 lt,10 lts','500 gr','Amarilla','UPL','UPL',0.80),(108,10,4,'Cosmo agua','Regulador de ph','Manejo de aguas','0.25 kg,1kg, 2kg','N/D','N/D','Cosmoagro','Cosmoagro',0.10),(109,10,4,'Cosmo In D','Coadyuvante','Coadyuvante','1lt.4lt.20 lts','N/D','N/D','Cosmoagro','Cosmoagro',0.20),(155,10,4,'Satelite 45.6 SC','Pretilaclor','Pre-emergente','20 lts','456 gr','Azul','UPL','UPL',2.00),(156,10,4,'Stamfos plus 48 EC','Propanil + Anilofos','Postemergente','20 lts ,200 lts','480 gr','Azul','UPL','UPL',3.00),(157,10,4,'Odin 50 EC','Pretilaclor','Pre-emerg','20 lts','500 gr','Azul','UH','UH',1.50),(158,10,4,'Zumba 60 WDG','Metsulfuron','Hojas anchas','10 grs','600 grs','Verde','DVA','ABY Tech',0.07),(159,10,4,'Campo Ton 24 EC','Clorfenapyr','Insecticida','Kg','56 gr','Amarilla','DVA','Generic',0.40),(160,10,4,'Robust','Rizobacterias y bacillus','Bact/Hongos','1 lt,20lts','','','Soiltec','Soiltec',0.50),(161,9,3,'Cosmo agua','Regulador de ph','Regulador de ph','0.25 kg,1 kg, 2kg','N/D','N/D','Cosmoagro','Cosmoagro',0.10),(162,9,3,'Cosmo In D','Coadyuvante','Coadyuvante','1 lt.4 lt.20 lts','N/D','N/D','Cosmoagro','Cosmoagro',0.20),(163,9,3,'Stamfos plus 48 EC','Propanil + Anilofos','Postemerg','20 lts,200 lts','480 gr','Azul','UPL','UPL',3.00),(164,9,3,'Odin 50 EC','Pretilaclor','Pre-emerg','20 lts','500 gr','Azul','UH','UH',1.00),(165,9,3,'Campo Ton 24 EC','Clorfenapyr','Insect','200 grs, Kg','57 gr','amarillo','DVA','Generic',0.40),(166,9,3,'Zumba 60 WDG','Metsulfuron','Hojas anchas','10 grs','600 grs','Verde','DVA','ABY Tech',0.07),(167,9,3,'Radiflex','Biestimulante','Nutricion','1, 10 lts','109 grs','S/N','Aglukon','Cosmoagro',1.00),(168,11,3,'Formula (15-25-18),','15N+25P205+15K20','FERTILIZACION','45 Kg','58%','N/D','N/D','N/D',4.00),(169,11,3,'Polisulfato','Polihalita','Fertilizacion','25 kg','NPK2OCaMgOS','','ICL','ICL',100.00),(170,12,4,'Formula 16.5-15-26.6','Mezcla Fisaca','Nutrición','45 Kg','16.5+15+26.6','','N/D','N/D',5.00),(171,12,4,'Polisulfato','Polialita','Nutrición','25 Kg','19.2 S+14 K20+17Cao+6 Mg','','ICL','ICL',100.00),(172,14,4,'Cosmo agua','Regulador de ph','Manejo de aguas','0.25 kg,1kg, 2kg','','','Cosmoagro','Cosmoagro',0.10),(173,14,4,'Cosmo In D','Coadyuvante','Coadyuvante','1lt.4lts.20 lts','','','Cosmoagro','Cosmoagro',0.20),(174,14,4,'Satelite 45.6 SC','Pendimentalina ME','pre-emergente','20 lts','456 gr','Verde','UPL','UPL',2.50),(175,14,4,'Odin 50 EC','Pretilaclor','pre-emergente','20 lts','480 gr','Azul','UH','UH',1.50),(176,14,4,'Spartazone 48 SL','Bentazone','Postemergente','5 lts','480 gr','Amarillo','UH','UH',1.50),(177,14,4,'Stamfos plus 48 EC','Propanil + Anilofos','Post','20 lts,200 lts','57 gr','amarilla','UPL','UPL',4.00),(178,14,4,'Azkari 5.7 WG','Benzoato de Emamectina','Nutrición','1 lts y 10 lts','109 grs','','Wuxal','DVA',0.40),(179,14,4,'Radiflex','Biestimulante','Insecticida','1 lts','300 grs','Amarilla','FMC','Cosmoagro',1.00),(180,13,3,'Cosmo agua','Regulador de ph','Regulador de ph','0.25,1,2kg','N/D','N/D','Cosmoagro','Cosmoagro',0.10),(181,13,3,'Cosmo In D','Coadyuvante','Coadyuvante','1.4.20 lts','N/D','N/D','Cosmoagro','Cosmoagro',0.20),(182,13,3,'Satelite plus 45.6 CS','Pendimentalina + Clomazone','Pre-emergente','20 lts','456 gr','Azul','UH','UH',0.30),(183,13,3,'Stamfos plus 48 EC','Propanil + Anilofos','Cyperaceas','20 lts','480 gr','Azul','UH','UPL',3.00),(184,13,3,'Quinclorax','Imida + Bifentrina','Insecticida','1 lts','300 gr','verde','FMC','ABY Tech',1.50),(185,13,3,'Emamectina Benzoato','Enrayzador','NPK + Bioestimulante','1, 4 lts','129 grs','N/A','Cosmoagro','DVA',0.40),(186,13,3,'2-4 D + Picloran','Propanil + Anilofos','Postemergente','20 lts ,200 lts','480 gr','Azul','UPL','Wuxal',1.00),(219,15,3,'Formula (25-5-23)','25N+5P2O5+23K20','Fertilizacion edáfica','45 Kg','53%','N/D','N/D','N/D',3.00),(220,16,4,'Formula (25-5-23)','25N+5P2O5+23K20','Fertilizacion edafica','45 Kg','53%','N/D','N/D','N/D',3.00),(221,17,3,'Cosmo agua','Regulador de ph','Regulador de ph','0.25,1, 2kg','N/D','N/D','Cosmoagro','Cosmoagro',0.10),(222,17,3,'Cosmo Flux','Coadyuvante','Coadyuvante','1.4.20 lts','N/D','N/D','Cosmoagro','Cosmoagro',0.20),(223,17,3,'Robust','Rizobacterias','Bactericida','1,20 lts','3,10%','N/D','Soiltec','Soiltec',0.75),(224,17,3,'Tajfuno 60 SC','Triciclazole + Isprothiolan','Fungicida','1 kg','700 grs','Verde','DVA','DLT',1.50),(225,17,3,'Dispilan 20 SP','Acetameprid','Synfilidos, cochinillas','1 y 5 Lts','250 grs','Amarilla','Generic Ch','ABY Tech',0.40),(226,17,3,'Wuxal Ascofol','Bioest + 3B+0.5Zn+0.8 Mn','Bioestimulante','1 y 10 Lts','54,61%','N/D','Wuxal','Wuxal',1.00),(227,18,4,'Cosmo agua','Regulador de ph','Manejo de aguas','0.25 kg,1kg, 2kg','','','Cosmoagro','Cosmoagro',0.10),(228,18,4,'Cosmo Flux','Coadyuvante','Coadyuvante','1 lt.4 lt.20 lts','','','Cosmoagro','Cosmoagro',0.20),(229,18,4,'Baktillis','Bacillus subtilis','Bact/Hongos','1 lt,20 lts','13,90%','','Soiltec','Biokrone',2.00),(230,18,4,'Robust','Rizobacterias','Bact','1 lt,20 lts','','','Soiltec','Soiltec',0.50),(231,18,4,'Stuble Disgest','Fun/Bact','Bact/Hongos','1 lt,20lts','','','Soiltec','Soiltec',0.50),(232,18,4,'Wuxal Ascofol','Bioest + 3B+0.5Zn+0.8 Mn','Nutricion','1 y 10 Lts','','','Aglukon','Wuxal',1.00),(233,18,4,'Dispilant 20 SP','Acetameprid','Insecticida','1 Kg','200 grs','Amarilla','UH','UH',0.40),(234,19,3,'Formula (30-0-20)','30N+20K20','Fertilizacion edafica','45 Kg','50%','N/D','N/D','N/D',3.40),(235,20,4,'Formula (23+6.9+24)','Mezcla N+DAP+KLC','Nutrición','45 Kg','23N+6.9 P +25 K20','','S/D','S/D',5.00),(236,21,3,'Cosmo agua','Regulador de ph','Regulador de ph','0.25,1, 2kg','N/D','N/D','Cosmoagro','Cosmoagro',0.10),(237,21,3,'Cosmo Flux','Coadyuvante','Coadyuvante','1.4.20 lts','N/D','N/D','Cosmoagro','Cosmoagro',0.20),(238,21,3,'Validamisun 3 SL','Validamizin','Fungicidas/ Bactericida','1,20 lts','30 gr','Verde','Sundat','Sundat',2.00),(239,21,3,'Prestigio 30 SC','Piraclostrobin + Cyproconazol','Fungicidas','1 kg, 15 Kg','700 gr','verde','UPL','ABY Tech',0.50),(240,21,3,'Radiant 20 WP','Dinotefuran','Insecticida','1 lts','247 gr','Amarilla','UPL','UH',0.30),(241,21,3,'Wuxal Macromix','16-16-12 + 1 B + 1 Zn ME','Nutricion foliar','1 lt,5 lt, 10lts','','','Aglukon','Aglukon',1.00),(242,22,4,'Cosmo agua','Regulador de ph','Manejo de aguas','0.25 kg,1 kg, 2kg','','','Cosmoagro','Cosmoagro',0.10),(243,22,4,'Cosmo Flux','Coadyuvante','Coadyuvante','1 lt.4 lts.20 lts','','','Cosmoagro','Cosmoagro',0.20),(244,22,4,'Baktillis','Bacillus subtilis','Bactericidas','1 lt,20 lts','','Verde','Biokrone','Biokrone',2.00),(245,22,4,'Robust','Rizobacterias','Bact','1 lt,20 lts','','','Soiltec','Soiltec',0.50),(246,22,4,'Prestigio 30 SC','Piraclostrobin + Cyproconazol','Fungicida','Kg y 15 Kg','700 grs','Verde','UPL','ABY Tech',0.50),(247,22,4,'Wuxal Macromix 16-16-12 +1 B +1 Zn','NPK +ME','Nutricion','1 lt,5 lts,10 lts','667 grs','','Aglukon','Aglukon',1.00),(248,22,4,'CosmoQuel Boro 20','Boro 20','Nutricion','1 kg','200 grs','','Cosmoagro','Cosmoagro',0.50),(249,22,4,'Radiant 20 WG','Dinotefuran','Insecticida','1 kg','200 gr','Amarilla','UH','UH',0.40),(250,24,4,'Formula (23-0-30)','23N+0+30 K20','Nutrición','45 Kg','53%','S/N','N/D','N/D',3.00),(251,23,3,'Formula (20-0-30)','20N+30K20','Fertilizacion edafica','45 Kg','50%','N/D','N/D','N/D',2.00),(252,25,3,'Cosmo agua','Regulador de ph','Regulador de ph','0.25,1, 2kg','','','Cosmoagro','Cosmoagro',0.10),(253,25,3,'Cosmo Flux','Coadyuvante','Coadyuvante','1.4.20 lts','','','Cosmoagro','Cosmoagro',0.20),(254,25,3,'Aspen 50 SC','Flutriafol','Fungicida','1 lts','500 grs','Amarillo','FMC','FMC',0.40),(255,25,3,'Unixtaner 20 WP','Acido oxolinico','Bactericida','kg,5 kg','200 gr','Verde','UPL','UPL',0.50),(256,25,3,'Fytosan 20 WP','Sulfato de cobre y Calcio','Fungicida','20 Kg','300 gr','verde','UPL','UPL',1.00),(257,25,3,'Allectus 30 SC','Imidacloprid + Bifentrina','Insecticida','1 Kg','200 gr','Amarilla','UH','FMC',0.30),(258,25,3,'Wuxal K40','K+S ME','Nutrición foliar','1 lt,5,25 lts','400 gr','','aglukon','Aglukon',1.00),(259,26,4,'Cosmo agua','Regulador de ph','Manejo de aguas','0.25,1, 2kg','','','Cosmoagro','Cosmoagro',0.10),(260,26,4,'Cosmo Flux','Coadyuvante','Coadyuvante','1.4.20 lts','','','Cosmoagro','Cosmoagro',0.20),(261,26,4,'Aspen 50 SC','Flutriafol','Fungicida','1 lts','500 grs','Amarillo','FMC','FMC',0.40),(262,26,4,'Unixtaner 20 WG','Acido oxolinico','Bactericida','1, 5 Kg','200 gr','Verde','UPL','UPL',0.50),(263,26,4,'Fytosan 20 WP','Sulfato de cobre y Calcio','Fungicida','20 Kg','300 gr','verde','UPL','UPL',1.00),(264,26,4,'Wuxal K 40','K+S ME','Nutricion','1,5,25 lts','585.2 grs','','aglukon','Aglukon',1.00),(265,26,4,'Allectus 30 SC','Imidacloprid + Bifentrina','Sogata','1 kg','200 gr','Amarilla','UH','FMC',0.30),(266,27,3,'Cosmo agua','Regulador de ph','Regulador de ph','0.25,1, 2kg','','','Cosmoagro','Cosmoagro',0.10),(267,27,3,'Cosmo Flux','Coadyuvante','Coadyuvante','1.4.20 lts','','','Cosmoagro','Cosmoagro',0.20),(268,27,3,'Tridium 70 WG','Mz+Azox+Teb','Fungicida','1 y 15 Kg','750 gr','Verde','UPL','UPL',1.50),(269,27,3,'Clortosip 72 SL','Cloratholonil','Fungicida','1 Kg','700 grs','Verde','DVA','ABY Tech',1.50),(270,27,3,'Baktillis','Bacillus subtilis','Bactericidas','1 lt,20 lts','','Verde','Biokrone','Biokrone',2.00),(271,27,3,'Campo Epico 24.7 SC','Landa + Thiametoxan','Insecticida','1 lts','300 gr','verde','FMC','Generic',0.25),(272,27,3,'Wuxal K40','K+S ME','Nutricion foliar','1 lt,5,25 lts','400 gr','','aglukon','Aglukon',1.00),(273,28,4,'Cosmo agua','Regulador de ph','Manejo de aguas','0.25 kg, 1 kg, 2kg','','','Cosmoagro','Cosmoagro',0.10),(274,28,4,'Cosmo Flux','Coadyuvante','Coadyuvante','1 lt.4lts.20 lts','','','Cosmoagro','Cosmoagro',0.20),(275,28,4,'Tridium 70 WG','Mz+Azox+Teb','Fungicida','1 y 15 Kg','750 gr','Verde','UPL','UPL',1.50),(276,28,4,'Clortosip 72 SL','Cloratholonil','Fungicida','1 Kg','700 grs','Verde','DVA','ABY Tech',1.50),(277,28,4,'Unixtaner 20 WG','Acido oxolinico','Fungicida y Bacte','1 lt,20 lts','30 grs','Verde','Biokrone','UPL',0.50),(278,28,4,'Radiant 20 WG','Dinotefuran','Insecticida','1 lts','300 grs','Amarilla','FMC','UH',0.40),(279,28,4,'Wuxal K40','K + Mg + S + ME','Nutrición','Kg','642.1 grs','N/D','Cosmoagro','Aglukon',1.00);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-26 20:43:05
