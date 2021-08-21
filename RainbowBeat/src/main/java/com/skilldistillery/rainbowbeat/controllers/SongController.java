package com.skilldistillery.rainbowbeat.controllers;

//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

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

import com.skilldistillery.rainbowbeat.entities.Song;
import com.skilldistillery.rainbowbeat.repositories.SongRepository;
import com.skilldistillery.rainbowbeat.services.SongService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4291"})
public class SongController {
	
	@Autowired
	private SongService songService;
	
	@Autowired
	private SongRepository songRepo;
	
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
	public List<Song> getSongByGenre(@PathVariable String genre, HttpServletRequest req, HttpServletResponse res, 
			Principal principal){
		List<Song> songs = songService.getSongByGenre(genre); 
		return songs;
	}
	
	@PostMapping("songs")
	public Song createSong(@RequestBody Song song, HttpServletRequest req, HttpServletResponse res) {
		return songService.create(song);	
	}
	
	@PutMapping("songs/{id}")
	public Song updateSong(@PathVariable int id, @RequestBody Song song, HttpServletRequest req, HttpServletResponse res) {
		Song s = null;
		try {
			s = songService.update(id, song);
			System.out.println("******************************");
			System.out.println(s);
			res.setStatus(200);
			if (s == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			System.out.println("******************************");
			System.out.println(e);
			res.setStatus(400);
			s = null;
		}
		return s;
	}
	
//	@DeleteMapping("songs/{id}")
//	public boolean deleteSong(@PathVariable int id, HttpServletRequest req, HttpServletResponse res) {
//		System.out.println("*****************************");
//		System.out.println(id);
//		Song song = null;
//		if(songRepo.findById(id).isPresent()) {
//			song = songRepo.findById(id).get();
//			System.out.println(song);
//		}		
//		boolean deleted = songService.destroy(id);
//		if(deleted) {
//			res.setStatus(204);
//		}else {
//			res.setStatus(404);
//		}
//		return deleted;
//	}
}
