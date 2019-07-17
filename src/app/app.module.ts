import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { Web3Service } from './services/web3.service';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CreateComponent } from './components/hero/create/create.component';
import { EditComponent } from './components/hero/edit/edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroCardComponent,
    NavbarComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    Web3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
