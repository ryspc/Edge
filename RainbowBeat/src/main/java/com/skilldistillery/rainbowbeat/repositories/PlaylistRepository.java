package com.skilldistillery.rainbowbeat.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.rainbowbeat.entities.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {
	
//	List<Playlist> findByUser_Id(int id);
	
	List<Playlist> findByUser_Username(String username);
	
}
