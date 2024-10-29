-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-10-2024 a las 22:22:15
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biobug`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
CREATE TABLE IF NOT EXISTS `detalle_pedido` (
  `id_detail` bigint NOT NULL AUTO_INCREMENT,
  `amount` int DEFAULT NULL,
  `id_product` bigint DEFAULT NULL,
  `id_order` bigint DEFAULT NULL,
  PRIMARY KEY (`id_detail`),
  KEY `id_product` (`id_product`),
  KEY `id_pedido` (`id_order`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id_detail`, `amount`, `id_product`, `id_order`) VALUES
(1, 2, 1, 1),
(2, 1, 5, 1),
(3, 3, 2, 2),
(4, 2, 4, 3),
(5, 1, 3, 4),
(6, 4, 7, 5),
(7, 5, 6, 6),
(8, 1, 8, 7),
(9, 2, 9, 8),
(10, 3, 10, 9),
(11, 10, 1, 10),
(12, 2, 4, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `id_order` bigint NOT NULL AUTO_INCREMENT,
  `date_creation` datetime DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `id_user` bigint DEFAULT NULL,
  PRIMARY KEY (`id_order`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_order`, `date_creation`, `total`, `id_user`) VALUES
(1, '2023-08-15 10:23:45', 500000, 2),
(2, '2023-08-20 14:18:30', 240000, 3),
(3, '2023-08-25 09:05:00', 150000, 4),
(4, '2023-09-01 16:50:10', 80000, 5),
(5, '2023-09-10 12:15:35', 100000, 6),
(6, '2023-09-15 11:05:45', 120000, 7),
(7, '2023-09-20 08:45:20', 200000, 8),
(8, '2023-09-25 13:30:50', 160000, 9),
(9, '2023-10-01 17:20:25', 110000, 10),
(10, '2023-10-05 15:10:55', 1000000, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id_product` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_spanish_ci NOT NULL,
  `scientificName` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `description` text COLLATE utf8mb3_spanish_ci,
  `quantityUnit` varchar(100) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `img` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id_product`, `name`, `scientificName`, `description`, `quantityUnit`, `price`, `img`, `createdAt`) VALUES
(1, 'Crisopas', 'Chrysoperla rufilabris', 'Depredadoras voraces de pulgones, ácaros, trips y otros pequeños insectos. Utiles en amplia gama de cultivos y entornos', '500 Larvas.', 100000.00, '../img/insects/crisopas.jpg', '2020-09-20 00:00:00'),
(2, 'Avispas parasitoides', 'Trichogramma spp.', 'Parasitan los huevos de muchas plagas, incluyendo polillas y gusanos. Eficaces para prevenir infestaciones en cultivos.', '100 Insectos', 80000.00, '../img/insects/avispas-parasitoides.jpg', '2020-09-20 00:00:00'),
(3, 'Ácaro depredador', 'Phytoseiulus persimilis', 'Depredador natural de la araña roja, una plaga común en cultivos bajo invernadero. Controla infestaciones rápidamente.', '80 Insectos', 160000.00, '../img/insects/acaro-depredador.jpg', '2020-09-20 00:00:00'),
(4, 'Mariquitas', 'Hippodamia convergens', 'Depredadoras de pulgones, ácaros y otros insectos blandos. Son populares por su eficacia y facilidad de uso.', '90 Insectos', 120000.00, '../img/insects/mariquitas.jpg', '2020-09-20 00:00:00'),
(5, 'Mosca soldado negra', 'Hermetia illucens', 'Utilizada para control de desechos orgánicos y biológicos, sus larvas degradan residuos y reducen proliferación de plagas.', '100 Insectos', 110000.00, '../img/insects/mosca-soldado-negra.jpg', '2020-09-20 00:00:00'),
(6, 'Escarabajo tigre', 'Calosoma sycophanta', 'Se alimenta de orugas, procesionaria del pino y otras plagas forestales, siendo útil en ambientes al aire libre.', '100 Insectos', 110000.00, '../img/insects/escarabajo-tigre.jpg', '2020-09-20 00:00:00'),
(7, 'Moscas depredadoras', 'Aphidoletes aphidimyza', 'Se especializan en atacar pulgones, inyectándoles una toxina paralizante antes de alimentarse de ellos.', '120 Insectos', 150000.00, '../img/insects/mosca-depredadora.jpg', '2020-09-20 00:00:00'),
(8, 'Chinche pirata diminuta', 'Orius insidiosus', 'Depredador eficaz contra trips, ácaros y pulgones. Funciona en cultivos con flores de polen, como los ornamentales.', '50 Insectos', 200000.00, '../img/insects/chinche-pirata.jpg', '2020-09-20 00:00:00'),
(9, 'Escarabajo terrestre', 'Pterostichus melanarius', 'Depredador eficaz contra babosas, orugas y otras plagas de suelo. Ideal para cultivos al aire libre.', '20 Insectos', 100000.00, '../img/insects/escarabajo-terrestre.jpg', '2020-09-20 00:00:00'),
(10, 'Escarabajo depredador', 'cryptolaemus montrouzieri', 'Utilizado en cultivos de frutas y hortalizas. Eficaz contra el combate de cochinillas algodonosas.', '50 Adultos', 240000.00, '../img/insects/escarabajo-depredador.jpg', '2020-09-20 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_user` bigint NOT NULL AUTO_INCREMENT,
  `rol_user` varchar(25) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `name_user` varchar(80) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `email_user` varchar(80) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `contrasena` varchar(300) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_user`, `rol_user`, `name_user`, `email_user`, `contrasena`) VALUES
(1, 'admin', 'Admin User', 'admin@gmail.com', 'adminpassword'),
(2, 'user', 'Juan Pérez', 'juan.perez@gmail.com', 'password123'),
(3, 'user', 'María Rodríguez', 'maria.rodriguez@gmail.com', 'password123'),
(4, 'user', 'Carlos Sánchez', 'carlos.sanchez@gmail.com', 'password123'),
(5, 'user', 'Ana González', 'ana.gonzalez@gmail.com', 'password123'),
(6, 'user', 'Luis Martínez', 'luis.martinez@gmail.com', 'password123'),
(7, 'user', 'Laura Torres', 'laura.torres@gmail.com', 'password123'),
(8, 'user', 'Pedro Ramírez', 'pedro.ramirez@gmail.com', 'password123'),
(9, 'user', 'Carmen Morales', 'carmen.morales@gmail.com', 'password123'),
(10, 'user', 'Jorge Herrera', 'jorge.herrera@gmail.com', 'password123');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_order`) REFERENCES `pedido` (`id_order`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
