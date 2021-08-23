package com.skilldistillery.rainbowbeat.entities;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="rating")
public class Rating {

	@EmbeddedId
	private RatingId id;
	@Column(name="rating")
	private boolean rating;
	@ManyToOne
@JsonIgnore
	@JoinColumn(name="user_id")
	@MapsId(value="userId")
	private User user;
	@ManyToOne
	@JsonIgnore
//	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name="post_id")
	@MapsId(value="postId")
	private Post post;

public Rating() {}
	
	
	
	public Rating(RatingId id, boolean rating, User user, Post post) {
		super();
//		this.id = new RatingId(post.getId(),user.getId());
		this.id = id;
		this.rating = rating;
		this.user = user;
		this.post = post;
	}



	public RatingId getId() {
		return id;
	}
	public void setId(RatingId id) {
		this.id = id;
	}
	public boolean isRating() {
		return rating;
	}
	public void setRating(boolean rating) {
		this.rating = rating;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	@Override
	public String toString() {
		return "Rating [id=" + id + ", rating=" + rating + "]";
	}

}
