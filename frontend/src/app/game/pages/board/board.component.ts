import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  private gameId!: string;
  constructor(
    private websocketService: WebsocketService,
    private activatedRoute: ActivatedRoute,
    private gameServices: GameService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          console.log(id);
          this.gameId = id;
          return this.websocketService.conect(id);
        }),
        tap(console.log)
      )
      .subscribe({
        next: (event) => {
          console.log(event);
        },
      });
    this.websocketService.conect(this.gameId).subscribe((res) => {
      console.log(res);
    });
  }

  initGame() {
    this.gameServices.initGame({ juegoId: this.gameId }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
