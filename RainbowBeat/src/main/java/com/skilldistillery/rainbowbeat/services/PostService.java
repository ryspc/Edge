package com.skilldistillery.rainbowbeat.services;

import java.util.List;

import com.skilldistillery.rainbowbeat.entities.Post;

public interface PostService {
	
	List<Post> allPosts();
	Post show(int id);
	List<Post> postsByKeyword(String keyword);
	List<Post> postsByGenre(String genre);
	Post create(Post post);
	Post update(String username, int id, Post post);
	boolean destroy(String username, int id);

}
