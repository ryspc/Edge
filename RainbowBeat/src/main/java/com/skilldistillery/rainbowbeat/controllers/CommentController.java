package com.skilldistillery.rainbowbeat.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.rainbowbeat.entities.Comment;
import com.skilldistillery.rainbowbeat.services.CommentService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4291"})
public class CommentController {
	
	@Autowired
	private CommentService commentSvc;
	
	@GetMapping("comments")
	public List<Comment> getAllComments() {
		return commentSvc.showAll();
	}
	
	@GetMapping("comments/user/{username}")
	public List<Comment> getCommentsByUsername(@PathVariable String username,HttpServletResponse res){
		List<Comment> comments = commentSvc.getCommentsByUsername(username);
		if(comments == null) {
			res.setStatus(404);
		}
		return comments;
	}
	
	@PostMapping("comments")
	public Comment createComment(@RequestBody Comment comment) {
		return commentSvc.create(comment);
	}
	
	@PutMapping("comments")
	public Comment updateComment(@RequestBody Comment comment) {
		return commentSvc.update(comment);
	}
	
	@DeleteMapping("comments/{id}")
	public boolean deleteComment(@PathVariable int id) {
		return commentSvc.delete(id);
	}

}
