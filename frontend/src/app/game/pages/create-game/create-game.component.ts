import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

import { v4 as uuidv4, v4 } from 'uuid';
import { User as CurrentUser } from '@angular/fire/auth';
import { GameService } from '../../services/game.service';
import { User } from 'src/app/game/interface/user.model';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';
import { UserService } from '../../../auth/services/user/user.service';
import { WebsocketService } from '../../services/websocket.service';
@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit, OnDestroy {
  formUsers: FormGroup;
  private minPlayers: number = 2;
  private maxPlayer: number = 5;
  users: User[] = [];
  private comandCreateGame: any;
  private gameId: string;
  private mainPlayer: CurrentUser;

  constructor(
    private userService: UserService,
    private gameService: GameService,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private webSocketService: WebsocketService
  ) {
    this.mainPlayer = this.userService.getCurrentUser()!;
    this.gameId = v4();
    this.formUsers = this.createFormUsers();
    this.comandCreateGame = {
      juegoId: this.gameId,
      jugadores: { [this.mainPlayer.uid]: this.mainPlayer.displayName },
      jugadorPrincipalId: this.mainPlayer.uid,
    };
  }
  ngOnDestroy(): void {
    this.webSocketService.close();
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.sort((a, b) => Number(b.onLine) - Number(a.onLine));
      },
    });
    this.webSocketService.conect(this.gameId).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => this.sweetAlertService.errorMessage(),
      complete: () => {
        console.log('create');
        this.sweetAlertService.successfulMessage();
        this.router.navigate(['/marvel-game/games']);
      },
    });
  }

  createFormUsers(): FormGroup {
    return new FormGroup({
      user: new FormControl('', [
        Validators.required,
        this.validateMinPlayer.bind(this),
      ]),
    });
  }

  validateMinPlayer(control: AbstractControl): ValidationErrors | null {
    const quatityPlayer = control.value.length;
    if (
      quatityPlayer < this.minPlayers - 1 ||
      quatityPlayer > this.maxPlayer - 1
    )
      return {
        minPlayer: `Start a game a minimum of ${this.minPlayers} players and a maximum of ${this.maxPlayer} is required.`,
      };

    return null;
  }

  getClaseOnline(user: User) {
    return user.onLine ? 'online mr-2' : 'offline mr-2';
  }

  createGame() {

    const users = this.formUsers.value.user as User[];

    const playersCommand = this.generatePlayersCommand(users);

    this.comandCreateGame = {
      ...this.comandCreateGame,
      jugadores: { ...this.comandCreateGame.jugadores, ...playersCommand },
    };
    this.gameService.createGame(this.comandCreateGame).subscribe({
      next: (res) => console.log(res),
      error: (err) => this.sweetAlertService.errorMessage(),
      complete: () => {
        this.disableUser(users);
        this.sweetAlertService.successfulMessage();
        this.router.navigate(['/marvel-game/games']);
      },
    });
  }

  private generatePlayersCommand(users: User[]) {
    return users.reduce((previous: any, current: User) => {
      return (previous = {
        ...previous,
        [current.uid]: current.displayName,
      });
    }, {});
  }

  private disableUser(users: User[]) {
    users.forEach(async (elem) => {
      this.userService
        .addUser({ ...elem, disable: true })
        .catch((err) => console.log(err));
    });
  }
}
