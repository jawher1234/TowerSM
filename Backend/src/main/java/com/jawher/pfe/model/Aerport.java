package com.jawher.pfe.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "aerport")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Aerport {
	
    @Id
    private String id;
    private String name;
    private String position;
    
    private List<Runway> runways = new ArrayList<>();
    private List<Taxiway> taxiways = new ArrayList<>();
    private List<Apron> aprons = new ArrayList<>();


   

}
