import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {CookieService} from 'ngx-cookie-service';


import { CoreModule } from './core/core.module';
import { SharedModule } from '../UI/Shared/shared.module';

import {ToastrModule} from "ngx-toastr";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonsModule} from "../UI/Material/Buttons/buttons.module";
import {MatDialogModule} from "@angular/material/dialog";
import {LayoutModule} from "../UI/Material/Layout/layout.module";
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { UploadComponent } from './upload/upload.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LoginComponent } from './main/login/page/login.component';
import { UsersComponent } from './main/user/pages/users/users.component';
import { CapitalizePipe } from './core/pipes/capitalize.pipe';
import { CustomCardComponent } from './main/user/components/custom-card/custom-card.component';
import { WidgetComponent } from './main/user/components/widget/widget.component';

import { Chart1Component } from './main/user/components/chart1/chart1.component';
import { QrCodeDialogComponent } from './main/user/components/qr-code-dialog/qr-code-dialog.component';
import { UserAddComponent } from './main/user/pages/users/user-add/user-add.component';
import { AvionsComponent } from './main/avion/pages/avions/avions.component';
import { AvionAddComponent } from './main/avion/pages/avion-add/avion-add.component';
import { AvionModule } from './main/avion/avion.module';
import { AvionRoutingModule } from './main/avion/avion-routing.module';

import { AerportRoutingModule } from './main/aerports/aerport-routing.module';
import { AddAerportComponent } from './main/aerports/pages/add-aerport/add-aerport.component';
import { AddTaxiwayComponent } from './main/aerports/taxiway/pages/add-taxiway/add-taxiway.component';
import { AddRunwayComponent } from './main/aerports/runway/pages/add-runway/add-runway.component';
import { SimulationComponent } from './main/aerportSim/simulation/simulation.component';
import { ShowAllComponent } from './main/aerports/pages/show-all/show-all.component';
import { HomeComponent } from './main/home/home.component';
import { SimulationCComponent } from './main/aerportSim/simulation-c/simulation-c.component';
import { ChatComponent } from './main/chat/chat.component';
import { AddApronComponent } from './main/aerports/apron/pages/add-apron/add-apron.component';
import { ChatStreamComponent } from './main/chat/chat-stream/chat-stream.component';
const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatListModule
];
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AppComponent,
    LoginComponent,
    ShowAllComponent,
    UploadComponent,
    WidgetComponent,
    CustomCardComponent,
    AddAerportComponent,
  
    Chart1Component,
    QrCodeDialogComponent,
    UserAddComponent,
    AddTaxiwayComponent,
    AddRunwayComponent,
    SimulationComponent,
    HomeComponent,
    SimulationCComponent,
   ChatComponent,
   AddApronComponent,
   ChatStreamComponent
    
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    BrowserModule,
    CoreModule,
    SharedModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
 AvionRoutingModule,
 AerportRoutingModule,
    FormsModule,
    ButtonsModule,
    MatDialogModule,
    LayoutModule,
      BrowserModule,
    HttpClientModule,
    MatSelectModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatIconModule,
    MatSliderModule,
    MatSlideToggleModule,
    SharedModule,
    ButtonsModule,
    LayoutModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatMenuModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    ...materialModules
  ],
  providers: [],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {

}
