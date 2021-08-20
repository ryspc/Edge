package com.skilldistillery.rainbowbeat.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.rainbowbeat.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer>{
	List<Comment> findByUser_Username(String username);
}
