import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aerport } from 'src/app/main/aerports/aerport.model';
import { Taxiway } from 'src/app/main/aerports/taxiway/taxiway.model';
const baseUrl = 'http://localhost:8080/api/airports';
@Injectable({
  providedIn: 'root'
})
export class AerportService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Aerport[]> {
    return this.http.get<Aerport[]>(baseUrl);
  }

  getAllAerports(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/aerports`);
  }
  deleteAerport(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteAerport/${id}`);
  }
  getAllTaxiways(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/taxiways`);
  }

  get(id: any): Observable<Aerport> {
    return this.http.get<Aerport>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  createTaxiway(id:any,data: any): Observable<any> {
    return this.http.post(`${baseUrl}/taxiways/${id}`, data);
  }
  createRunway(id:any,data: any): Observable<any> {
    return this.http.post(`${baseUrl}/runways/${id}`, data);
  }
  createApron(id:any,data: any): Observable<any> {
    return this.http.post(`${baseUrl}/aprons/${id}`, data);
  }
  getTaxiwaysByAerportId(id: string): Observable<Taxiway[]> {
    return this.http.get<Taxiway[]>(`${baseUrl}/aeroports/${id}/taxiways`);
  }
}
