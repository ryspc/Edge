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
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (1, 'admin', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', NULL, NULL, NULL, NULL, 'admin@admin.com', 'https://i.etsystatic.com/29388859/d/il/1852b1/3120127459/il_340x270.3120127459_kz1z.jpg?version=0', 1, 'ADMIN');
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (2, 'ponyman', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', 'Brony', 'Jabrony', NULL, NULL, 'ponyman@rainbow.com', 'https://i.etsystatic.com/29388859/d/il/1852b1/3120127459/il_340x270.3120127459_kz1z.jpg?version=0', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (3, 'gandalf44', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', 'Wizard', 'Oz', NULL, NULL, 'gandalf@savethering.com', 'https://i.etsystatic.com/29388859/d/il/1852b1/3120127459/il_340x270.3120127459_kz1z.jpg?version=0', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (4, 'darthedgelord12', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', 'Edgeman', 'Edgeland', NULL, NULL, 'titled@theedgelord.org', 'https://i.etsystatic.com/29388859/d/il/1852b1/3120127459/il_340x270.3120127459_kz1z.jpg?version=0', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (5, 'joker45', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', 'Jack', 'Napier', NULL, NULL, 'betterthanbatman@villans.co.uk', 'https://i.etsystatic.com/29388859/d/il/1852b1/3120127459/il_340x270.3120127459_kz1z.jpg?version=0', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (6, 'sweetcaroline332', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', 'Neil', 'Diamond', NULL, NULL, 'diamondintheRocks@music.com', 'https://i.etsystatic.com/29388859/d/il/1852b1/3120127459/il_340x270.3120127459_kz1z.jpg?version=0', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (7, 'marvinAndroid42', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', 'marvin', 'sadrobot', NULL, NULL, 'bestrobot@hitchhikers.io', 'https://i.etsystatic.com/29388859/d/il/1852b1/3120127459/il_340x270.3120127459_kz1z.jpg?version=0', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (8, 'ferrisbueller21', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', 'ferris', 'bueller', NULL, NULL, 'sweetferrari@dayoff.com', 'https://i.etsystatic.com/29388859/d/il/1852b1/3120127459/il_340x270.3120127459_kz1z.jpg?version=0', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (9, 'theterminator2029', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', 'arnold', 'schwarzenegger', NULL, NULL, 'riseofthemachine@cali.gov', 'https://i.etsystatic.com/29388859/d/il/1852b1/3120127459/il_340x270.3120127459_kz1z.jpg?version=0', 1, NULL);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `created_at`, `updated_at`, `email`, `image_url`, `enabled`, `role`) VALUES (10, 'yellowsubmarine1970', '$2a$10$XIVl/dqHvi08wZ8.B6qXsOrIy/gilyNbRdC6YYDLXGzATnPEYoVCO', 'John', 'Lennon', NULL, NULL, 'thebeatles@hotmail.co.uk', 'https://i.etsystatic.com/29388859/d/il/1852b1/3120127459/il_340x270.3120127459_kz1z.jpg?version=0', 1, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `song`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `song` (`id`, `song_title`, `artist`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (1, 'Solar Power', 'Lorde', 'https://www.youtube.com/watch?v=wvsP_lzh2-8', 192, '2021-08-20', 'Solar Power', 1);
INSERT INTO `song` (`id`, `song_title`, `artist`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (2, 'The Pressure', 'Nas', 'https://www.youtube.com/watch?v=qTzKh5ykLU0', 188, '2021-08-06', 'King\'s Disease II', 1);
INSERT INTO `song` (`id`, `song_title`, `artist`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (3, 'Pressure Machine', 'The Killers', 'https://www.youtube.com/watch?v=cPy0542LqPA', 309, '2021-08-13', 'Pressure Machine', 2);
INSERT INTO `song` (`id`, `song_title`, `artist`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (4, 'Monochrome', 'Between the Buried And Me', 'https://www.youtube.com/watch?v=5iXmfOE2o5Q', 195, '2021-08-20', 'Colors II', 2);
INSERT INTO `song` (`id`, `song_title`, `artist`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (5, 'Happier Than Ever', 'Billie Eilish', 'https://www.youtube.com/watch?v=5GJWxDKyk3A', 299, '2021-07-30', 'Happier Than Ever', 2);
INSERT INTO `song` (`id`, `song_title`, `artist`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (6, 'Last Train Home', 'John Mayer', 'https://www.youtube.com/watch?v=66Ne5dVDfLM', 187, '2021-07-16', 'Sob Rock', 1);
INSERT INTO `song` (`id`, `song_title`, `artist`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (7, 'Blue Mesas', 'Leon Bridges', 'https://www.youtube.com/watch?v=2QjPc81E09A', 196, '2021-07-23', 'Gold-Diggers Sound', 1);
INSERT INTO `song` (`id`, `song_title`, `artist`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (8, 'Wilshire', 'Tyler, the Creator', 'https://www.youtube.com/watch?v=LxGVyJLjbiY', 516, '2021-06-25', 'Call Me If You Get Lost', 2);
INSERT INTO `song` (`id`, `song_title`, `artist`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (9, 'Butterfly 3000', 'King Gizzard and the Lizard Wizard', 'https://www.youtube.com/watch?v=ArIOjP4pRbM', 172, '2021-06-11', 'Butterfly 3000', 1);
INSERT INTO `song` (`id`, `song_title`, `artist`, `song_url`, `song_length`, `release_date`, `album`, `user_id`) VALUES (10, 'Red Room', 'Hiatus Kaiyote', 'https://www.youtube.com/watch?v=p46Tm9-7i7E', 233, '2021-06-25', 'Mood Valiant', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `post`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (1, 'YAY I love lorde\'s music', 'Newest Lorde Album', '2021-08-19T14:00:00', NULL, 1, 1, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (2, 'This song has a great beat', 'Nas new album is killer', '2021-08-20T12:35:00', NULL, 1, 2, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (3, '20 years later their music is still my favorite', 'The Killers still got it', '2021-08-20T16:12:00', NULL, 2, 3, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (4, 'This song is so heavy. Love the breakdown.', 'BTBAM new colors', '2021-08-23T15:25:00', NULL, 2, 4, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (5, 'This is my favorite song off the new album.', 'Billes new album is great', '2021-08-22T20:20:00', NULL, 2, 5, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (6, 'This song is great and way chiller than his usual music.', 'Mayer\'s chill new song', '2021-08-23T14:15:00', NULL, 1, 6, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (7, 'Love the added instrumenation on this song.', 'Leon with instruments', '2021-08-20T16:30:00', NULL, 1, 7, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (8, 'Lyrics on this song are fantastic', 'Tylers lyrics', '2021-08-19T19:36:00', NULL, 2, 8, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (9, 'King Gizzard is still weird and great', 'The Lizard Wizard is still King', '2021-08-11T11:42:00', NULL, 1, 9, 1);
INSERT INTO `post` (`id`, `content`, `title`, `created_at`, `updated_at`, `user_id`, `song_id`, `enabled`) VALUES (10, 'New Song is better than ever', 'Haitus is over', '2021-08-16T13:12:00', NULL, 1, 10, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `genre`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `genre` (`id`, `genre_name`) VALUES (1, 'Rock');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (2, 'Rap');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (3, 'Pop');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (4, 'Country');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (5, 'Jazz');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (6, 'Dance');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (7, 'House');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (8, 'Downtempo');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (9, 'Punk');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (10, 'Blues');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (11, 'Classical');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (12, 'R&B');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (13, 'Reggae');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (14, 'Latin');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (15, 'Indie Pop');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (16, 'Alternative');
INSERT INTO `genre` (`id`, `genre_name`) VALUES (17, 'Metal');

COMMIT;


-- -----------------------------------------------------
-- Data for table `comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `musicrecdb`;
INSERT INTO `comment` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `post_id`, `enabled`) VALUES (1, 'This is her best song yet', '2021-08-19T14:20:00', NULL, 2, 1, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `post_id`, `enabled`) VALUES (2, 'Not a big fan of this newest song', '2021-08-20T12:57:00', NULL, 2, 2, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `post_id`, `enabled`) VALUES (3, 'Its pretty different than their original hits', '2021-08-20T16:55:00', NULL, 1, 3, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `post_id`, `enabled`) VALUES (4, 'Agree this song is really heavy', '2021-08-23T16:15:00', NULL, 1, 4, 1);
INSERT INTO `comment` (`id`, `content`, `created_at`, `updated_at`, `user_id`, `post_id`, `enabled`) VALUES (5, 'She keeps getting better and better.', '2021-08-22T20:20:00', NULL, 1, 5, 1);

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
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (1, 3);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (2, 2);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (3, 16);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (4, 17);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (5, 3);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (6, 1);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (7, 12);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (8, 2);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (9, 1);
INSERT INTO `song_genre` (`song_id`, `genre_id`) VALUES (10, 12);

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

