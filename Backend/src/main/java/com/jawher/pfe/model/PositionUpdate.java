package com.jawher.pfe.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PositionUpdate {
	 private String userId;
	    private String position;

	    public PositionUpdate() {}

	    public PositionUpdate(String userId, String position) {
	        this.userId = userId;
	        this.position = position;
	    }
}
