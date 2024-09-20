package com.jawher.pfe.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.jawher.pfe.model.Avion;

public interface AvionService {
	Avion uplaodAvion(Avion avion) throws IOException;

}
