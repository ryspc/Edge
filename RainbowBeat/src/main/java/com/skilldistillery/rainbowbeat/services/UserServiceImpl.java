package com.skilldistillery.rainbowbeat.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.rainbowbeat.entities.User;
import com.skilldistillery.rainbowbeat.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	
	@Autowired
	private UserRepository userRepo;

	@Override
	public User userByUsername(String username) {
		return userRepo.findByUsername(username);
	}
}
