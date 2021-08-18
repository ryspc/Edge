package com.skilldistillery.rainbowbeat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.rainbowbeat.entities.Rating;

public interface RatingRepository extends JpaRepository<Rating, Integer>{
	
}
