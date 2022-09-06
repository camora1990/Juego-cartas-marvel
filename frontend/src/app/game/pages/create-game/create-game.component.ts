import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { User } from '../../interface/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {
  formUsers: FormGroup;
  private minPlayers: number = 2;
  private maxPlayer: number = 5;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.formUsers = this.createFormUsers();
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res
          .filter(
            ({ uid }) => uid !== this.userService.getCurrentUser()!.uid
          )
          .map((user) => {
            return { ...user, disable: !user.onLine };
          });
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

  createGame(){

  }
}
