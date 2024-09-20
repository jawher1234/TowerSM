package com.jawher.pfe.model;

public class Message {
	private String type;

	private String from;

	private String fromUserName;

	private String message;

	public Message() {	}

	public Message(String type, String from, String fromUserName, String message) {
		this.type = type;
		this.from = from;
		this.fromUserName = fromUserName;
		this.message = message;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getFromUserName() {
		return fromUserName;
	}

	public void setFromUserName(String fromUserName) {
		this.fromUserName = fromUserName;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
