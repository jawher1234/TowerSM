import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvionService {
  private baseUrl = 'http://localhost:8080/api/avion';

  constructor(private http: HttpClient) { }

  upload(file: File,name:string,type:string,vitesse:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.set('name',name);
    formData.set('type',type);
    formData.set('vitesse',vitesse);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAllAvions`);
  }
  deleteAvion(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteAvion/${id}`);
  }
  get(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/${id}`);
  }

  updateAvion(id: string, avion: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/avions/${id}`, avion);
  }
}
