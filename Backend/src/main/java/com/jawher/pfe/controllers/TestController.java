package com.jawher.pfe.controllers;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jawher.pfe.controller.UserController;
import com.jawher.pfe.model.Avion;
import com.jawher.pfe.model.ERole;
import com.jawher.pfe.model.PositionUpdate;
import com.jawher.pfe.model.Role;
import com.jawher.pfe.model.User;
import com.jawher.pfe.repository.AvionRepository;
import com.jawher.pfe.repository.UserRepository;

import com.jawher.pfe.security.services.UserDetailsServiceImpl;
import com.jawher.pfe.service.AvionService;
import com.jawher.pfe.service.UserNotFoundException;
import com.jawher.pfe.service.UsersService;
import com.jawher.pfe.service.WebSocketService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private UserRepository repository;
	
	@Autowired
     AvionService avionService ;
	@Autowired
	   AvionRepository avionRepo;
	@Autowired
	   UsersService userService;
	
	   @Autowired
	    private WebSocketService webSocketService;
	 private UserRepository userRepository ;
	 
	@Autowired
	UserDetailsServiceImpl userDetailsServiceImpl ;
    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("name") String name) throws IOException {
        Avion image = new Avion();
       
      
        
        avionRepo.save(image);
        return "Image uploaded successfully!";
    }
    
    @Autowired
    private SimpMessagingTemplate template;

    @PutMapping("/{userId}/positions")
    public ResponseEntity<?> updateUserPosition(@PathVariable String userId, @RequestBody String newPosition) {
        // Notez que l'ID est de type String pour MongoDB
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPosition(newPosition);
        userRepository.save(user);

        // Ici, vous pourriez vouloir envoyer la mise à jour à tous les clients via WebSocket
        // Cela dépend de votre implémentation WebSocket
         this.template.convertAndSend("/topic/userPosition", user);

        return ResponseEntity.ok().build();
    }




	
    @PostMapping("/uploads")
    public ResponseEntity<String> uploadImages(@RequestParam("file") MultipartFile file,
    		@RequestParam("type") String type,@RequestParam("name") String name,@RequestParam("vitesse") String vitesse) {
        try {
          
                Avion metadata = new Avion();
                metadata.setFileName(name);
                metadata.setFileName(file.getOriginalFilename());
                metadata.setType(type);
                metadata.setVitesse(vitesse);
                metadata.setData(file.getBytes());
                // Enregistrer les métadonnées du fichier 3D dans MongoDB
                avionRepo.save(metadata);

                // Enregistrer le fichier dans un dossier sur le serveur
                String uploadDir = "C:\\Users\\jawhe\\Desktop\\GRH_FONTENAY_IT_FE-groupProjectTask\\GRH_FONTENAY_IT_FE-groupProjectTask\\src\\assets";
                File fileToSave = new File(uploadDir + File.separator + file.getOriginalFilename());
                file.transferTo(fileToSave);

                return ResponseEntity.ok("Fichier 3D uploaded successfully.");
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'upload du fichier 3D.");
            }
        }
    

	
	
	
	
	
	
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@GetMapping("/user")
	@PreAuthorize("hasRole('ROLE_PILOTE') or hasRole('ROLE_CONTROLLEUR') or hasRole('ROLE_ADMIN')")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod")
	@PreAuthorize("hasRole('ROLE_CONTROLLEUR')")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
	@GetMapping("/findAllUsers")
	public List<User> getUsers(){
		
		return repository.findAll();
	}

	   private final UsersService usersService;

	    @Autowired
	    public TestController(UsersService usersService) {
	        this.usersService = usersService;
	    }

	    @GetMapping("/byRoleId/{roleId}")
	    public List<User> getUsersByRoleId(@PathVariable String roleId) {
	        return usersService.getUsersByRoleId(roleId);
	    }
	@GetMapping("/countByRole/{roleId}")
	public long getUsersCountByRole(@PathVariable String roleId) {
		return userService.getUsersCountByRole(roleId);
	}
	    @GetMapping("/byRoleName/{name}")
	    public List<User> getUsersByRoleName(@PathVariable String name) {
	        return usersService.getUsersByRoleName(name);
	    }

	
	   @GetMapping("/user/{id}")
		public ResponseEntity<User> getAvionById(@PathVariable("id") String id) {
	    	Optional<User> user = repository.findById(id);

			if (user.isPresent()) {
				return new ResponseEntity<>(user.get(), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

	  @DeleteMapping("/deleteUser/{id}")
	  public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") String id) {
	    try {
	      repository.deleteById(id);
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	  @PutMapping("/api/users/{userId}/position")
	    public ResponseEntity<?> updateUserP(
	            @PathVariable String userId,
	            @RequestBody Map<String, Double> position) {
	        try {
	            userService.updateUserPosition(userId, position.get("latitude"), position.get("longitude"));
	            return ResponseEntity.ok("Position mise à jour avec succès.");
	        } catch (UserNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        }
	    }
	    @PutMapping("/{userId}/position")
	    public void updateUserPosition(@PathVariable String userId, @RequestBody PositionUpdate positionUpdate) {
	        userService.updateUserP(userId, positionUpdate.getPosition());
	        webSocketService.sendPositionUpdate(userId,positionUpdate);
	    }

	
}
