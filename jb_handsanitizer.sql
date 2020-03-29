-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2020 at 03:37 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jb_handsanitizer`
--

-- --------------------------------------------------------

--
-- Table structure for table `handsanitizers`
--

CREATE TABLE `handsanitizers` (
  `id` int(11) NOT NULL,
  `merek` varchar(255) NOT NULL,
  `detail` text NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `handsanitizers`
--

INSERT INTO `handsanitizers` (`id`, `merek`, `detail`, `stock`) VALUES
(1, 'Dettol Hand Sanitizer', 'Dettol Hand Sanitizer memiliki berbagai macam varian dan ukuran. Ukuran yang tersedia, mulai dari 50 mililiter (ml) dan 200 ml.\r\n\r\nKandungan aloe vera dan chamomile di dalamnya meninggalkan kesegaran dan kelembutan di tangan kamu, lho!\r\n', 98),
(2, 'Hand Sanitizer Onemed', 'Hand sanitizer yang ini biasanya digunakan di rumah sakit. Produk ini memiliki bahan dasar alkohol yang tentunya efektif membasmi bakteri dan virus. \r\n\r\nOnemed Hand Sanitizer ini cocok buat kamu yang tidak menyukai wangi-wangian', 100),
(3, 'Antis Hand Sanitizer Spray', 'Berbeda dengan lainnya, Antis hand sanitizer spray adalah cairan pembersih tangan dengan bentuk spray.\r\n\r\nHand sanitizer ini berbasi alkohol yang efektif membasmi kuman dengan cepat! Produk ini juga praktis dan mudah digunakan.\r\n\r\n', 100),
(4, 'Nuvo Hand Sanitizer', 'Kalau kamu mencari pembersih tangan antiseptik dengan wangi yang menyegarkan, Nuvo Hand Sanitizer adalah jawabannya!\r\n\r\nProduk ini tersedia dalam berbagai ukuran dan varian rasa. Ada varian original, aloe vera hingga rasa buah strawberry.\r\n\r\n', 100),
(5, 'SOS Hand Sanitizer', 'Hand sanitizer ini tersedia dalam ukuran 60 ml hingga 500 ml. Cocok untuk dibawa ke mana pun dan persediaan di rumah.\r\n\r\nProduk ini telah teruji terhadap kuman E.coli, S.aureus, P.aeruginosa, S.typhimurium dan Virus Avian Influenza alias H5N1, lho!\r\n', 100),
(6, 'abCD', 'a', 10),
(7, 'ab', 'a', 10),
(9, 'abC', 'a', 10);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `handsanitizer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `user_id`, `handsanitizer_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kota` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `kota`, `created_at`, `updated_at`) VALUES
(1, 'Budi Herlambang', 'Madiun', '2020-03-24 06:01:18', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `handsanitizers`
--
ALTER TABLE `handsanitizers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `handsanitizer_id` (`handsanitizer_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `handsanitizers`
--
ALTER TABLE `handsanitizers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
