import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { GamesComponent } from './pages/games/games.component';
import { BoardComponent } from './pages/board/board.component';
import { GameComponent } from './game.component';

const routes: Routes = [
  {
    path: '',
    component:GameComponent,

    children: [
      {
        path: '',
        pathMatch:"full",
        redirectTo:"/marvel-game/home",
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'create',
        component: CreateGameComponent,
      },
      {
        path: 'games',
        component: GamesComponent,
      },
      {
        path: 'board/:id',
        component: BoardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
