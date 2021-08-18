package com.skilldistillery.rainbowbeat.services;

import java.util.List;

import com.skilldistillery.rainbowbeat.entities.Comment;

public interface CommentService {
	
	List<Comment> showAll();
	
	Comment show(int id);
	
	Comment create(Comment comment);
	
	Comment update(Comment comment);
	
	boolean delete(int id);
}
