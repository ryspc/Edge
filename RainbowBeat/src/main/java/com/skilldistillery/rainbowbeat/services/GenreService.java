package com.skilldistillery.rainbowbeat.services;


import java.util.List;

import com.skilldistillery.rainbowbeat.entities.Genre;

public interface GenreService {

	Genre getByGenreName(String genreName);
	
	Genre getById(int id);
	
	List<Genre> getAll();
}
