import {Component, AfterViewInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { MatPaginator } from '@angular/material/paginator';
import { Aerport } from '../../aerport.model';
import { AerportService } from 'src/app/services/services/aerport.service';
import { CustomCardComponent } from 'src/app/main/user/components/custom-card/custom-card.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'position','actions']; // Colonnes à afficher dans le tableau
  dataSource = new MatTableDataSource<Aerport>(); // Source de données du tableau, initialisée comme vide au départ

  @ViewChild(MatPaginator) paginator: MatPaginator;
last: any;

  constructor(private aerportService: AerportService, private dialog: MatDialog,
    public ngdialog: NgDialogAnimationService,private router: Router) {} 

  ngAfterViewInit() {
    this.aerportService.getAllAerports().subscribe(aerports => {
      this.dataSource.data = aerports; // Remplissez la source de données avec les utilisateurs récupérés
      this.dataSource.paginator = this.paginator; // Associez le paginator à la source de données
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  deleteAerport(id:any) {
   
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
        this.aerportService.deleteAerport(id).subscribe(() =>  {
          this.ngAfterViewInit();
          console.log('Utilisateur supprimé avec succès');
        }, error => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        });
      }
    });
  }
  naviguerVersPageAjout() {
    this.router.navigate(['/aeroport']); // '/ajout' est le chemin de la page d'ajout
  }

  naviguerVersRunway() {
    this.router.navigate(['/runway']); // '/ajout' est le chemin de la page d'ajout
  }
  naviguerVersTaxiway() {
    this.router.navigate(['/taxiway']); // '/ajout' est le chemin de la page d'ajout
  }
  naviguerVersApron() {
    this.router.navigate(['/apron']); // '/ajout' est le chemin de la page d'ajout
  }
  naviguerVersAerports() {
    this.router.navigate(['/aerports']); // '/ajout' est le chemin de la page d'ajout
  }
  

}