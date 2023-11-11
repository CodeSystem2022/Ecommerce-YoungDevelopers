CREATE DATABASE  IF NOT EXISTS `productos_vinos` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `productos_vinos`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: productos_vinos
-- ------------------------------------------------------
-- Server version	5.7.43-log

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
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `urlImagen` varchar(256) DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COMMENT='\n\n\n\n';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Sol Juana',1500.00,'https://raw.githubusercontent.com/CodeSystem2022/Ecommerce-YoungDevelopers/main/ecommerce_pi/img-vinos/vino1.jpg?token=GHSAT0AAAAAACJGTNI6DA4OIC4GZYIJK2G2ZJW3LZQ',0),(2,'Borges ',1700.00,'https://raw.githubusercontent.com/CodeSystem2022/Ecommerce-YoungDevelopers/main/ecommerce_pi/img-vinos/vino2.jpg?token=GHSAT0AAAAAACJGTNI7MRN2UYE52T7UVET2ZJW3HKA',0),(3,'Centenario',1400.00,'https://raw.githubusercontent.com/CodeSystem2022/Ecommerce-YoungDevelopers/main/ecommerce_pi/img-vinos/vino3.jpg?token=GHSAT0AAAAAACJGTNI6EAIBPXZSIL74K5J6ZJW3ITA',0),(4,'El Ganador',2000.00,'https://raw.githubusercontent.com/CodeSystem2022/Ecommerce-YoungDevelopers/main/ecommerce_pi/img-vinos/vino4.jpg?token=GHSAT0AAAAAACJGTNI62B5F6AD33QVZMN2YZJW3IWA',0),(5,'Moura',2500.00,'https://raw.githubusercontent.com/CodeSystem2022/Ecommerce-YoungDevelopers/main/ecommerce_pi/img-vinos/vino5.jpg?token=GHSAT0AAAAAACJGTNI7M4MKMLQKRE274FFIZJW3IZA',0),(6,'Cabernet',1900.00,'https://raw.githubusercontent.com/CodeSystem2022/Ecommerce-YoungDevelopers/main/ecommerce_pi/img-vinos/vino6.jpg?token=GHSAT0AAAAAACJGTNI6M6LFDOAHWTGA75U4ZJW3I3Q',0),(7,'San Telmo',1700.00,'https://raw.githubusercontent.com/CodeSystem2022/Ecommerce-YoungDevelopers/main/ecommerce_pi/img-vinos/vino7.jpg?token=GHSAT0AAAAAACJGTNI7YOTGFH6YH5JAV6W2ZJW3I6Q',0),(8,'La Ocasion',3500.00,'https://raw.githubusercontent.com/CodeSystem2022/Ecommerce-YoungDevelopers/main/ecommerce_pi/img-vinos/vino8.jpg?token=GHSAT0AAAAAACJGTNI6TF22YV3OKDDBHXRKZJW3JBA',0),(9,'La Bodega',3000.00,'https://raw.githubusercontent.com/CodeSystem2022/Ecommerce-YoungDevelopers/main/ecommerce_pi/img-vinos/vino9.jpg?token=GHSAT0AAAAAACJGTNI63RTEBHAUL2UIWBUQZJW3JEA',0);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'benja','benja@gmail.com','$2a$05$jccdhhvJ8jOcuKgEnfBSx.mdB4ZYcLtkzHOCtPV6fhlaCioEEi70S'),(2,'mica','mica@gmail','$2a$05$Y6yxgSyW6ax.h6NTa2yBuuMFncHGTopVkMiQV89tH/DQexAJbv1CG'),(3,'julio','julio@gmail.com','$2a$05$9gpAmD7glcaWgefi1hTX/Oxs769iXVXijDEAEAa3Y3BhtSQRqsw5K'),(4,'flor','flor@gmail.com','$2a$05$/7peqE5Y0aGFjQ7KAsUgVeSK52J3YKuYSx50qQ.5e3DMH5J6Z340y'),(5,'joa','joa@gmail.com','$2a$05$RowurR9Ga7vtAigvC.vKgOGQoJ.Eam7Ccpq.dP1pr5KsCXZxBKVVy'),(6,'','','$2a$05$L9067/qsbjHJ1YmZxnouUeZImmTFr2v0DW8OFpSYWk6hJQwzobhJe'),(7,'paula','pau@gmail.com','$2a$05$dQActlkxOjNNTv6Lk4yCwObmrpzj5xQ6yBAweZLi6zLI3HUUtH55G'),(8,'noe','noe@gmail.com','$2a$05$WAfJyGdIwIUFxEhfkIqWtOIpsyMyuXQR2iSzRWfpRr3xM2yQl2x/G'),(9,'alan','alan@gmail.com','$2a$05$wuGJCUYni1/HVdcDz5ordOXAzl8A6B4WhW54q4Iqu9h8co0SkG7qe'),(10,'nora','nora@gmail.com','$2a$05$OKYhNCGwkehQepSxRpYb6.HSdUqzhoNsxJZPXtBlWr2bRWOB67HbS'),(11,'uma','uma@gmail.com','$2a$05$TVkFqRSBreytFBK2YhZQAuFwHV9rw9z2wLN3GcgPo8JtrMi5PMwzi'),(12,'juan','juan@gmail.com','$2a$05$JxSM33Il4ksn/TPWVIm53OjaeYQHaaYVZ4oniZukoz.ENrvw0LOQm');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-09 16:59:59
