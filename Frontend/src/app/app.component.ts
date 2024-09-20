import { Component, DoCheck, OnInit } from '@angular/core';
import { SidePanelState, DashboardLayoutConfiguration, SidePanelPosition } from './core';
import { NavigationLink } from '../UI/Shared';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { TokenStorageService } from './services/token-storage.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public configuration: DashboardLayoutConfiguration;
  isAdmin: boolean = false;
  isControleur: boolean = false;
  isPilote: boolean = false;
  public linksClient: NavigationLink[];
  public linksUser: NavigationLink[];
  public links: NavigationLink[];
  linksAdmin: NavigationLink[] = [
    new NavigationLink("Home", ['home'], "home"),
    new NavigationLink("Users", ['users'], "supervisor_account"),
    new NavigationLink("avions", ['avions'], "domain"),
    new NavigationLink("aerports", ['aerports'], "account_balance"),
    new NavigationLink("messages", ['messages'], "message"),
    new NavigationLink("simulation", ['sim'], "maps"),
  ];
  linksControleur: NavigationLink[] = [
    new NavigationLink("Home", ['home'], "home"),
    new NavigationLink("Users", ['users'], "supervisor_account"),
    new NavigationLink("avions", ['avions'], "domain"),
    new NavigationLink("aerports", ['aerports'], "account_balance"),
    new NavigationLink("messages", ['messages'], "message"),
  ];
  linksPilote: NavigationLink[] = [
    new NavigationLink("Home", ['home'], "home"),
    new NavigationLink("simulation", ['sim'], "maps"),
    new NavigationLink("aerports", ['aerports'], "account_balance"),
    new NavigationLink("messages", ['messages'], "message"),
  ];
  displayMenu = false;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showPiloteBoard = false;
  showControleurBoard = false;
  username: string;
  menuIcon: any;

  private role: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private location: Location,
    public ngdialog: NgDialogAnimationService
  ) {
    this.configuration = new DashboardLayoutConfiguration(
      SidePanelPosition.LEFT,
      SidePanelState.OPEN
    );
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLoginStatus();
      });

    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const userData = sessionStorage.getItem('auth-user');
    if (userData) {
      const user = JSON.parse(userData);
      const roles = user.roles;

      // Vérifiez si l'utilisateur possède un rôle spécifique
      this.isAdmin = roles.includes('ROLE_ADMIN');
      this.isControleur = roles.includes('ROLE_CONTROLEUR');
      this.isPilote = roles.includes('ROLE_PILOTE');

      this.displayMenu = true;
    } else {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      this.displayMenu = false;
      this.router.navigate(['/login']);
    }
  }
}
