package com.skilldistillery.rainbowbeat.services;

import com.skilldistillery.rainbowbeat.entities.Song;

public interface SongService{
	
	Song findBySongTitle(String title);
}
