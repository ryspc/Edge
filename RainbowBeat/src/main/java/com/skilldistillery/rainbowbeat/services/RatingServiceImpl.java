package com.skilldistillery.rainbowbeat.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.rainbowbeat.entities.Rating;
import com.skilldistillery.rainbowbeat.repositories.RatingRepository;

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

}
