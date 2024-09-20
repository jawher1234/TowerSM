package com.jawher.pfe.payload.request;

import java.util.Set;

import com.jawher.pfe.model.Avion;

import jakarta.validation.constraints.*;
 
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
  
    private String position ;
    
  
    private Avion avion ;
    
    
    private Set<String> roles;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
  
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public void setPosition(String position) {
	    this.position = position;
	  }

	  public String getPosition() {
	    return position;
	  }
	  public Avion getAvion() {
	        return avion;
	    }
	 
	    public void setAvion(Avion avion) {
	        this.avion = avion;
	    }
    
    public Set<String> getRoles() {
      return this.roles;
    }
    
    public void setRole(Set<String> roles) {
      this.roles = roles;
    }
}