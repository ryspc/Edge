package com.skilldistillery.rainbowbeat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.rainbowbeat.entities.Song;

public interface SongRepository extends JpaRepository<Song, Integer>{
	Song findBySongTitle(String title);
}
