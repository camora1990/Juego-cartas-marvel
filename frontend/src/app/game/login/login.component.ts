import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { User } from '../interface/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
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
        };
        this.userService.addUser(user);
        this.router.navigate(['/home']);
      });
  }
}
