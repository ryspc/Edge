package com.skilldistillery.rainbowbeat.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.rainbowbeat.entities.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
	List<Post> findBySong_Genres(String genre);
	
	List<Post> findByTitleLikeOrContentLikeOrUserLikeOrSong_TitleLikeOrSong_ArtistLikeOrSong_AlbumLikeOrSong_GenresLike(String keyword1, String keyword2, String keyword3, String keyword4, String keyword5, String keyword6, String keyword7);
}
