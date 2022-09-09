import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { User } from 'src/app/game/interface/user.model';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';
import { LoginService } from '../../services/login/login.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {}

  loginGoogle() {
    this.loginService
      .loginGoogle()
      .then(({ user: { displayName, uid, email, photoURL } }) => {
        const user: User = {
          displayName: displayName || '',
          email: email || '',
          photoURL: photoURL || '',
          uid,
          onLine: true,
          disable: false,
        };
        this.userService.addUser(user).then(() => {
          this.sweetAlertService.successfulMessage(
            `Welcome ${displayName}`,
            2500
          );
          this.router.navigate(['/marvel-game/home']);
        });
      });
  }
}
