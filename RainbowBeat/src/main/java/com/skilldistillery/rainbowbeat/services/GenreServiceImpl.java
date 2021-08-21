package com.skilldistillery.rainbowbeat.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.rainbowbeat.entities.Genre;
import com.skilldistillery.rainbowbeat.repositories.GenreRepository;

@Service
public class GenreServiceImpl implements GenreService {

	@Autowired
	private GenreRepository genreRepo;

	@Override
	public Genre getByGenreName(String genreName) {
		return genreRepo.findByName(genreName);
	}
	
	@Override
	public Genre getById(int id) {
		Genre genreObject = null;
		Optional<Genre> genre = genreRepo.findById(id);
		if (genre.isPresent()) {
			genreObject = genre.get();
		}
		return genreObject;
	}
	
	@Override
	public List<Genre> getAll(){
		return genreRepo.findAll();
	}



}
