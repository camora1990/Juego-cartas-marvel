package org.example.cardgame.websocket.generic;

public class DeserializeException extends RuntimeException {
    public DeserializeException(Throwable cause, String message) {
        super(cause);
    }
}