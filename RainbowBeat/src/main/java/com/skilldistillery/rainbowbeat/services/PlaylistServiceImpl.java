package com.skilldistillery.rainbowbeat.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.rainbowbeat.entities.Playlist;
import com.skilldistillery.rainbowbeat.entities.User;
import com.skilldistillery.rainbowbeat.repositories.PlaylistRepository;
import com.skilldistillery.rainbowbeat.repositories.UserRepository;

@Service
public class PlaylistServiceImpl implements PlaylistService {

	@Autowired
	private PlaylistRepository playlistRepo;
	@Autowired UserRepository userRepo;

	@Override
	public List<Playlist> showAll() {
		return playlistRepo.findAll();
	}

	@Override
	public Playlist show(int id) {
		Optional<Playlist> playlist = playlistRepo.findById(id);
		if (playlist.isPresent()) {
			return playlist.get();
		}
		return null;
	}

	@Override
	public Playlist create(Playlist playlist, String username) {
		User user = userRepo.findByUsername(username);
		try {
			playlist.setUser(user);
			playlistRepo.saveAndFlush(playlist);
			return playlist;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}

	@Override
	public Playlist update(Playlist playlist, String username) {
		User user = userRepo.findByUsername(username);
		try {
			playlist.setUser(user);
			playlistRepo.saveAndFlush(playlist);
			return playlist;
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}
	}

	@Override
	public boolean delete(int id) {
		playlistRepo.deleteById(id);
		return !playlistRepo.existsById(id);
	}

	@Override
	public List<Playlist> showUserPlaylist(String username) {
		return playlistRepo.findByUser_Username(username);
	}

}
