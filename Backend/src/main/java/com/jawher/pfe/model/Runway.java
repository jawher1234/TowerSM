package com.jawher.pfe.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "runways")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Runway {
	   @Id
	    private String id;
	    private String name;
	    private String positions;
	    private Boolean dispo ;


}
