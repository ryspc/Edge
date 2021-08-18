package com.skilldistillery.rainbowbeat.services;

import java.util.List;

import com.skilldistillery.rainbowbeat.entities.User;

public interface UserService {
	
	List<User> allUsers();
	
	User userByUsername(String username);
	
	User updateUser(User user);
	
	User createUser(User user);
}
