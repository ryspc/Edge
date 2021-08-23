package com.skilldistillery.rainbowbeat.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Embeddable
public class RatingId implements Serializable {
	private static final long serialVersionUID = 1L;

//	@LazyCollection(LazyCollectionOption.FALSE)
	@Column(name = "post_id")
	private int postId;
	@Column(name = "user_id")
	private int userId;

	public RatingId() {
	}

	public RatingId(int postId, int userId) {
		super();
		this.postId = postId;
		this.userId = userId;
	}

	public int getPostId() {
		return postId;
	}

	public void setPostId(int postId) {
		this.postId = postId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + postId;
		result = prime * result + userId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RatingId other = (RatingId) obj;
		if (postId != other.postId)
			return false;
		if (userId != other.userId)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "RatingId [postId=" + postId + ", userId=" + userId + "]";
	}

}
