package com.skilldistillery.rainbowbeat.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.rainbowbeat.entities.Post;
import com.skilldistillery.rainbowbeat.entities.Rating;
import com.skilldistillery.rainbowbeat.entities.RatingId;
import com.skilldistillery.rainbowbeat.entities.User;
import com.skilldistillery.rainbowbeat.repositories.PostRepository;
import com.skilldistillery.rainbowbeat.repositories.RatingRepository;
import com.skilldistillery.rainbowbeat.repositories.UserRepository;

@Service
public class RatingServiceImpl implements RatingService {
	
	@Autowired
	private RatingRepository ratingRepo;
	@Autowired
	private PostRepository postRepo;
	@Autowired
	private UserRepository userRepo;

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
	public Rating create(Rating rating,String username, int postId) {
		User user = userRepo.findByUsername(username);
		Post post = postRepo.queryById(postId);
		if(user != null && post != null) {
			RatingId ratingId = new RatingId(postId, user.getId());
			rating.setId(ratingId);
		try {
			rating.setUser(user);
			rating.setPost(post);
			ratingRepo.saveAndFlush(rating);
			return rating;
		} catch (Exception e) {System.out.println(e);}}
		
		return null;
	}


}
