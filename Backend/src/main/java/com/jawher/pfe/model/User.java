package com.jawher.pfe.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
  @Id
  private String id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;

  @DBRef
  private Set<Role> roles = new HashSet<>();
  
  @NotBlank
  private String position ;
  
  private  Avion avion ;
  private Status status ;

  public User() {
  }

  public User(String username, String email, String position, Avion avion, String password) {
    this.username = username;
    this.email = email;
    this.position = position;
    this.avion = avion;
    this.password = password;
   
  }

    public User(String id ,String username) {
        this.id = id;
        this.username = username;




    }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

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
  
  public void setPosition(String position) {
	    this.position = position;
	  }

	  public String getPosition() {
	    return position;
	  }
  

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
  public Avion getAvion() {
	    return avion;
	  }

	  public void setAvion(Avion avion) {
	    this.avion = avion;
	  }
	  
	  public Status getSatus() {
		    return status;
		  }

		  public void setStatus(Status status) {
		    this.status = status;
		  }
}