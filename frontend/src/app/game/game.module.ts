import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CreateGameComponent } from './pages/create-game/create-game.component';
import { GamesComponent } from './pages/games/games.component';
import { BoardComponent } from './pages/board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@NgModule({
  declarations: [LoginComponent, HomeComponent, LogoComponent, NavBarComponent, CreateGameComponent, GamesComponent, BoardComponent],
  imports: [CommonModule, PrimeNgModule, ReactiveFormsModule, FormsModule,BrowserAnimationsModule],
  exports: [LoginComponent, HomeComponent],
})
export class GameModule {}
