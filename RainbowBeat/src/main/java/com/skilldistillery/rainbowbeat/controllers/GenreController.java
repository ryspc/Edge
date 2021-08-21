package com.skilldistillery.rainbowbeat.controllers;

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
import com.skilldistillery.rainbowbeat.services.GenreService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4291"})
public class GenreController {
	
	@Autowired
	private GenreService genreService;
	
@GetMapping("genres/name/{genreName}")	
public Genre genreByName(HttpServletRequest req, HttpServletResponse res, @PathVariable String genreName) {
	Genre genre = genreService.getByGenreName(genreName);
	if(genre == null) {
		res.setStatus(404);
	}
	return genre;
}
@GetMapping("genres/{id}")	
public Genre genreById(HttpServletRequest req, HttpServletResponse res, @PathVariable int id) {
	Genre genre = genreService.getById(id);
	if(genre == null) {
		res.setStatus(404);
	}
	return genre;
}

@GetMapping("genres")
public List<Genre> allGenres(HttpServletRequest req, HttpServletResponse res){
	List<Genre> genres = genreService.getAll();
	if(genres == null) {
		res.setStatus(404);
	}
	return genres;
}

}
