import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentDialogComponent } from 'src/UI/Shared/components/content-dialog/content-dialog.component';
import { AvionService } from 'src/app/services/services/avion.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel: ElementRef;
  images: HTMLCollection;
  currentIndex = 0;
  users:any;
  avions:any;
  adminCount: number;
  piloteCount: number;
  controleurCount: number;
  constructor(private renderer: Renderer2,
    private userService: UserService,
    private avionService: AvionService,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.images = this.carousel.nativeElement.getElementsByTagName('img');

    // Cacher toutes les images au début
    Array.from(this.images).forEach(img => {
      this.renderer.setStyle(img, 'display', 'none');
    });

    // Afficher uniquement l'image active
    this.renderer.setStyle(this.images[this.currentIndex], 'display', 'block');
  
    setInterval(() => {
      this.renderer.setStyle(this.images[this.currentIndex], 'display', 'none'); // Cacher l'image actuelle
      this.currentIndex = (this.currentIndex + 1) % this.images.length; // Passer à l'image suivante
      this.renderer.setStyle(this.images[this.currentIndex], 'display', 'block'); // Afficher la nouvelle image
    }, 7000); 
  }

  ngOnInit(): void {
      this.userService.fetchAll()
        .subscribe(res=>{
          this.users = res;
        })
        this.avionService.getFiles()
        .subscribe(res=>{
          this.avions = res;
        })
        this.getAdminCount();
        this.getPiloteCount();
        this.getControleurCount();
        
  }
  
  getAdminCount(): void {
    this.userService.getUsersCountByRole('650010b593f8814159262c26').subscribe(count => {
      this.adminCount = count;
      console.log('Admin Count:', this.adminCount);
    });
  }

  getPiloteCount(): void {
    this.userService.getUsersCountByRole('650010b593f8814159262c25').subscribe(count => {
      this.piloteCount = count;
      console.log('Pilote Count:', this.piloteCount);
    });
  }

  getControleurCount(): void {
    this.userService.getUsersCountByRole('650010b593f8814159262c27').subscribe(count => {
      this.controleurCount = count;
      console.log('Controleur Count:', this.controleurCount);
    });
  }
  handleUserSelect(user:any) {
    const dialogRef = this.dialog.open(ContentDialogComponent, {
      width: '500px',
      height: '400px',
      data: { user }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
