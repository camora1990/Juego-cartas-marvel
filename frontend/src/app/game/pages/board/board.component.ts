import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';
import { GameService } from '../../services/game.service';
import { UserService } from '../../../auth/services/user/user.service';
import { Deck } from '../../interface/deck.model';
import { Board } from '../../interface/board.model';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  private gameId!: string;
  private userId: string;
  deck: Deck | null = null;
  board: Board | null = null;
  isMainPlayer: boolean = false;

  constructor(
    private websocketService: WebsocketService,
    private activatedRoute: ActivatedRoute,
    private gameServices: GameService,
    private userService: UserService,
    private sweetAlertService: SweetAlertService,
    private router: Router
  ) {
    this.userId = this.userService.getCurrentUser()?.uid!;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.gameId = id;
          return this.websocketService.conect(id);
        })
      )
      .subscribe(() => {
        console.log(this.gameId);
      });

    this.websocketService.conect(this.gameId).subscribe((res) => {
      console.log(res);
    });
    this.getDeckPlayer();
    this.getBoardId();
  }

  getDeckPlayer() {
    this.gameServices.getDeckByPlayer(this.userId, this.gameId).subscribe({
      next: (res) => {
        this.deck = res;
      },
    });
  }

  getBoardId() {
    this.gameServices.getBoard(this.gameId).subscribe({
      next: (res) => {
        if (res) {
          this.isMainPlayer = res.jugadorPrincipalId == this.userId;
          this.board = res;
        } else {
          this.sweetAlertService.errorMessage('Board not found!');
          this.router.navigate(['/marvel-game/games']);
        }
      },
    });
  }

  initGame() {
    this.gameServices.startGame({ juegoId: this.gameId }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
