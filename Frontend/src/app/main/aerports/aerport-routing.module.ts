import { AddAerportComponent } from './pages/add-aerport/add-aerport.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaxiwayComponent } from './taxiway/pages/add-taxiway/add-taxiway.component';
import { AddRunwayComponent } from './runway/pages/add-runway/add-runway.component';
import { AddApronComponent } from './apron/pages/add-apron/add-apron.component';


const routes: Routes = [
  {
    path: 'aeroport',
    component: AddAerportComponent, 
  },
  {
    path: 'taxiway',
    component: AddApronComponent,
    
    
  },
  {
    path: 'runway',
    component: AddRunwayComponent,
    
    
  },
  {
    path: 'apron',
    component: AddTaxiwayComponent,
    
    
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AerportRoutingModule { }