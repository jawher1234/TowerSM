package com.jawher.pfe.repository;

import com.jawher.pfe.model.Apron;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApronRepository extends MongoRepository<Apron, String> {
}
