package com.skilldistillery.rainbowbeat.entities;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Song {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="song_title")
	private String title;
	
	@Column(name="artist")
	private String artist;
	
	@Column(name="image_url")
	private String imageURL;
	
	@Column(name="song_url")
	private String songURL;
	
	@Column(name="song_length")
	private Double songLength;

	@Column(name="release_date")
	private LocalDate releaseDate;
	
	@Column(name="album")
	private String album;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@OneToOne(mappedBy="song")
	private Post post;
	
	@ManyToMany(mappedBy="songs")
	private List<Genre> genres;
	
	@ManyToMany(mappedBy="songs")
	private List<Playlist> playlists;
	
	

	public Song() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public String getSongURL() {
		return songURL;
	}

	public void setSongURL(String songURL) {
		this.songURL = songURL;
	}

	public Double getSongLength() {
		return songLength;
	}

	public void setSongLength(Double songLength) {
		this.songLength = songLength;
	}

	public LocalDate getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(LocalDate releaseDate) {
		this.releaseDate = releaseDate;
	}

	public String getAlbum() {
		return album;
	}

	public void setAlbum(String album) {
		this.album = album;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Song [id=" + id + ", title=" + title + ", artist=" + artist + ", imageURL=" + imageURL + ", songURL="
				+ songURL + ", songLength=" + songLength + ", releaseDate=" + releaseDate + ", album=" + album
				+ ", user=" + user + "]";
	}
	
	
}
