import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/game/services/user.service';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/game/interface/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  items: MenuItem[] = [];
  user!: User;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/marvel-game/home'
      },
      {
        label: 'Create game',
        icon: 'fa-solid fa-circle-plus',
        routerLink: '/marvel-game/create',
      },
      {
        label: 'Games',
        icon: 'fa-solid fa-gamepad',
        routerLink: '/marvel-game/games',
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
      this.router.navigate(['/login']);
    });
  }
}
