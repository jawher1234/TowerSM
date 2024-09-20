package com.jawher.pfe.service;

import com.jawher.pfe.model.Apron;
import com.jawher.pfe.repository.ApronRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jawher.pfe.model.Aerport;
import com.jawher.pfe.model.Runway;
import com.jawher.pfe.model.Taxiway;
import com.jawher.pfe.repository.AerportRepository;
import com.jawher.pfe.repository.RunwayRepository;
import com.jawher.pfe.repository.TaxiwayRepository;

@Service
public class AirportServiceImpl implements AirportService {
    @Autowired
    private AerportRepository airportRepository;

    @Autowired
    private RunwayRepository runwayRepository;
    @Autowired
    private ApronRepository apronRepository;
    @Autowired
    private TaxiwayRepository taxiwayRepository;

    @Override
    public Aerport createAirport(Aerport airport) {
        return airportRepository.save(airport);
    }

 
   
    public Taxiway addTaxiway(String id, Taxiway taxiway) {
        Aerport airport = airportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Airport not found"));

        taxiway = taxiwayRepository.save(taxiway);
        airport.getTaxiways().add(taxiway);
        airportRepository.save(airport);

        return taxiway;
    }
    
    public Runway addRunway(String id, Runway runway) {
        Aerport airport = airportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Airport not found"));

        runway = runwayRepository.save(runway);
        airport.getRunways().add(runway);
        airportRepository.save(airport);

        return runway;
    }
    public Apron addApron(String id, Apron apron) {
        Aerport airport = airportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Airport not found"));

        apron = apronRepository.save(apron);
        airport.getAprons().add(apron);
        airportRepository.save(airport);

        return apron;
    }
}