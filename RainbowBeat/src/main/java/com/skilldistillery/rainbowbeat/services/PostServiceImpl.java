package com.skilldistillery.rainbowbeat.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.rainbowbeat.entities.Post;
import com.skilldistillery.rainbowbeat.repositories.PostRepository;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepository postRepo;
	
	@Override
	public List<Post> allPosts() {
		return postRepo.findAll();
	}

	@Override
	public Post show(int id) {
		Optional<Post> p = postRepo.findById(id);
		Post post = null;
		if(p.isPresent()) {
			post = p.get();
		}
		return post;
	}

	@Override
	public List<Post> postsByKeyword(String keyword) {
		return postRepo.findByTitleLikeOrContentLikeOrUserLikeOrSong_TitleLikeOrSong_ArtistLikeOrSong_AlbumLikeOrSong_GenresLike(keyword, keyword, keyword, keyword, keyword, keyword, keyword);
	}

	@Override
	public List<Post> postsByGenre(String genre) {
		return postRepo.findBySong_Genres(genre);
	}

	@Override
	public Post create(Post post) {
		Post p = null;
		try {
			p = postRepo.saveAndFlush(post);
		} catch (Exception e) {		}
		return p;
	}

	@Override
	public Post update(String username, int id, Post post) {
		Post p = null;
		post.setId(id);
		p = postRepo.saveAndFlush(post);
		return p;
	}

	@Override
	public boolean destroy(String username, int id) {
		postRepo.deleteById(id);
		return !postRepo.existsById(id);
	}

}
