import { WebSocketService } from 'src/app/services/web-socket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ThreeJSOverlayView from '@ubilabs/threejs-overlay-view';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
declare const google: any;

@Component({
  selector: 'app-simulation-c',
  templateUrl: './simulation-c.component.html',
  styleUrls: ['./simulation-c.component.css']
})
export class SimulationCComponent implements OnInit, OnDestroy {
  map!: google.maps.Map;
  animationRunning = true;
  userSubscription: Subscription;
  positionSubscription: Subscription;
  overlays: { overlay: ThreeJSOverlayView, position: { lat: number, lng: number }, userId: string }[] = [];
  constructor(private userService: UserService,private webSocketService: WebSocketService) {}

  // Ajout de cette propriété pour gérer l'intervalle de mise à jour
  updateInterval: any;

  ngOnInit(): void {
    this.webSocketService.connect();
    this.webSocketService.getPositionUpdates().subscribe(positionUpdate => {
      const userId = positionUpdate.userId;
      const position = positionUpdate.position.split(', ');
      const lat = parseFloat(position[0].split(': ')[1]);
      const lng = parseFloat(position[1].split(': ')[1]);
      // Mettez à jour la position de l'avion ici
      this.updatePilotPosition(userId, lat, lng);
    });   
 
    
    const map = document.getElementById('map') as HTMLElement;
    const VIEW_PARAMS = {
      center: { lat: 36.854074840831764, lng: 10.22689685271522 },
      
      mapTypeControl: true,
      zoom: 20,
      heading: 90,
      tilt: 45,
      mapId: '15431d2b469f209e',
      mapTypeId: 'satellite'
    };

    this.map = new google.maps.Map(map, VIEW_PARAMS);
    const id = '650010b593f8814159262c25';
    // Initialize overlays array outside ngOnInit
    this.userSubscription = this.userService.getUsersByRoleId(id).subscribe(
      async (users) => {
        // Update existing overlays or add new ones
        for (const user of users) {
          if (user.avion && user.avion.fileName && user.position) {
            const fileName = user.avion.fileName;
            const positionParts = user.position.split(', ');
            const lat = parseFloat(positionParts[0].split(':')[1].trim());
            const lng = parseFloat(positionParts[1].split(':')[1].trim());

            if (!isNaN(lat) && !isNaN(lng)) {
              const existingOverlay = this.findOverlayByPosition(lat, lng);
              if (existingOverlay) {
                // Update existing overlay
                const avion = await this.loadAvion(fileName);
                existingOverlay.overlay.getScene().add(avion);
                existingOverlay.overlay.requestRedraw();
                this.updateOverlaysPosition();
              } else {
// Ajout d'un nouvel overlay
const newOverlay = new ThreeJSOverlayView({ lat, lng });
this.overlays.push({ overlay: newOverlay, position: { lat, lng }, userId: user.id });

// Assurez-vous que user.id est l'identifiant correct de l'utilisateur
const avion = await this.loadAvion(fileName);
// Ajoutez l'avion à la scène de l'overlay avec un nom unique
avion.name = 'Avion-' + user.id;
newOverlay.getScene().add(avion);

newOverlay.setMap(this.map);
newOverlay.requestRedraw();

              }
            } else {
              console.error('Error converting coordinates to numbers.');
            }
          }
        }
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );

    // Utilisez setInterval pour mettre à jour la position des avions toutes les quelques secondes
    this.updateInterval = setInterval(() => {
      this.updateOverlaysPosition();
    }, 0); // Update every 0 seconds (adjust as needed)



    
  }
  pilots: { userId: string, position: { lat: number, lng: number } }[] = [];
 
  updatePilotPosition(userId: string, lat: number, lng: number) {
    const overlayItem = this.overlays.find(o => o.userId === userId);
    if (overlayItem) {
        // Met à jour la position de l'overlay
        overlayItem.position = { lat, lng };
        // Convertit les coordonnées lat/long en coordonnées de position 3D dans la scène 3D
        const newPosition = overlayItem.overlay.latLngAltToVector3({ lat, lng });
        
        // Récupère l'objet 3D correspondant à l'avion dans la scène
        const avion = overlayItem.overlay.getScene().getObjectByName('Avion-' + userId);
        if (avion) {
            // Met à jour la position de l'avion dans la scène 3D
            avion.position.copy(newPosition);
            // Demande à l'overlay de redessiner la position mise à jour
            overlayItem.overlay.requestRedraw();
            console.log('Pilot position updated for userId:', userId, '- New Position:', overlayItem.position);
        } else {
            console.log('No airplane object found for this userId:', userId);
        }
    } else {
        // Si aucun overlay correspondant n'est trouvé, vous pouvez choisir de créer un nouvel avion ici
        console.log('No overlay found for this userId:', userId);
    }
}


  
  
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
  // Function to load the airplane model
  async loadAvion(fileName: string): Promise<any> {
    const url = './assets/Airbus.glb' ;
    return new Promise((resolve) => {
      const loaderGLTF = new GLTFLoader();
      loaderGLTF.load(url, function (gltf) {
        const group = gltf.scene;
        const Avion = group.getObjectByName('RootNode');
        Avion!.scale.setScalar(1/2);
        Avion!.rotation.set(Math.PI / 2, 0, Math.PI, 'ZXY');
        resolve(group);
      });
    });
  }

  // Modifiez cette fonction pour mettre à jour toutes les positions des avions
  updateOverlaysPosition() {
    this.overlays.forEach((overlay) => {
      overlay.overlay.requestRedraw();
    });
  }

  // Helper function to find an overlay by position
  findOverlayByPosition(lat: number, lng: number): { overlay: ThreeJSOverlayView, position: { lat: number, lng: number } } | undefined {
    return this.overlays.find(overlay => overlay.position.lat === lat && overlay.position.lng === lng);
  }
}
