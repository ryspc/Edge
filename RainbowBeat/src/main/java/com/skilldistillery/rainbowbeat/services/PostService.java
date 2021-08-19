package com.skilldistillery.rainbowbeat.services;

import java.util.List;

import com.skilldistillery.rainbowbeat.entities.Post;

public interface PostService {
	
	List<Post> allPosts();
	Post show(int id);
	List<Post> postsByKeyword(String keyword);
	List<Post> postsByGenre(String genre);
	List<Post> postsByUser(String username);
	Post create(Post post);
	Post update(int id, Post post);
	boolean destroy(int id);

}
