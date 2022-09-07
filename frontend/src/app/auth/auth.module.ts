import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { GameModule } from '../game/game.module';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    GameModule,
    SharedModule,
    AuthRoutingModule
  ],

})
export class AuthModule {}
