import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatSnackBar } from "@angular/material/snack-bar";

import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import { AuthService } from 'src/app/services/auth.service';
import { AerportService } from 'src/app/services/services/aerport.service';
import { AvionService } from 'src/app/services/services/avion.service';
import { Avion } from 'src/app/main/avion/avion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  AddUserForm: FormGroup;
  form = {
    username: '',
    password: '',
    email: '',
    position: '', // Assurez-vous que cette propriété est initialisée correctement
    avion: null,
    roles: []
  };
  selectedRole: string = '';   isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  taxiways: any[] = [];
  aeroports: any[] = [];
  avions: any[] = [];
  selectedTaxiwayId: string = ''; 
  selectedAvionId: string = '';
  selectedAeroportId: string = '';  
  constructor(
    private _snackBar: MatSnackBar,
    private snackBar: MatSnackBar,
private avionService:AvionService,
    private authService: AuthService,
    private aerportService:AerportService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.loadtaxiways();
    this.loadAvions();
    this.loadaeroports();
    

  }
  loadtaxiways() {
    this.aerportService.getAllTaxiways().subscribe(
      (data) => {
        this.taxiways = data;
        console.log();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  loadaeroports() {
    this.aerportService.getAllAerports().subscribe(
      (data) => {
        this.aeroports = data;
        console.log();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onRoleSelectionChange(event: any) {
    this.selectedRole = event.value;
    // Vous pouvez ajouter ici d'autres logiques en fonction du rôle sélectionné
  }

 
  loadAvions() {
    this.avionService.getFiles().subscribe(
      (data) => {
        this.avions = data;
        console.log();
      },
      (error) => {
        console.error(error);
      }
    );
  }



  onTaxiwaySelectionChange() {
    console.log('Aéroport sélectionné:', this.selectedTaxiwayId);
    this.form.position = this.selectedTaxiwayId;
  }

  onAvionSelectionChange() {
    console.log('Avion sélectionné:', this.selectedAvionId);
    this.form.avion = this.avions.find(avion => avion.id === this.selectedAvionId);
  }
  onAeroportSelectionChange() {
    console.log('Avion sélectionné:', this.selectedAeroportId);
    this.form.avion = this.aeroports.find(aeroport => aeroport.id === this.selectedAeroportId);
  }
  
// user-add.component.ts

onSubmit(): void {
  if (typeof this.form.roles === 'string') {
    this.form.roles = [this.form.roles]; // Convertit en tableau si nécessaire
  }
  this.authService.register(this.form).subscribe(
    data => {
      console.log(data);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      this.openSnackBar('User added', '');
      this.router.navigate(['/users']).then(() => {
        window.location.reload();  // Forcer le rechargement de la page si nécessaire
      }); 
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
      this.openSnackBar('Error adding user', '');
    }
  );
}




openSnackBar(message: string, action: string): void {
  this.snackBar.open(message, action, {
    duration: 2000, // Durée de la notification en millisecondes
  });
}
}
