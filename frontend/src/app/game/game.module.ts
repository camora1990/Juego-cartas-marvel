import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { GamesComponent } from './pages/games/games.component';
import { BoardComponent } from './pages/board/board.component';
import { SharedModule } from '../shared/shared.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateGameComponent,
    GamesComponent,
    BoardComponent,
    GameComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    GameRoutingModule,
  ],
  exports: [],
})
export class GameModule {}
