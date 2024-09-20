import { Component, NgZone, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ThreeJSOverlayView from '@ubilabs/threejs-overlay-view';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { LOD } from 'three';

declare const google: any;

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit, OnDestroy {
  map!: google.maps.Map;
  overlays: { overlay: ThreeJSOverlayView, position: { lat: number, lng: number } }[] = [];
  avion: any;
  overlay: ThreeJSOverlayView;
  lastFrameTime: number;
  fileName: string | undefined;
  position: string | undefined;
  animationRunning = true;
  userSubscription: Subscription;
  updateInterval: any;
  userId: string | undefined; // Déclarer la propriété userId
  direction: { x: number, y: number, z: number } = { x: 0, y: 0, z: 0 };
  pitchAngle: number = 0;
  rollAngle: number = 0;
  yawAngle: number = 0;
  speed: number = 10;
  userOverlay: ThreeJSOverlayView | undefined;

  constructor(private ngZone: NgZone, private userService: UserService,private webSocketService: WebSocketService) {
    this.lastFrameTime = 0;
  }
  ngOnInit(): void {
    this.webSocketService.connect();

    const userString = sessionStorage.getItem('auth-user');

    if (userString) {
      const userObject = JSON.parse(userString);

      if (userObject && userObject.id) {
        this.userId = userObject.id; // Attribuer la valeur de l'ID de l'utilisateur
        this.userService.get(userObject.id).subscribe(
          async (user) => {
            if (user?.avion?.fileName && user?.position) {
              this.fileName = user.avion.fileName;
              this.position = user.position;

              // Deserialize the position string into a LatLng object
              if (this.position) {
                const positionParts = this.position.split(', ');

                if (positionParts.length === 2) {
                  const latString = positionParts[0].split(':')[1].trim();
                  const lngString = positionParts[1].split(':')[1].trim();

                  const lat = parseFloat(latString);
                  const lng = parseFloat(lngString);

                  if (!isNaN(lat) && !isNaN(lng)) {
                    const map = document.getElementById("map") as HTMLElement;
                    const VIEW_PARAMS = {
                      center: { lat, lng },
                      mapTypeControl: true,
                      zoom: 20,
                      heading: 90,
                      tilt: 45,
                      mapId: '15431d2b469f209e',
                      mapTypeId: 'roadmap'
                    };
       // Ajoutez cela dans la méthode ngOnInit, après la création de la carte
      if (this.map) {
        google.maps.event.addListener(this.map, 'dragend', () => {
          // Obtenez la nouvelle position après le déplacement
          const newMapCenter = this.map ? this.map.getCenter() : null;

          // Vérifiez si newMapCenter n'est pas undefined ou null
          if (newMapCenter) {
            const latitude = newMapCenter.lat();
            const longitude = newMapCenter.lng();

            // Mettez à jour la position de l'avion dans la base de données
            this.updateUserPositionOnMap(latitude, longitude, 0); // Add the missing third argument
          }
        });
      } else {
  console.error("La carte n'est pas définie.");
}
                    this.map = new google.maps.Map(map, VIEW_PARAMS);

                    this.overlay = new ThreeJSOverlayView(VIEW_PARAMS.center);
                    const scene = this.overlay.getScene();

                    this.overlay.setMap(this.map);

                    if (this.fileName) {
                      try {
                        this.avion = await this.loadAvion(this.fileName);
                        scene.add(this.avion);
                
                        // Set userOverlay to the overlay of the user's avion
                        this.userOverlay = this.overlay;
                        this.overlay.requestRedraw();
                        this.render();
                      } catch (error) {
                        console.error('Error loading airplane', error);
                      }
                    }
                  } else {
                    console.error('Error converting coordinates to numbers.');
                  }
                } else {
                  console.error('Invalid position format.');
                }
              } else {
                console.error('Position is undefined.');
              }
            }
          },
          (error) => {
            console.error('Error retrieving user', error);
          }
        );
      }
      
    }
    this.addOverlays();

  }

  

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    clearInterval(this.updateInterval);
  }
  

  async loadAvion(fileName: string): Promise<any> {
    const url = './assets/Airbus.glb';
    return new Promise((resolve, reject) => {
      const loaderGLTF = new GLTFLoader();
      loaderGLTF.load(url, (gltf) => {
        const group = gltf.scene;
        const Avion = group.getObjectByName('RootNode');
        Avion!.scale.setScalar(1/2);
        Avion!.rotation.set(Math.PI / 2, 0, Math.PI, 'ZXY');
        resolve(group);
      }, undefined, (error) => {
        reject(error);
      });
    });
  }

  render() {
    const renderFunction = () => {
      const currentTime = performance.now();
    
      if (this.avion) {
        this.ngZone.run(() => {
          this.overlay.requestRedraw();
        });
      }

      this.lastFrameTime = currentTime;
      requestAnimationFrame(renderFunction);
    };

    requestAnimationFrame(renderFunction);
  }

  updateOverlaysPosition() {
    this.overlays.forEach((overlay) => {
      overlay.overlay.requestRedraw();
    });

    // Update the userOverlay position
    if (this.userOverlay) {
      this.userOverlay.requestRedraw();
    }
  }

  findOverlayByPosition(lat: number, lng: number): { overlay: ThreeJSOverlayView, position: { lat: number, lng: number } } | undefined {    return this.overlays.find(overlay => overlay.position.lat === lat && overlay.position.lng === lng);
  }

  addOverlays() {
    const userString = sessionStorage.getItem('auth-user');
  
    if (userString) {
      const authUserId = JSON.parse(userString)?.id;
  
      this.userService.getUsersByRoleId('650010b593f8814159262c25').subscribe(
        async (users) => {
          // Vider le tableau des superpositions existantes
          this.overlays.forEach((overlay) => {
            (overlay.overlay as any).setMap(undefined);
          });
          this.overlays = [];
  
          for (const user of users) {
            if (user.id !== authUserId && user.avion && user.avion.fileName && user.position) {
              const fileName = user.avion.fileName;
              const positionParts = user.position.split(', ');
              const lat = parseFloat(positionParts[0].split(':')[1].trim());
              const lng = parseFloat(positionParts[1].split(':')[1].trim());
  
              if (!isNaN(lat) && !isNaN(lng)) {
                const existingOverlay = this.findOverlayByPosition(lat, lng);
                if (existingOverlay) {
                  // Mettre à jour la superposition existante
                  const avion = await this.loadAvion(fileName);
                  existingOverlay.overlay.getScene().add(avion);
                  existingOverlay.overlay.requestRedraw();
                } else {
                  // Ajouter une nouvelle superposition
                  const newOverlay = new ThreeJSOverlayView({ lat, lng });
                  this.overlays.push({ overlay: newOverlay, position: { lat, lng } });
                  const avion = await this.loadAvion(fileName);
                  newOverlay.getScene().add(avion);
                  newOverlay.setMap(this.map);
                  newOverlay.requestRedraw();
                }
              } else {
                console.error('Erreur de conversion des coordonnées en nombres.');
              }
            }
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des utilisateurs', error);
        }
      );
  
      // Utilisez setInterval pour mettre à jour la position des avions toutes les quelques secondes
      // ki tji tchouf zeydin
      this.updateInterval = setInterval(() => {
        this.updateOverlaysPosition();
      }, 0); // Mettez à jour toutes les 1000 millisecondes (ajustez selon vos besoins)
    }
  }  
  updateAvionPosition() {
    this.overlay.requestRedraw();
    this.calculateDirection();
    const newPosition = this.logPosition();
    this.position = JSON.stringify(newPosition);
    this.updateUserPositionOnMap(this.avion.position.x, this.avion.position.z, this.avion.position.y);
  }
  
  calculateDirection() {
    const pitch = this.pitchAngle;
    const roll = this.rollAngle;
    const yaw = this.yawAngle;
  
    // Calculate direction based on yaw, pitch, and roll
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const cosYaw = Math.cos(yaw);
    const sinYaw = Math.sin(yaw);
  
    this.direction.x = cosYaw * cosPitch;
    this.direction.y = sinPitch;
    this.direction.z = sinYaw * cosPitch;
  
    console.log('Direction - X:', this.direction.x, 'Y:', this.direction.y, 'Z:', this.direction.z);
  }
  
  moveForward() {
    if (this.avion) {
      this.avion.position.x += this.speed;
      this.overlay.requestRedraw();
      this.calculateDirection(); // Update direction
      const newPosition = this.logPosition();
      this.position = JSON.stringify(newPosition);

      this.updateUserPositionOnMap(this.avion.position.x, this.avion.position.z,this.avion.position.y);

    }
  }
  

  // Function to move the airplane backward
  moveBackward() {
    if (this.avion) {
      this.avion.position.x -= this.speed;
      this.overlay.requestRedraw();
      this.calculateDirection(); // Update direction
      const newPosition = this.logPosition();
      this.position = JSON.stringify(newPosition);

      this.updateUserPositionOnMap(this.avion.position.x, this.avion.position.z,this.avion.position.y);

    }
  }

  moveAvionAIr() {
    if (this.avion) {
      this.avion.position.z += 10; // You can adjust the value based on the desired distance
      this.overlay.requestRedraw();
      this.calculateDirection(); // Update direction
      const newPosition = this.logPosition();
      this.position = JSON.stringify(newPosition);
      this.updateUserPositionOnMap(this.avion.position.x, this.avion.position.z,this.avion.position.y);

    }
  }
  moveAvionAIrb() {
    if (this.avion) {
      this.avion.position.z += -10; // You can adjust the value based on the desired distance
      this.overlay.requestRedraw();
      this.calculateDirection(); // Update direction
      const newPosition = this.logPosition();
      this.position = JSON.stringify(newPosition);
      this.updateUserPositionOnMap(this.avion.position.x, this.avion.position.z,this.avion.position.y);

    }
  }

  moveAvionForward() {
    if (this.avion) {
      this.avion.position.x += 10; // Adjust the value based on the desired distance
      this.overlay.requestRedraw();
      this.calculateDirection(); // Update direction
      const newPosition = this.logPosition();
      this.position = JSON.stringify(newPosition);
      if (newPosition) {
        this.updateUserPositionOnMap(newPosition.lat, newPosition.lng, newPosition.alt);
      }
    }
  }
  
  moveAvionForwards() {
    if (this.avion) {
      this.avion.position.x -= 10; // Adjust the value based on the desired distance
      this.overlay.requestRedraw();
      this.calculateDirection(); // Update direction
      const newPosition = this.logPosition();
      this.position = JSON.stringify(newPosition);
      if (newPosition) {
        this.updateUserPositionOnMap(newPosition.lat, newPosition.lng, newPosition.alt);
      }
    }
  }
  
  
  adjustPitch(angleIncrement: number) {
    this.pitchAngle += angleIncrement;
    this.avion.rotation.x = this.pitchAngle;
    this.overlay.requestRedraw();
    this.calculateDirection(); // Update direction
    const newPosition = this.logPosition();
    this.position = JSON.stringify(newPosition);
    this.updateUserPositionOnMap(this.avion.position.x, this.avion.position.z, this.avion.position.y);
  }
  
  adjustRoll(angleIncrement: number) {
    this.rollAngle += angleIncrement;
    this.avion.rotation.z = this.rollAngle;
    this.overlay.requestRedraw();
    this.calculateDirection(); // Update direction
    const newPosition = this.logPosition();
    this.position = JSON.stringify(newPosition);
    if (newPosition) {
      this.updateUserPositionOnMap(newPosition.lat, newPosition.lng, newPosition.alt);
    }  }
  
  adjustYaw(angleIncrement: number) {
    this.yawAngle += angleIncrement;
    this.avion.rotation.y = this.yawAngle;
    this.overlay.requestRedraw();
    this.calculateDirection(); // Update direction
    const newPosition = this.logPosition();
    this.position = JSON.stringify(newPosition);
    if (newPosition) {
      this.updateUserPositionOnMap(newPosition.lat, newPosition.lng, newPosition.alt);
    }
    }
  
  
    // Function to adjust airplane speed
    adjustSpeed(speedIncrement: number) {
      this.speed += speedIncrement;
      this.position = JSON.stringify({
        lat: this.avion.position.x,
        lng: this.avion.position.z
      });
      this.updateUserPositionOnMap(this.avion.position.x, this.avion.position.z,this.avion.position.y);

    }
    moveUp() {
      if (this.avion) {
        this.avion.position.y += 10;
        this.overlay.requestRedraw();
        this.calculateDirection(); // Update direction
        const newPosition = this.logPosition();
        this.position = JSON.stringify(newPosition);
        if (newPosition) {
          this.updateUserPositionOnMap(newPosition.lat, newPosition.lng, newPosition.alt);
        }
      }
    }
  
    moveDown() {
      if (this.avion) {
        this.avion.position.y -= 10;
        this.overlay.requestRedraw();
        this.calculateDirection(); // Update direction
        const newPosition = this.logPosition();
        this.position = JSON.stringify(newPosition);
        if (newPosition) {
          this.updateUserPositionOnMap(newPosition.lat, newPosition.lng, newPosition.alt);
        }
      }
    }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'z':
        this.moveAvionForward();
        break;
        case 's':
          this.moveAvionForwards();
          break;

        case 'c':
          this.adjustPitch(0.1);
          break;
          case 'b':
          this.adjustPitch(-0.1);
          break;

          case 'd':
            this.adjustRoll(-0.1);
            break; 
            case 'q':
            this.adjustRoll(0.1);
            break; 
            case 'e':
              this.moveAvionAIr();
              break; 
              case 'r':
              this.moveAvionAIrb();
              break;
              case 'g':
              this.moveUp();
              break; 
              case 'f':
              this.moveDown();
              break;  
          
        
      // Add cases for other arrow keys if needed
    }
    
  }
  logPosition() {
    if (this.avion && this.map) {
      const mapCenter = this.map.getCenter();
      if (mapCenter) {
        const scalingFactor = 0.000007; // Adjust this value as needed
        const latitude = mapCenter.lat() + (this.avion.position.y * scalingFactor);
        const longitude = mapCenter.lng() + (this.avion.position.x * scalingFactor);
        const altitude = this.avion.position.z; // Get the altitude directly from the Y position
  
        console.log('Airplane Position - Latitude:', latitude, 'Longitude:', longitude, 'Altitude:', altitude, 'Direction:', this.direction);
        return { lat: latitude, lng: longitude, alt: altitude, dirX: this.direction.x, dirY: this.direction.y, dirZ: this.direction.z };
      }
    }
    return null;
  }
  
  
  private updateUserPositionOnMap(lat: number, lng: number, alt: number) {
    if (this.map && this.userId) {
      const position = `Lat: ${lat}, Lng: ${lng}, Alt: ${alt}, DirX: ${this.direction.x}, DirY: ${this.direction.y}, DirZ: ${this.direction.z}`;
  
      this.userService.updateUserPosition(this.userId, position).subscribe(
        (response) => {
          console.log('Position mise à jour avec succès sur le serveur.', response);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la position sur le serveur.', error);
        }
      );
    }
  }
  

}