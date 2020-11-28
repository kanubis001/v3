CREATE DATABASE genco2;
USE genco2;
CREATE TABLE sangjanglist(
	CompanyName VARCHAR(50) NOT NULL,
	StockCode INT NOT NULL PRIMARY KEY,
	Category VARCHAR(255),
	MainProduct VARCHAR(255),
	SangJangDay DATE,
	GyulSanMonth VARCHAR(10),
	President VARCHAR(255),
	Homepage VARCHAR(255),
	Localarea VARCHAR(20)
); 
CREATE TABLE stocklist(
	CompanyName VARCHAR(50) NOT NULL,
	StockCode INT NOT NULL PRIMARY KEY,
	Market VARCHAR(30)
); 
INSERT INTO sangjanglist(CompanyName, StockCode,Category,MainProduct,SangJangDay,GyulSanMonth,President,Homepage,Localarea)
VALUES('test',999999, '요식','test',20201116,'12월','김재호','www.kaligo.com','서울');

ALTER TABLE sangjanglist MODIFY Category varchar(255);
ALTER TABLE sangjanglist MODIFY MainProduct varchar(255);
ALTER TABLE sangjanglist MODIFY President varchar(255);

ALTER DATABASE genco2 DEFAULT CHARACTER SET utf8;
ALTER TABLE stocklist convert to charset utf8;

select * from sangjanglist where CompanyName like "%s%";