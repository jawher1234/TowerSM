package com.jawher.pfe.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "aprons")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Apron {
    @Id
    private String id;
    private String name;
    private String positions;
    private Boolean dispo ;
}
