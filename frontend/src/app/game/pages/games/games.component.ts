import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameModel } from '../../interface/game.model';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';

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
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: (resp) => {
        this.gamesNoStarted = resp.filter((e) => (e.iniciado == false));
        this.gamesStarted = resp.filter((e) => (e.iniciado == true));
      },
      error: (err) => {
        this.sweetAlertService.errorMessage();
        console.log(err);
      },
    });
  }
}
