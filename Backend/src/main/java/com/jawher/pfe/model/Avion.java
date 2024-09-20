package com.jawher.pfe.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "avion")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Avion {
    @Id
    private String id;
    private String name;
    private String fileName;
    private String type;
    private String vitesse;
    private byte[] data;

}
