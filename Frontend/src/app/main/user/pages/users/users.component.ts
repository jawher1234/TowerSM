import { Component, ElementRef, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { FormBuilder, FormGroup } from '@angular/forms';


import { CustomCardComponent } from '../../components/custom-card/custom-card.component';
import { AuthService } from '../../../../core/services/login/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { User } from '../../user.model';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserAddComponent } from './user-add/user-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

    displayedColumns: string[] = ['username', 'email', 'position', 'roles','actions']; // Colonnes à afficher dans le tableau
    dataSource = new MatTableDataSource<User>(); // Source de données du tableau, initialisée comme vide au départ
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
last: any;
  
    constructor(private userService: UserService,private service: UserService,  private dialog: MatDialog,
      public ngdialog: NgDialogAnimationService,private router: Router) {} // Injectez votre service UserService
      
    ngAfterViewInit() {
      this.userService.fetchAll().subscribe(users => {
        this.dataSource.data = users; // Remplissez la source de données avec les utilisateurs récupérés
        this.dataSource.paginator = this.paginator; // Associez le paginator à la source de données
      });
    }
    naviguerVersPageAjout() {
      this.router.navigate(['/users/add']); // '/ajout' est le chemin de la page d'ajout
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteUser(id:any) {
   
      const dialogRefDel = this.ngdialog.open(CustomCardComponent, {
        data: {
          message: `Are you sure you want to delete ?`,
          buttonText: {
            ok: 'Delete',
            cancel: 'cancel'
          }
        } ,
        backdropClass:'backdrop-bg-Add-User',
      });
      dialogRefDel.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.service.deleteUser(id).subscribe(() =>  {
            this.ngAfterViewInit();
            console.log('Utilisateur supprimé avec succès');
          }, error => {
            console.error('Erreur lors de la suppression de l\'utilisateur', error);
          });
        }
      });
    }
  }