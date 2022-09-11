package org.example.cardgame.application.handle.model;

import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.Data;

@Data
public class TableroViewModel {

  private Tablero tablero;
  private Integer tiempo;
  private Ronda ronda;


  @Data
  public static class Tablero {

    private String id;
    private Set<String> jugadores;
    private Boolean habilitado;
    private Map<String, List<MazoViewModel.Carta>> cartas;

  }

  @Data
  public static class Ronda {

    private Set<String> jugadores;
    private String numero;
    private Boolean estaIniciada;

  }

}