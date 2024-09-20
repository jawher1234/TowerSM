package com.jawher.pfe.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jawher.pfe.model.Aerport;

public interface AerportRepository  extends MongoRepository<Aerport, String>  {

}
