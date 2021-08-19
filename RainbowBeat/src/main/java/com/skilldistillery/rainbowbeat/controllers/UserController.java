package com.skilldistillery.rainbowbeat.controllers;

import java.util.List;


import javax.servlet.http.HttpServletRequest;
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
	
	@GetMapping("users")
	public List<User> getAllUsers(HttpServletRequest req, HttpServletResponse res){
		List<User> users = userService.allUsers();
		if(users == null) {
			res.setStatus(404);
		}
		return users;
	}
	
	@GetMapping("users/{username}")
	public User getUserByUsername(@PathVariable String username,HttpServletResponse res) {
		User user = userService.userByUsername(username);
		return user;
	}
	
	@GetMapping("users/{username}/following")
	public List<User> getFollowers(@PathVariable String username, HttpServletResponse res) {
		User user = userService.userByUsername(username);
		return user.getFollowing();
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
