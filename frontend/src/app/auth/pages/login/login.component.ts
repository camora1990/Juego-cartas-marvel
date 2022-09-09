import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UserService } from '../../../game/services/user.service';
import { User } from 'src/app/game/interface/user.model';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';

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
