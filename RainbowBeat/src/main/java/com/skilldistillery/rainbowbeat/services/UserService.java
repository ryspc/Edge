package com.skilldistillery.rainbowbeat.services;

import com.skilldistillery.rainbowbeat.entities.User;

public interface UserService {
	
	User userByUsername(String username);
}
