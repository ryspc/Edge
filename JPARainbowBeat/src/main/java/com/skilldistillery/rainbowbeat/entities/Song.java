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

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@JsonIgnore
	@OneToOne(mappedBy="song")
	private Post post;
	
	@JsonIgnore
	@ManyToMany(mappedBy="songs")
	private List<Genre> genres;
	
	@JsonIgnore
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

	
	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	public List<Genre> getGenres() {
		return genres;
	}

	public void setGenres(List<Genre> genres) {
		this.genres = genres;
	}

	public List<Playlist> getPlaylists() {
		return playlists;
	}

	public void setPlaylists(List<Playlist> playlists) {
		this.playlists = playlists;
	}

	@Override
	public String toString() {
		return "Song [id=" + id + ", title=" + title + ", artist=" + artist + ", imageURL=" + imageURL + ", songURL="
				+ songURL + ", songLength=" + songLength + ", releaseDate=" + releaseDate + ", album=" + album
				+ ", user=" + user + "]";
	}
	
	
}
