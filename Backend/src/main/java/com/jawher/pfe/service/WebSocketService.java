package com.jawher.pfe.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.jawher.pfe.model.PositionUpdate;

@Service
public class WebSocketService {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendPositionUpdate(String userId, PositionUpdate positionUpdate) {
        // Créer un nouvel objet JSON avec les données extraites de positionUpdate
        Map<String, Object> message = new HashMap<>();
        message.put("position", positionUpdate.getPosition());
        message.put("userId", userId);
        

        // Convertir et envoyer le message
        messagingTemplate.convertAndSend("/topic/userPosition", message);
    }
}