package com.skilldistillery.rainbowbeat.services;

import java.util.List;

import com.skilldistillery.rainbowbeat.entities.Playlist;

public interface PlaylistService {

	List<Playlist> showAll();

	Playlist show(int id);

	Playlist create(Playlist playlist, String username);

	Playlist update(Playlist playlist);

	boolean delete(int id);
	
	List<Playlist> showUserPlaylist(String username);
}
