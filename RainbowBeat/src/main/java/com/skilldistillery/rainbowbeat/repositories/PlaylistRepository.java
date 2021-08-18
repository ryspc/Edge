package com.skilldistillery.rainbowbeat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.rainbowbeat.entities.Comment;
import com.skilldistillery.rainbowbeat.entities.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {

}
