import { Taxiway } from './../../taxiway.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AerportService } from 'src/app/services/services/aerport.service';

@Component({
  selector: 'app-add-taxiway',
  templateUrl: './add-taxiway.component.html',
  styleUrls: ['./add-taxiway.component.css']
})
export class AddTaxiwayComponent implements OnInit {
  map: google.maps.Map;
  marker: google.maps.Marker;
  aerports: any[] = [];
  selectedAerportId: string = ''; // Assurez-vous que cette ligne est présente

  constructor(private aerportService: AerportService,private router:Router) { }
  showSuccess: boolean = false; 
  showMap: boolean = false;

  taxiway: Taxiway = {
    name: '',
    position: '' // Assurez-vous que la propriété position est initialisée
  };

  loadAerports() {
    this.aerportService.getAllAerports().subscribe(
      (data) => {
        this.aerports = data;
        console.log();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
   
    this.loadAerports();
  }

  initMap() {
    // Coordonnées initiales
    const initialCoords = { lat: 36.85169351900409, lng: 10.227697355869703};

    // Créer la carte
    const map = document.getElementById("map") as HTMLElement;
    const VIEW_PARAMS = {
      center: { lat: 36.85169351900409, lng: 10.227697355869703},
      mapTypeControl: true,
      zoom: 20,
      heading: 90,
      tilt: 45,
      mapId:'15431d2b469f209e',
      mapTypeId:'satellite'
    };
    this.map = new google.maps.Map(map, VIEW_PARAMS);

    // Créer un marqueur
    this.marker = new google.maps.Marker({
      position: initialCoords,
      map: this.map,
      title: 'Hello World!'
    });

    this.marker.setDraggable(true);

    google.maps.event.addListener(this.marker, 'dragend', (event: any) => {
      this.markerDragEnd(event);
    });

    // Ajouter un écouteur pour obtenir la position au clic
    google.maps.event.addListener(this.map, 'click', (event: any) => {
      this.placeMarker(event.latLng);
    });
  }

  markerDragEnd(event: any) {
    // Obtenir la nouvelle position du marqueur après le déplacement
    this.updatePosition(event.latLng);
  }

  placeMarker(location: any) {
    // Mettre à jour la position sans déplacer le marqueur
    this.updatePosition(location);

    // Déplacer le marqueur si nécessaire
    this.marker.setPosition(location);
  }

  updatePosition(location: any) {
    // Mettre à jour la position du marqueur
    const lat = location.lat();
    const lng = location.lng();
    this.taxiway.position = `Lat: ${lat}, Lng: ${lng}`;

    // Mettre à jour la zone de texte si nécessaire
    const coordinatesInput = document.getElementById('position') as HTMLInputElement;
    coordinatesInput.value = this.taxiway.position;
  }

  // Ajout d'une fonction pour gérer la sélection de l'aéroport
  onAerportSelectionChange() {
    console.log('Aéroport sélectionné:', this.selectedAerportId);
    return this.selectedAerportId ;
  }
  createTaxiway(): void {
    

    this.aerportService.createTaxiway(this.selectedAerportId, this.taxiway)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.showSuccess = true; // Afficher la carte de succès
          setTimeout(() => {
            this.showSuccess = false; // Cacher la carte de succès après quelques secondes
          }, 5000);
          this.router.navigate(['/aeroports']).then(() => {
            window.location.reload();  // Forcer le rechargement de la page si nécessaire
          });
        },
        error: (e) => console.error(e)
      });
  }

  toggleMapCard() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      setTimeout(() => {
        this.initMap();
      }, 0);
    }
  }

 
}
