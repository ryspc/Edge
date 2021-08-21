package com.skilldistillery.rainbowbeat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skilldistillery.rainbowbeat.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Integer>{
	Genre findByName(String genreName);
}
