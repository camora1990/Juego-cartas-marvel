export interface Board {
    tiempo:             number;
    ronda:              Round;
    cantidadJugadores:  number;
    jugadoresIniciales: string[];
}

export interface Round {
    jugadores:    string[];
    numero:       string;
    estaIniciada: boolean;
}
