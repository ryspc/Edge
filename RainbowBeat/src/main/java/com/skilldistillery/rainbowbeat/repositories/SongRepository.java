package com.skilldistillery.rainbowbeat.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.rainbowbeat.entities.Genre;
import com.skilldistillery.rainbowbeat.entities.Song;

public interface SongRepository extends JpaRepository<Song, Integer>{

	List<Song> findByTitleLike(String keyword);
	List<Song> findByGenres_NameLike(String genre);
	
}
