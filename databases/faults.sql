-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2017 at 04:09 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `faultanalysis`
--

-- --------------------------------------------------------

--
-- Table structure for table `faults`
--

CREATE TABLE `faults` (
  `ID` int(3) NOT NULL,
  `SID` varchar(100) NOT NULL,
  `Heading` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Symptoms` text NOT NULL,
  `Solutions` text NOT NULL,
  `CreationDate` datetime NOT NULL,
  `UpdateDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `Author` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `faults`
--

INSERT INTO `faults` (`ID`, `SID`, `Heading`, `Description`, `Symptoms`, `Solutions`, `CreationDate`, `UpdateDate`, `Author`) VALUES
(1, 'TheFault', 'The Fault', 'The fault', 'Test, Testing', 'CheckYourBattery, CheckYourBattery&amp;quo', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Opeyemi David'),
(4, 'Make&amp;#39;sSense', 'Make&amp;#39;s Sense', 'What&amp;#39;s the sense in this?', 'TestingMore, CarWontStart', 'CheckYourBattery, CheckYourBattery&amp;quo', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Opeyemi David'),
(5, 'Testq', 'Testq', 'TKJDKLFJA;LSJDL', 'Testing, TestingMore', 'CheckYourBattery, Test', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'nAME');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faults`
--
ALTER TABLE `faults`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faults`
--
ALTER TABLE `faults`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
