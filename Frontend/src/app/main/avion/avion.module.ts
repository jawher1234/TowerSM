import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {NavigationModule} from "../../../UI/Material/Navigation/navigation.module";
import {MatSelectModule} from "@angular/material/select";
import {ButtonsModule} from "../../../UI/Material/Buttons/buttons.module";
import {LayoutModule} from "../../../UI/Material/Layout/layout.module";
import {DatatableModule} from "../../../UI/Material/DataTables/datatable.module";
import {PopupsModule} from "../../../UI/Material/Popups/popups.module";
import {CoreModule} from "../../core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PortalModule} from "@angular/cdk/portal";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {CookieService} from "ngx-cookie-service";
import {HeadersInterceptor} from "../../core/interceptors/headers.interceptor";
import {SharedModule} from "../../../UI/Shared/shared.module";
import {CapitalizePipe} from "../../core/pipes/capitalize.pipe";
import {KeysPipe} from "../../core/pipes/key.pipe";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { AvionRoutingModule } from './avion-routing.module';
import { AvionsComponent } from './pages/avions/avions.component';
import { AvionAddComponent } from './pages/avion-add/avion-add.component';
import { AvionShowComponent } from './pages/avion-show/avion-show.component';
import { AvionModifyComponent } from './pages/avion-modify/avion-modify.component';





@NgModule({
  declarations: [
    AvionsComponent,
    AvionAddComponent,
    AvionShowComponent,
    AvionModifyComponent,
   
   
 

   
    

  ],
  imports: [
    CommonModule,
    AvionRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NavigationModule,
    MatSelectModule,
    ButtonsModule,
    LayoutModule,
    DatatableModule,
    PopupsModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    PortalModule,
    MatCheckboxModule,

    MatDatepickerModule,
    AppRoutingModule,
    FormsModule,
    
    SharedModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  providers: [
    CookieService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HeadersInterceptor,
      multi:true
    },
  ]
})
export class AvionModule {

}
