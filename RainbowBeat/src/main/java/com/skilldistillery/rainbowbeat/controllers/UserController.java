package com.skilldistillery.rainbowbeat.controllers;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.rainbowbeat.entities.User;
import com.skilldistillery.rainbowbeat.services.UserService;

@RestController
@RequestMapping("api")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("users/{username}")
	public User getUserByUsername(
			@PathVariable String username,
			HttpServletResponse res) {
		User user = userService.userByUsername(username);
		return user;
	}
}
