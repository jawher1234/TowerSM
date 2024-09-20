package com.jawher.pfe.repository;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jawher.pfe.model.ERole;
import com.jawher.pfe.model.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
	  Optional<Role> findByName(ERole name);
	}