import { Runway } from "./runway/runway.model";
import { Taxiway } from "./taxiway/taxiway.model";

export class Aerport {
    id? : any;
    name?: string ;
    position?: any ;
    taxiways?:Taxiway[];
    runways?:Runway[];
    
  }
  