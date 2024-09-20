package com.jawher.pfe.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.jawher.pfe.model.ERole;
import com.jawher.pfe.model.User;

public interface UserRepository extends MongoRepository<User, String> {
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);
  List<User> findByRoles_Name(ERole role);
  List<User> findByRoles_Id(String roleId);
  List<User> findByRoles_Name(String name);
  Boolean existsByEmail(String email);
  User findUserById(String userId);
  long countByRoles_Id(String roleId);
}
