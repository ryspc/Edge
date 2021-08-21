package com.skilldistillery.rainbowbeat.services;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.rainbowbeat.entities.Genre;
import com.skilldistillery.rainbowbeat.entities.Song;
import com.skilldistillery.rainbowbeat.repositories.SongRepository;
import com.skilldistillery.rainbowbeat.repositories.UserRepository;



@Service
public class SongServiceImpl implements SongService{

	@Autowired
	SongRepository songRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@Override
	public List<Song> index() {
		List<Song> songs = new ArrayList<Song>();
		songs.addAll(songRepo.findAll());
		return songs;
	}

	@Override
	public Song show(String username, int songId) {
		Optional<Song> sng = songRepo.findById(songId);
		if(sng.isPresent()) {
			return sng.get();
	}	else {
		return null;
	}
	}

//	@Override
//	public Song create(String username, Song song) {
//		song.setUser(userRepo.findByUsername(username));
//		return songRepo.saveAndFlush(song);
//		
//	}

	@Override
	public Song update(String username, int songId, Song song) {
		song.setId(songId);
		
		return songRepo.saveAndFlush(song);
	}

	@Override
	public boolean destroy(String username, int songId) {
		songRepo.deleteById(songId);
		return !songRepo.findById(songId).isPresent();
	}
	
	@Override
	public List<Song> getSongByKeyword(String keyword){
		String newKeyword = '%'+keyword+'%';
		List<Song> songs = songRepo.findByTitleLike(newKeyword);
		return songs;
	}
	
	@Override
	public List<Song> getSongByGenre(String genre){
		String newGenre = '%'+genre+'%';
		List<Song> songs = songRepo.findByGenres_NameLike(newGenre);
		return songs;
	}
	
	@Override
	public Song create(Song song) {
		return songRepo.saveAndFlush(song);
	}
	
}
