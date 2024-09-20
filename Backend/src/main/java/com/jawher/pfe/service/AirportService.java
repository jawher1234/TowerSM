package com.jawher.pfe.service;

import com.jawher.pfe.model.Aerport;
import com.jawher.pfe.model.Runway;
import com.jawher.pfe.model.Taxiway;
import com.jawher.pfe.model.Apron;

public interface AirportService {

	 Aerport createAirport(Aerport airport);
	    Runway addRunway(String id, Runway runway);
	    Taxiway addTaxiway(String id, Taxiway taxiway);
	   Apron addApron(String id, Apron Apron);
	}
