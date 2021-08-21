package com.skilldistillery.rainbowbeat.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.rainbowbeat.entities.Comment;
import com.skilldistillery.rainbowbeat.entities.Post;
import com.skilldistillery.rainbowbeat.entities.Rating;
import com.skilldistillery.rainbowbeat.services.RatingService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4291"})
public class RatingController {
	
	@Autowired
	private RatingService ratingSvc;
	
	@GetMapping("rating")
	public List<Rating> getAllComments() {
		return ratingSvc.showAll();
	}
	
	@GetMapping("rating/post/{id}")
	public List<Rating> getRatingByPostId(@PathVariable int id,HttpServletResponse res){
		List<Rating> ratings = ratingSvc.getRatingByPostId(id);
		if(ratings == null) {
			res.setStatus(404);
		}
		return ratings;
	}
	@PutMapping("rating/post/{id}")
	public Rating updatePost(HttpServletRequest req, HttpServletResponse res, @PathVariable int id, @RequestBody Rating rating, Principal principal) {
		Rating r = new Rating();
		try {
			r = ratingSvc.update(id, rating);
			res.setStatus(200);
			if (r == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			res.setStatus(400);
			r = null;
		}
		return r;
	}
	
}
