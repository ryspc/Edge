package com.skilldistillery.rainbowbeat.controllers;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.rainbowbeat.entities.User;
import com.skilldistillery.rainbowbeat.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4291"})
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("users/{username}")
	public User getUserByUsername(@PathVariable String username,HttpServletResponse res) {
		User user = userService.userByUsername(username);
		return user;
	}
	
	@PostMapping("users")
	public User createUser(@RequestBody User user, HttpServletResponse res) {
		return userService.createUser(user);
	}
	
	@PutMapping("users")
	public User updateUser(@RequestBody User user, HttpServletResponse res) {
		return userService.updateUser(user);
	}
}
