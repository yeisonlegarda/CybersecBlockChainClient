import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroeComponent } from './components/heroe/heroe.component';
import { CreateComponent } from './components/hero/create/create.component';
import { EditComponent } from './components/hero/edit/edit.component';

const routes: Routes = [
  { path: 'heros', component: HeroeComponent },
  { path: 'editHero/:id', component: EditComponent },
  { path: 'createHero', component: CreateComponent },
  { path: '**', pathMatch: 'full',redirectTo:'heros' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
