package com.jawher.pfe.controllers;

import java.io.File;
import java.util.Optional;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jawher.pfe.message.ResponseMessage;
import com.jawher.pfe.model.Avion;
import com.jawher.pfe.repository.AvionRepository;
import com.jawher.pfe.service.AvionService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/avion")
public class AvionController {
	
    AvionService avionService ;
	@Autowired
	   AvionRepository avionRepo;
	/*
    @PostMapping("/uploads")
    public ResponseEntity<String> uploadImages(@RequestParam("file") MultipartFile file,@RequestParam("name") String name) {
        try {
          
                Avion metadata = new Avion();
                metadata.setFileName(name);
                metadata.setFileName(file.getOriginalFilename());
    
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
    */
	  @PostMapping("/upload")
	  public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file,@RequestParam("name") String name,@RequestParam("type") String type,@RequestParam("vitesse") String vitesse) {
	    String message = "";
	    try {
	      Avion FileDB = new Avion();
	      FileDB.setFileName(file.getOriginalFilename());
	      FileDB.setName(name);
	      FileDB.setData(file.getBytes());
	      FileDB.setType(type);
	      FileDB.setVitesse(vitesse);
	      avionRepo.save(FileDB);

	      // Enregistrer le fichier dans un dossier sur le serveur
	      String uploadDir = "C:\\Users\\user\\Downloads\\TowerSim\\TowerSim\\src\\assets";
	      File fileToSave = new File(uploadDir + File.separator + file.getOriginalFilename());
	      file.transferTo(fileToSave);
	      message = "Uploaded the file successfully: " + file.getOriginalFilename();
	      return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
	    } catch (Exception e) {
	      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
	      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
	    }
	  }
    
    @GetMapping("/findAllAvions")
	public List<Avion> getAvions(){
		
		return avionRepo.findAll();
	}
    
    @GetMapping("/get/{id}")
	public ResponseEntity<Avion> getAvionById(@PathVariable("id") String id) {
    	Optional<Avion> avionData = avionRepo.findById(id);

		if (avionData.isPresent()) {
			return new ResponseEntity<>(avionData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
    
    
    
    @PutMapping("/avions/{id}")
    public ResponseEntity<Avion> updateAvion(@PathVariable("id") String id, @RequestBody Avion avion) {
      Optional<Avion> avionData = avionRepo.findById(id);

      if (avionData.isPresent()) {
    	  Avion _avion = avionData.get();
    	  _avion.setName(avion.getName());
    	  _avion.setType(avion.getType());
    	  _avion.setVitesse(avion.getVitesse());
        return new ResponseEntity<>(avionRepo.save(_avion), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    }
    
    
	  @DeleteMapping("/deleteAvion/{id}")
	  public ResponseEntity<HttpStatus> deleteAvion(@PathVariable("id") String id) {
	    try {
	    	avionRepo.deleteById(id);
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

    

}
