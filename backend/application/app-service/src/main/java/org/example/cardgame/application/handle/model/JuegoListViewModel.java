package org.example.cardgame.application.handle.model;

import java.util.Map;
import lombok.Data;

@Data
public class JuegoListViewModel {
    private String id;
    private Boolean iniciado;
    private Boolean finalizado;
    private String uid;
    private Integer cantidadJugadores;
    private Map<String, String> jugadores;
    private Jugador ganador;


    @Data
    public static class Jugador {
        private String alias;
        private String jugadorId;

    }
}
