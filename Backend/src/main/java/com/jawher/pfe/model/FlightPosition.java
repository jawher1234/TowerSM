package com.jawher.pfe.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightPosition {
    private double latitude;
    private double longitude;

    // Constructors, getters, setters...

    @Override
    public String toString() {
        return "FlightPosition{" +
                "latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}