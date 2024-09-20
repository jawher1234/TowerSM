import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './main/login/page/login.component';
import { UsersComponent } from './main/user/pages/users/users.component';
import { UserAddComponent } from './main/user/pages/users/user-add/user-add.component';
import { AvionsComponent } from './main/avion/pages/avions/avions.component';
import { AvionRoutingModule } from './main/avion/avion-routing.module';
import { AerportRoutingModule } from './main/aerports/aerport-routing.module';
import { SimulationComponent } from './main/aerportSim/simulation/simulation.component';
import { ShowAllComponent } from './main/aerports/pages/show-all/show-all.component';
import { HomeComponent } from './main/home/home.component';
import { SimulationCComponent } from './main/aerportSim/simulation-c/simulation-c.component';
import { ChatComponent } from './main/chat/chat.component';




const routes: Routes = [
 
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    
  },
  {
    path: 'users/add',
    component: UserAddComponent,
    
  },
  {
    path: 'sim',
    component: SimulationComponent,
  },
  {
    path: 'simC',
    component: SimulationCComponent,
  },
  {
    path: 'aeroports',
    component: ShowAllComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  }, 
   {
    path: 'home',
    component: HomeComponent,
  },

  {path: 'chat',
     component: ChatComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false}),
    AvionRoutingModule,
    AerportRoutingModule


  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
