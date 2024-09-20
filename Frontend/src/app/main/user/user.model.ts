import { Avion } from "../avion/avion.model";
import { Role } from "./role.model";
export class User {
  id : string;
  username: string ;
  password: string ;
  email: string ;
  position:any;
  avion!:Avion;
  roles!: Role[];
  avions: Avion[];

}
