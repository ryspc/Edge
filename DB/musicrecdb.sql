-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema musicrecdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `musicrecdb` ;

-- -----------------------------------------------------
-- Schema musicrecdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `musicrecdb` DEFAULT CHARACTER SET utf8 ;
USE `musicrecdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `email` VARCHAR(45) NOT NULL,
  `image_url` MEDIUMTEXT NULL,
  `enabled` TINYINT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `song`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `song` ;

CREATE TABLE IF NOT EXISTS `song` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `song_title` VARCHAR(100) NULL,
  `artist` VARCHAR(100) NULL,
  `image_url` VARCHAR(2000) NULL,
  `song_url` VARCHAR(2000) NULL,
  `song_length` DECIMAL NULL,
  `release_date` DATE NULL,
  `album` VARCHAR(100) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_song_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_song_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `post` ;

CREATE TABLE IF NOT EXISTS `post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(500) NULL,
  `title` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `user_id` INT NOT NULL,
  `song_id` INT NOT NULL,
  `enabled` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_post_user1_idx` (`user_id` ASC),
  INDEX `fk_post_song1_idx` (`song_id` ASC),
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_song1`
    FOREIGN KEY (`song_id`)
    REFERENCES `song` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `genre` ;

CREATE TABLE IF NOT EXISTS `genre` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `genre_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `comment` ;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(500) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `enabled` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC),
  INDEX `fk_comment_post1_idx` (`post_id` ASC),
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rating` ;

CREATE TABLE IF NOT EXISTS `rating` (
  `rating` TINYINT NOT NULL,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  INDEX `fk_rating_user1_idx` (`user_id` ASC),
  INDEX `fk_rating_post1_idx` (`post_id` ASC),
  PRIMARY KEY (`user_id`, `post_id`),
  CONSTRAINT `fk_rating_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `song_genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `song_genre` ;

CREATE TABLE IF NOT EXISTS `song_genre` (
  `song_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
  INDEX `fk_song_genre_song1_idx` (`song_id` ASC),
  INDEX `fk_song_genre_genre1_idx` (`genre_id` ASC),
  PRIMARY KEY (`song_id`, `genre_id`),
  CONSTRAINT `fk_song_genre_song1`
    FOREIGN KEY (`song_id`)
    REFERENCES `song` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_song_genre_genre1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `genre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playlist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `playlist` ;

CREATE TABLE IF NOT EXISTS `playlist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  `description` VARCHAR(500) NULL,
  `image_url` VARCHAR(2000) NULL,
  `published` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_playlist_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_playlist_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playlist_song`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `playlist_song` ;

CREATE TABLE IF NOT EXISTS `playlist_song` (
  `playlist_id` INT NOT NULL,
  `song_id` INT NOT NULL,
  INDEX `fk_playlist_song_playlist1_idx` (`playlist_id` ASC),
  INDEX `fk_playlist_song_song1_idx` (`song_id` ASC),
  PRIMARY KEY (`playlist_id`, `song_id`),
  CONSTRAINT `fk_playlist_song_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_song_song1`
    FOREIGN KEY (`song_id`)
    REFERENCES `song` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `favorite_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `favorite_user` ;

CREATE TABLE IF NOT EXISTS `favorite_user` (
  `user_id` INT NOT NULL,
  `favorite_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `favorite_id`),
  INDEX `fk_user_has_user_user2_idx` (`favorite_id` ASC),
  INDEX `fk_user_has_user_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_user2`
    FOREIGN KEY (`favorite_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS musicrecuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'musicrecuser'@'localhost' IDENTIFIED BY 'musicrecuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'musicrecuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (1, 'admin', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', NULL, NULL, NULL, NULL, 'admin@admin.com', NULL, 1, 'ADMIN');
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (2, 'ponyman', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', 'Brony', 'Jabrony', NULL, NULL, 'ponyman@rainbow.com', NULL, 1, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `song`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `song` (`id`, `song_title`, `artist`, `image_url`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (1, 'My Little Pony Theme Song', 'Some Brony', NULL, NULL, 240, '2020-04-20', 'Pony Style', 1);
INSERT INTO `song` (`id`, `song_title`, `artist`, `image_url`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (2, 'Rainbow Chill Beats', 'Rapper Brony', NULL, NULL, 300, '2020-05-11', 'Pony Time', 1);
INSERT INTO `song` (`id`, `song_title`, `artist`, `image_url`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (3, 'Pony Death Princess Eternal Savagery', 'Heavy Pony', NULL, NULL, 330, '2020-04-15', 'Iron Pony', 2);
INSERT INTO `song` (`id`, `song_title`, `artist`, `image_url`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (4, 'Ol Country Pony', 'Big Country Star', NULL, NULL, 240, '2020-03-15', 'Ponies and Tractors', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `post`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (1, 'Purple Ponies are the best ponies', 'Fresh Pony Song', ' 2021-08-19T14:00:00', NULL, 1, 1, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (2, 'This song is great', 'Sweet Beats', ' 2021-08-18T14:00:00', NULL, 2, 2, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (3, 'Another great country song', 'The illest pony song ever', ' 2021-08-18T14:00:00', NULL, 2, 4, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (4, 'Very Metal Pony Song', 'So Heavy Brony', '2021-08-18T14:00:00', NULL, 1, 3, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `genre`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `genre` (`id`, `genre_name`) VALUES (1, 'Pony Music');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (2, 'Pony Alt Death Metal');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (3, 'Conservative Pony Country');

COMMIT;


-- -----------------------------------------------------
-- Data for table `comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `comment` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `post_id`, `enabled`) VALUES (1, 'Ya Definitely A Sick Pony Song', NULL, NULL, 2, 2, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `post_id`, `enabled`) VALUES (2, 'The Heaviest Pony Breakdown', NULL, NULL, 1, 4, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `post_id`, `enabled`) VALUES (3, 'No way pink ponies are better', NULL, NULL, 2, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `rating`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `rating` (`rating`, `user_id`, `post_id`) VALUES (1, 2, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `song_genre`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (1, 1);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (2, 1);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (3, 2);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (4, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `playlist`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `playlist` (`id`, `title`, `user_id`, `description`, `image_url`, `published`) VALUES (1, 'Pony Beats', 1, 'The freshest pony music', NULL, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `playlist_song`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `playlist_song` (`playlist_id`, `song_id`) VALUES (1, 1);
INSERT INTO `playlist_song` (`playlist_id`, `song_id`) VALUES (1, 2);
INSERT INTO `playlist_song` (`playlist_id`, `song_id`) VALUES (1, 3);

COMMIT;


-- -----------------------------------------------------
-- Data for table `favorite_user`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `favorite_user` (`user_id`, `favorite_id`) VALUES (2, 1);

COMMIT;

