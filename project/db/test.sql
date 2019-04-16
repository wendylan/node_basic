SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- 表的结构 `item_table`
--

CREATE TABLE IF NOT EXISTS `item_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `price` float NOT NULL,
  `count` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `item_table`
--

INSERT INTO `item_table` (`ID`, `title`, `price`, `count`) VALUES
(1, '运动服', 199, 999),
(2, '运动裤', 299, 998);

-- --------------------------------------------------------

--
-- 表的结构 `user_table`
--

CREATE TABLE IF NOT EXISTS `user_table` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `user_table`
--

INSERT INTO `user_table` (`ID`, `username`, `password`) VALUES
(1, 'lee', '123456'),
(2, 'chen', '654321'),
(9, 'kate', '666666'),
(8, 'lily', '888888');