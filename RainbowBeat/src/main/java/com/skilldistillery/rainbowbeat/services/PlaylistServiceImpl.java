package com.skilldistillery.rainbowbeat.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.rainbowbeat.entities.Playlist;
import com.skilldistillery.rainbowbeat.repositories.PlaylistRepository;

public class PlaylistServiceImpl implements PlaylistService {

	@Autowired
	private PlaylistRepository playlistRepo;

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
	public Playlist create(Playlist playlist) {
		return playlistRepo.saveAndFlush(playlist);
	}

	@Override
	public Playlist update(Playlist playlist) {
		return playlistRepo.saveAndFlush(playlist);
	}

	@Override
	public boolean delete(int id) {
		playlistRepo.deleteById(id);
		return !playlistRepo.existsById(id);
	}

}
