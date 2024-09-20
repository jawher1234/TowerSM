package com.jawher.pfe.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jawher.pfe.model.Avion;

public interface AvionRepository extends MongoRepository<Avion, String> {

}
