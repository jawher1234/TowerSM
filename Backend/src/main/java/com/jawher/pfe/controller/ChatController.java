package com.jawher.pfe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.jawher.pfe.model.Message;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ChatController {
	   @Autowired
	    private SimpMessagingTemplate messagingTemplate;

	    @MessageMapping("message")
	    public void processMessage(@Payload Message message) {

	    }

}
