package com.skilldistillery.rainbowbeat.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.rainbowbeat.entities.Comment;
import com.skilldistillery.rainbowbeat.entities.Post;
import com.skilldistillery.rainbowbeat.entities.Rating;
import com.skilldistillery.rainbowbeat.repositories.RatingRepository;

@Service
public class RatingServiceImpl implements RatingService {
	
	@Autowired
	private RatingRepository ratingRepo;

	@Override
	public Rating show(int id) {
		Optional<Rating> rating = ratingRepo.findById(id);
		if (rating.isPresent()) {
			return rating.get();
		}
		return null;
	}
	
	@Override
	public List<Rating> showAll() {
		return ratingRepo.findAll();
	}
	
	@Override
	public List<Rating> getRatingByPostId(int id){
		return ratingRepo.findByPost_Id(id);
	}
	
	@Override
	public Rating update(int id, Rating rating) {
		getRatingByPostId(id);
		return ratingRepo.saveAndFlush(rating);
	}
	
	@Override
	public Rating create(Rating rating) {
		
		try {
			ratingRepo.saveAndFlush(rating);
		} catch (Exception e) {System.out.println(e);}
		return rating;
	}


}
