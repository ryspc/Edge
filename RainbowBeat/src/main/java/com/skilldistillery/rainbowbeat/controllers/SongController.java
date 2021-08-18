package com.skilldistillery.rainbowbeat.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.rainbowbeat.entities.Genre;
import com.skilldistillery.rainbowbeat.entities.Song;
import com.skilldistillery.rainbowbeat.services.SongService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4291"})
public class SongController {
	
	@Autowired
	private SongService songService;
	
	@GetMapping("songs")
	public List<Song> index(HttpServletRequest req, HttpServletResponse res){
		return songService.index();
	}
	
	@GetMapping("songs/search/{keyword}")
	public List<Song> getSongByKeyword(@PathVariable String keyword, HttpServletRequest req, HttpServletResponse res, 
			Principal principal){
		List<Song> songs = songService.getSongByKeyword(keyword);
		
		
		return songs;
	}
	
	@GetMapping("songs/{genre}")
	public List<Song> getSongByGenre(@PathVariable Genre genre, HttpServletRequest req, HttpServletResponse res, 
			Principal principal){
		List<Song> songs = songService.getSongByGenre(genre); 
		return songs;
	}
}
