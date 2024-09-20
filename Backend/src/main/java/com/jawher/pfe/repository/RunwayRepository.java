package com.jawher.pfe.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jawher.pfe.model.Runway;

public interface RunwayRepository extends MongoRepository<Runway, String> {

}
