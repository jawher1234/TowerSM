package com.jawher.pfe.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jawher.pfe.model.User;
import com.jawher.pfe.repository.UserRepository;

@RestController
public class UserController {
	@Autowired
	private UserRepository repository;
	
	@PostMapping("/addUser")
	public User saveUser(@RequestBody User user ) {
		repository.save(user);
		return user;
		
		
	}
	@GetMapping("/findAllUsers")
	public List<User> getUsers(){
		
		return repository.findAll();
	}

}
