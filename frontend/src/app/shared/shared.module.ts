import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [LogoComponent, NavBarComponent],
  imports: [CommonModule, PrimeNgModule],
  exports: [LogoComponent, NavBarComponent],
})
export class SharedModule {}
