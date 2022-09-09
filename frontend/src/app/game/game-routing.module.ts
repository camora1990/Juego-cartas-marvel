import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { GamesComponent } from './pages/games/games.component';
import { BoardComponent } from './pages/board/board.component';
import { GameComponent } from './game.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/marvel-game/home',
      },
      {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: CreateGameComponent,
      },
      {
        path: 'games',
        pathMatch: 'full',
        component: GamesComponent,
      },
      {
        path: 'board/:id',
        pathMatch: 'full',
        component: BoardComponent,
      },
      {
        path: '404',
        component: ErrorComponent,
      },
      {
        path: "*",
        redirectTo: "/marvel-game/404"
      }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
