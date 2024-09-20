import { Component, OnInit } from '@angular/core';
import { AerportService } from 'src/app/services/services/aerport.service';
import { Router } from '@angular/router';
import { Apron } from '../../apron.model';

@Component({
  selector: 'app-add-apron',
  templateUrl: './add-apron.component.html',
  styleUrls: ['./add-apron.component.css']
})
export class AddApronComponent  implements OnInit {
  map: google.maps.Map;
  marker: google.maps.Marker;
  aerports: any[] = [];
  selectedAerportId: string = ''; // Assurez-vous que cette ligne est présente
  markers: { lat: number, lng: number, confirmed: boolean }[] = [];
  constructor(private aerportService: AerportService,private router:Router) { }
  showMap: boolean = false;
  showSuccess: boolean = false; 
  apron: Apron = {
    name: '',
    positions: '' // Assurez-vous que la propriété position est initialisée
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

  placeMarker(location: any) {
    this.marker.setPosition(location);
    const lat = location.lat();
    const lng = location.lng();

    // Ajouter les nouvelles coordonnées à la liste des markers
    this.markers.push({
      lat, lng,
      confirmed: false
    });

    // Mettre à jour la valeur de chaque champ de texte
    this.updateTextBoxValues();

    // Afficher les valeurs dans la console
    this.logTextBoxValues();
  }

 markerDragEnd(event: any) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Mettre à jour la valeur de chaque champ de texte
    this.updateTextBoxValues();

    // Afficher les valeurs dans la console
    this.logTextBoxValues();
  }

  updateTextBoxValues() {
    // Update the value of each text field
    for (let i = 0; i < this.markers.length; i++) {
      const coordinatesInput = document.getElementById(`coordinates${i}`) as HTMLInputElement;
  
      // Check if the element exists before attempting to set its value
      if (coordinatesInput) {
        const marker = this.markers[i];
        coordinatesInput.value = `Latitude: ${marker.lat}, Longitude: ${marker.lng},`;
      } else {
        console.error(`Element with ID 'coordinates${i}' not found`);
      }
    }
  }
  


  // Ajout d'une fonction pour gérer la sélection de l'aéroport
  onAerportSelectionChange() {
    console.log('Aéroport sélectionné:', this.selectedAerportId);
    return this.selectedAerportId ;
  }

  logTextBoxValues() {
    // Concatenate all values into a single string
    const allValues = this.markers.map((marker, i) => `{"lat": ${marker.lat}, "lng": ${marker.lng}}`).join(', ');
  
    // Log the single string in the console
    console.log( allValues);
  }


// ... (existing code)

createApron(): void {
  // Concatenate all values into a single string
  const allValues = this.markers.map((marker) => `{"lat": ${marker.lat}, "lng": ${marker.lng}}`).join(', ');

  // Set the apron.positions property
  this.apron.positions = allValues;

  // Make the API call
  this.aerportService.createApron(this.selectedAerportId, this.apron)
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
confirmMarker(index: number) {
  // Changer l'état de confirmation du marqueur
  this.markers[index].confirmed = true;

  // Mettre à jour la valeur de chaque champ de texte
  this.updateTextBoxValues();
}


removeMarker(index: number) {
  // Retirer le marqueur de la liste des markers
  this.markers.splice(index, 1);

  // Mettre à jour la valeur de chaque champ de texte
  this.updateTextBoxValues();
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
