import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from '../../interface/user.model';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] = [];
  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) {}

  user!: User;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Create game',
        icon: 'fa-solid fa-circle-plus',
        routerLink: '/create-game',
      },
      {
        label: 'Games',
        icon: 'fa-solid fa-gamepad',
        routerLink: '/games',
      },
    ];

    const { displayName, email, photoURL, uid } =
      this.userService.getCurrentUser()!;
    this.user = {
      displayName: displayName || '',
      email: email || '',
      photoURL: photoURL || '',
      uid: uid,
      onLine: true,
    };
  }

  logout() {
    this.loginService.logout().then(async (res) => {
      this.user.onLine = false;
      await this.userService.updateUser(this.user);
      this.router.navigate(['/']);
    });
  }
}
