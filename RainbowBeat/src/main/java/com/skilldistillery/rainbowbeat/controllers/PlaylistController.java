package com.skilldistillery.rainbowbeat.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import com.skilldistillery.rainbowbeat.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4291" })
public class PlaylistController {

	@Autowired
	private PlaylistService playlistSvc;
	@Autowired
	private UserService userSvc;

//	@GetMapping("playlists")
//	public List<Playlist> getAllPlaylists() {
//		return playlistSvc.showAll();
//	}
	
	@GetMapping("playlists")
	public List<Playlist> getUserPlaylists(HttpServletResponse res, HttpServletRequest req, Principal principal) {
		return playlistSvc.showUserPlaylist(principal.getName());
	}

	@PostMapping("playlists")
	public Playlist createPlaylist(HttpServletRequest req, HttpServletResponse res, @RequestBody Playlist playlist, Principal principal) {
		Playlist p = playlistSvc.create(playlist, principal.getName());
		
		try {
			if(p == null) {
				res.setStatus(404);
			}else {
				res.setStatus(201);
			}
		} catch (Exception e) {
			res.setStatus(400);
			p=null;
		}
		return p;
	}
	

	@PutMapping("playlists")
	public Playlist updatePlaylist(HttpServletRequest req, HttpServletResponse res, @RequestBody Playlist playlist, Principal principal) {
		
		
		return playlistSvc.update(playlist);
	}

	@DeleteMapping("playlists/{id}")
	public boolean deletePlaylist(@PathVariable int id) {
		return playlistSvc.delete(id);
	}

}
