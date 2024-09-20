package com.jawher.pfe.controllers;

import java.util.List;
import java.util.Optional;

import com.jawher.pfe.model.Apron;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jawher.pfe.model.Aerport;
import com.jawher.pfe.model.Runway;
import com.jawher.pfe.model.Taxiway;
import com.jawher.pfe.repository.AerportRepository;
import com.jawher.pfe.repository.TaxiwayRepository;
import com.jawher.pfe.service.AirportService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/airports")
public class AirportController {
    @Autowired
    private AirportService airportService;
    @Autowired
    private AerportRepository aerportRepository;
    
    @Autowired
    private TaxiwayRepository taxiwayRepository;

    @PostMapping
    public ResponseEntity<Aerport> createAirport(@RequestBody Aerport airport) {
        return new ResponseEntity<>(airportService.createAirport(airport), HttpStatus.CREATED);
    }

    @GetMapping("/aerports")
    public List<Aerport> getAllAirports() {
        return aerportRepository.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Aerport> getAerportById(@PathVariable("id") String id) {
      Optional<Aerport> aerportData = aerportRepository.findById(id);

      if (aerportData.isPresent()) {
        return new ResponseEntity<>(aerportData.get(), HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    }
    
    @GetMapping("/taxiways")
    public List<Taxiway> getAllTaxiway() {
        return taxiwayRepository.findAll();
    }
    
    @GetMapping("/taxiway/{id}")
    public ResponseEntity<Taxiway> getTaxiwayById(@PathVariable("id") String id) {
      Optional<Taxiway> taxiwayData = taxiwayRepository.findById(id);

      if (taxiwayData.isPresent()) {
          return new ResponseEntity<>(taxiwayData.get(), HttpStatus.OK);
        } else {
          return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
      }

    @PostMapping("/runways/{id}")
    public Runway addRunway(@PathVariable String id, @RequestBody Runway runway) {
        return airportService.addRunway(id, runway);
    }
    @PostMapping("/aprons/{id}")
    public Apron addApron(@PathVariable String id, @RequestBody Apron apron) {
        return airportService.addApron(id, apron);
    }
    @PostMapping("/taxiways/{id}")
    public Taxiway addTaxiway(@PathVariable String id, @RequestBody Taxiway taxiway) {
        return airportService.addTaxiway(id, taxiway);
    }
	  @DeleteMapping("/deleteAerport/{id}")
	  public ResponseEntity<HttpStatus> deleteAerport(@PathVariable("id") String id) {
		    try {
		    	aerportRepository.deleteById(id);
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    } catch (Exception e) {
		      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		  }
    
 
}