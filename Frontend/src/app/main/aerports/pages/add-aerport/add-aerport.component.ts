import { Component, OnInit } from '@angular/core';
import { AerportService } from 'src/app/services/services/aerport.service';
import { Aerport } from '../../aerport.model';
import { Router } from '@angular/router';
declare const google: any;
@Component({
  selector: 'app-add-aerport',
  templateUrl: './add-aerport.component.html',
  styleUrls: ['./add-aerport.component.css']
})
export class AddAerportComponent implements OnInit {
  map: google.maps.Map;
  marker: google.maps.Marker;

  constructor(private aerportService: AerportService,private router:Router) { }
  showMap: boolean = false;

  aerport: Aerport = {
    name: '',
    position: '' // Assurez-vous que la propriété position est initialisée
  };
  showSuccess: boolean = false; 
  saveAerport(): void {
    this.aerportService.create(this.aerport)
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

  ngOnInit() {
    
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
    this.aerport.position = `Lat: ${lat}, Lng: ${lng}`;

    // Mettre à jour la zone de texte si nécessaire
    const coordinatesInput = document.getElementById('position') as HTMLInputElement;
    coordinatesInput.value = this.aerport.position;
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
