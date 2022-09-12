export interface Board {
  ronda: Round;
  cantidadJugadores: number;
  jugadoresIniciales: string[];
}

export interface Round {
  tiempo: number;
  jugadores: string[];
  numero: string;
  estaIniciada: boolean;
}
