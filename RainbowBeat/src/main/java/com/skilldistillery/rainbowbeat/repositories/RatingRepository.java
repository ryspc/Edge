package com.skilldistillery.rainbowbeat.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.rainbowbeat.entities.Rating;

public interface RatingRepository extends JpaRepository<Rating, Integer>{
	List<Rating> findByPost_Id(int id);
}
