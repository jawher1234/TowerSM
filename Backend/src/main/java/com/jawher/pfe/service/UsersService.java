package com.jawher.pfe.service;
import com.jawher.pfe.model.User;
import com.jawher.pfe.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jawher.pfe.model.Avion;
import com.jawher.pfe.model.ERole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;


import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class UsersService {


	private final UserRepository userRepository;


	// Constructor with autowired injection to initialize userRepository and messagingTemplate
	@Autowired
	public UsersService(UserRepository userRepository) {
		this.userRepository = userRepository;

	}


	public List<User> getUsersByRoleId(String roleId) {
		return userRepository.findByRoles_Id(roleId);
	}

	public List<User> getUsersByRoleName(String name) {
		return userRepository.findByRoles_Name(name);
	}


	public User getUserById(String id) {

		return userRepository.findById(id).get();
	}

	public User saveUser(User user) {

		return userRepository.save(user);
	}

	public void updateUserP(String userId, String position) {
		User user = userRepository.findById(userId).orElse(null);
		if (user != null) {
			// Extraire les informations de latitude et longitude de la chaîne de caractères
			String[] parts = position.split(",");
			String latStr = null;
			String lngStr = null;
			for (String part : parts) {
				if (part.trim().startsWith("Lat:")) {
					latStr = part.split(":")[1].trim();
				} else if (part.trim().startsWith("Lng:")) {
					lngStr = part.split(":")[1].trim();
				}
			}

			// Formater la position sans perdre de précision
			if (latStr != null && lngStr != null) {
				String formattedPosition = String.format("Lat: %s, Lng: %s", latStr, lngStr);
				user.setPosition(formattedPosition);
				userRepository.save(user);
			} else {
				System.out.println("Invalid position format");
			}
		} else {
			// Gérer le cas où l'utilisateur n'est pas trouvé
			System.out.println("User not found");
		}
	}

	@Transactional
	public void updateUserPosition(String userId, double latitude, double longitude) {

		try {
			// Ajoutez des journaux pour déboguer

			Optional<User> optionalUser = userRepository.findById(userId);

			if (optionalUser.isPresent()) {
				User user = optionalUser.get();
				user.setPosition(String.format(Locale.US, "lat:%f, lng:%f", latitude, longitude));
				userRepository.save(user);
			} else {
				throw new UserNotFoundException("Utilisateur non trouvé avec l'ID : " + userId);
			}
		} catch (Exception e) {
			// Gérez les exceptions ici...
			e.printStackTrace();
		}
	}

	public long getUsersCountByRole(String roleId) {
		return userRepository.countByRoles_Id(roleId);

	}
}

