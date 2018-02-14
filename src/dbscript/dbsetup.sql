-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
-- -----------------------------------------------------
-- Schema imageboard
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema imageboard
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `imageboard` DEFAULT CHARACTER SET utf8 ;
USE `imageboard` ;
-- -----------------------------------------------------
-- Table `imageboard`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imageboard`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(256) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `username` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8;
-- -----------------------------------------------------
-- Table `imageboard`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imageboard`.`post` (
  `post_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `title` TINYTEXT NOT NULL,
  `link` MEDIUMTEXT NOT NULL,
  `img` TINYTEXT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `post_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `imageboard`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8;
-- -----------------------------------------------------
-- Table `imageboard`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imageboard`.`comments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `post_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `img` TINYTEXT NOT NULL,
  `caption` TINYTEXT NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC),
  INDEX `post_id` (`post_id` ASC),
  CONSTRAINT `post_id`
    FOREIGN KEY (`post_id`)
    REFERENCES `imageboard`.`post` (`post_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `imageboard`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


