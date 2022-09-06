import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { HomeComponent } from './game/pages/home/home.component';
import { CreateGameComponent } from './game/pages/create-game/create-game.component';
import { GamesComponent } from './game/pages/games/games.component';
import { BoardComponent } from './game/pages/board/board.component';
import { LoginComponent } from './auth/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    ...canActivate(() => redirectLoggedInTo(['/home'])),
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/'])),
  },
  {
    path: 'create-game',
    component: CreateGameComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/'])),
  },
  {
    path: 'games',
    component: GamesComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/'])),
  },
  {
    path: 'board/:id',
    component: BoardComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/'])),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
