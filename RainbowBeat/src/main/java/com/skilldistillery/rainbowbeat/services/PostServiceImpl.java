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
		String containsKey = "%"+keyword+"%";
		List<Post> postsKeyword = postRepo.findByTitleLikeOrContentLikeOrUser_UsernameLikeOrSong_TitleLikeOrSong_ArtistLikeOrSong_AlbumLikeOrSong_Genres_NameLike(containsKey, containsKey, containsKey, containsKey, containsKey, containsKey, containsKey);
		System.out.println("********************************************************");
		System.out.println(postsKeyword);
		return postsKeyword;
	}

	@Override
	public List<Post> postsByGenre(String genre) {
		String containsGenre = "%"+genre+"%";
		return postRepo.findBySong_Genres_NameLike(containsGenre);
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
