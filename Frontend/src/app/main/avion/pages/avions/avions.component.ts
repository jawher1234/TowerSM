import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { NgDialogAnimationService } from 'ng-dialog-animation';




import { MatPaginator } from '@angular/material/paginator';


import { AvionService } from 'src/app/services/services/avion.service';
import { Avion } from '../../avion.model';
import { CustomCardComponent } from 'src/app/main/user/components/custom-card/custom-card.component';
import { AvionAddComponent } from '../avion-add/avion-add.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvionShowComponent } from '../avion-show/avion-show.component';
import { AvionModifyComponent } from '../avion-modify/avion-modify.component';


@Component({
  selector: 'app-avions',
  templateUrl: './avions.component.html',
  styleUrls: ['./avions.component.css']
})
export class AvionsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'vitesse', 'type','actions']; // Colonnes à afficher dans le tableau
  dataSource = new MatTableDataSource<Avion>(); // Source de données du tableau, initialisée comme vide au départ

  @ViewChild(MatPaginator) paginator: MatPaginator;
last: any;

  constructor(
    private service: AvionService,
    public ngdialog: NgDialogAnimationService,
    private fb: FormBuilder,private dialog: MatDialog  ) { }

  avionForm: FormGroup;
  listOfAvions:Avion[];
  openAddAvionDialog() {
    const dialogRef = this.dialog.open(AvionAddComponent);

  }

  
 
  openAvionDialog(id: any): void {
    this.service.get(id).subscribe(avion => {
      const dialogRef = this.dialog.open(AvionShowComponent, {
  
      });
    });
  }
  openmodAvionDialog(id: any) {
    this.service.get(id).subscribe(avion => {
      const dialogRef = this.dialog.open(AvionModifyComponent, {
        width: '600px', // Vous pouvez ajuster la largeur selon vos besoins
        data: { avion }
      });
    });
  }
  ngAfterViewInit() {
    this.service.getFiles().subscribe(avions => {
      this.dataSource.data = avions; // Remplissez la source de données avec les utilisateurs récupérés
      this.dataSource.paginator = this.paginator; // Associez le paginator à la source de données
    });
    this.avionForm = this.fb.group({
      id:[''],
      name:[''] ,
      type: [''] ,
       vitesse:	 [''] ,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteAvion(id:any) {
   
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
        this.service.deleteAvion(id).subscribe(() =>  {
          this.ngAfterViewInit();
          console.log('Avion supprimé avec succès');
        }, error => {
          console.error('Erreur lors de la suppression de l\'Avion', error);
        });
      }
    });
  }
}