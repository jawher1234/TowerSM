import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvionsComponent } from './pages/avions/avions.component';
import { AvionAddComponent } from './pages/avion-add/avion-add.component';

const routes: Routes = [
  {
    path: 'avions',
    component: AvionsComponent,
    
    children: [
      { path: 'add', component: AvionAddComponent },
    ],
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvionRoutingModule { }