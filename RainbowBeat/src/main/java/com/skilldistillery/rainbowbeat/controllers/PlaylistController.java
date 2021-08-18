package com.skilldistillery.rainbowbeat.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.rainbowbeat.entities.Playlist;
import com.skilldistillery.rainbowbeat.services.PlaylistService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4291" })
public class PlaylistController {

	@Autowired
	private PlaylistService playlistSvc;

	@GetMapping("playlists")
	public List<Playlist> getAllPlaylists() {
		return playlistSvc.showAll();
	}

	@PostMapping("playlists")
	public Playlist createPlaylist(@RequestBody Playlist playlist) {
		return playlistSvc.create(playlist);
	}

	@PutMapping("playlists")
	public Playlist updatePlaylist(@RequestBody Playlist playlist) {
		return playlistSvc.update(playlist);
	}

	@DeleteMapping("playlists/{id}")
	public boolean deletePlaylist(@PathVariable int id) {
		return playlistSvc.delete(id);
	}

}
