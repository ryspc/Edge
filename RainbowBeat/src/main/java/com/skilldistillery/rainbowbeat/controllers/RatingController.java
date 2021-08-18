package com.skilldistillery.rainbowbeat.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.rainbowbeat.services.RatingService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4291"})
public class RatingController {
	
	@Autowired
	private RatingService ratingSvc;
	
	// TODO: No API Endpoints at this time
	
}
