package com.jawher.pfe.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.jawher.pfe.model.Avion;
import com.jawher.pfe.repository.AvionRepository;

@Transactional
@Service
public class AvionServiceImpl implements AvionService {

	
	 @Autowired
	 AvionRepository avionRepo ;
	
	
	
	
	@Override
	public Avion uplaodAvion(Avion avion) throws IOException {
		
	return avionRepo.save(avion);
	}
}
