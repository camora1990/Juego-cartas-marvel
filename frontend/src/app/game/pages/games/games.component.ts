import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameModel } from '../../interface/game.model';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  gamesStarted: GameModel[] = [];
  gamesNoStarted: GameModel[] = [];

  constructor(
    private gameService: GameService,
    private sweetAlertService: SweetAlertService,
    private websocketService: WebsocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (resp) => {
        this.gamesNoStarted = resp.filter((e) => e.iniciado == false);
        this.gamesStarted = resp.filter((e) => e.iniciado == true);
      },
      error: (err) => {
        this.sweetAlertService.errorMessage();
        console.log(err);
      },
    });
  }

  startGame(gameId: string) {

    this.gameService.startGame({ juegoId: gameId }).subscribe({
      next: (res) => {
        console.log('the game started successfully');
        this.websocketService.conect(gameId).subscribe({
          next: (res) => console.log(res),
          error: () => this.sweetAlertService.errorMessage(),
        });
      },
      complete: () => {

        this.router.navigate([`/marvel-game/board/${gameId}`]);
      },
    });
  }
}
