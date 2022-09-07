package org.example.cardgame.command;

import co.com.sofka.domain.generic.Command;
import java.util.Set;
import org.example.cardgame.values.JugadorId;
import org.example.cardgame.values.TableroId;

public class FinalizarRondaCommand extends Command {
    private String juegoId;

    private TableroId tableroId;
     private Set<JugadorId> jugadorIds;

    public FinalizarRondaCommand(String juegoId) {
        this.juegoId = juegoId;
    }

    public String getJuegoId() {
        return juegoId;
    }

    public void setJuegoId(String juegoId) {
        this.juegoId = juegoId;
    }
}
