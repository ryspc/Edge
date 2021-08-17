package com.skilldistillery.rainbowbeat.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.rainbowbeat.services.UserService;

@RestController
@RequestMapping("api")
public class UserController {

	@Autowired
	private UserService userService;
}
