import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../main/user/user.model';

const API_URL = 'http://localhost:8080/api/test/';
const API_URLs = 'http://localhost:8080/api/test/deleteUser';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  updateUserPosition(userId: string,position:string): Observable<any> {
    const url = `${API_URL}${userId}/position`;
    const body = { position };
    return this.http.put(url, body);
  }
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  fetchAll(): Observable<User[]> {
    

    return this.http.get<User[]>(API_URL +"findAllUsers");
   
  }
  getUsersCountByRole(roleId: string): Observable<number> {
    return this.http.get<number>(`${API_URL}countByRole/${roleId}`);
    // Assurez-vous d'avoir un endpoint correspondant dans votre API Spring Boot
  }
  get(id: any): Observable<User> {
    return this.http.get<User>(`${API_URL}user/${id}`);
  }
  getUsersByRoleId(roleId: any): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}byRoleId/${roleId}`);

  }



  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${API_URLs}/${id}`);
  }


}
