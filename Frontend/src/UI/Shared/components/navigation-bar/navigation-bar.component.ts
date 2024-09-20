import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidePanelService, SidePanelState } from '../../../../app/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: SidePanelState;
  menuIcon: any;
  color: string;
  private baseWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private urlSuffix = "&units=metric&APPID=abe1eb51289c21c167c66ce790c2fac3";
  username: string = ''; // Propriété pour stocker le username

  searchInput = new FormControl();
  weather: string;
  constructor(private http: HttpClient,private _sidePanelService: SidePanelService, private tokenStorageService: TokenStorageService, private route: Router) {
    this._subscriptionsSubject$ = new Subject<void>();
    const userString = sessionStorage.getItem('auth-user');
    let userId: number = 0;
    if (userString) {
      const user = JSON.parse(userString);
      this.username = user.username; // Assigner le username à la propriété

    }
  }
 
  
  ngOnInit(): void {

    this.menuIcon = 'apps'
    this._sidePanelService
      .panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: SidePanelState) => this.currentPanelState = state);
    this.color = Math.floor(0x1000000 * Math.random()).toString(16);
    this.color = '#' + ('000000' + this.color).slice(-6);
    this.getWeather('Tunis')
      .subscribe(
        res => {
          this.weather =
          `À Tunis, la température actuelle est de ${res.main.temp}°C, ` +
          `humidité : ${res.main.humidity}%, ` +
          `vent : ${res.wind.speed} m/s`;
        },
        err => console.log(`Can't get weather. Error code: %s, URL: %s`,
          err.message, err.url)
      );
  }
  
  public handleSingleClick(): void {
    console.log('single click');
    if (this.currentPanelState === SidePanelState.CLOSE || this.currentPanelState === SidePanelState.COLLAPSE) {
      this._sidePanelService.changeState(SidePanelState.OPEN);
      console.log(this.currentPanelState);
      this.menuIcon = 'apps';
    } else {
      this._sidePanelService.changeState(SidePanelState.COLLAPSE);
      console.log(this.currentPanelState);
      this.menuIcon = 'menu';
    }
  }
  public handleDoubleClick(): void {
    console.log('double click');
    if (this.currentPanelState === SidePanelState.CLOSE) {
      this._sidePanelService.changeState(SidePanelState.OPEN)
    } else {
      this._sidePanelService.changeState(SidePanelState.CLOSE);
    }
  }

  getUsername() {
    return JSON.stringify(localStorage.getItem('username'));
  }
  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }
  logout(): void {
    this.tokenStorageService.signOut();
    localStorage.clear();
  }

  getWeather(city: string): Observable<any> {
    return this.http.get(this.baseWeatherURL + city + this.urlSuffix)
      .pipe(catchError((err, caught) => {
        if (err.status === 404) {
          console.log(`City ${city} not found`);
          return EMPTY;
        }
        return caught;
      })
      );
  }
}
