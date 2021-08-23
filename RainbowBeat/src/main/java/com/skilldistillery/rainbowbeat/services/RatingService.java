package com.skilldistillery.rainbowbeat.services;

import java.util.List;

import com.skilldistillery.rainbowbeat.entities.Rating;

public interface RatingService {
	
	Rating show(int id);

	List<Rating> getRatingByPostId(int id);

	List<Rating> showAll();

	Rating update(int id, Rating rating);

	Rating create(Rating rating, String username, int postId);


}
