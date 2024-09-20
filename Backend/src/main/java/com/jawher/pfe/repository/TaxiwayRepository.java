package com.jawher.pfe.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jawher.pfe.model.Taxiway;

public interface TaxiwayRepository extends MongoRepository<Taxiway, String> {

}
