import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isLoading = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private toastr: ToastrService,private route: Router,) { }
  
  showSuccess(message:any, title:any) {
    this.toastr.success(message, title);
  }

  showError(message:any, title:any) {
    this.toastr.error(message, title);
  }

  ngOnInit(): void {
    localStorage.clear();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
  
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log(this.roles);
        
        this.isLoading = false;
        
        // Vérifier le rôle de l'utilisateur et rediriger en conséquence
        if (this.roles.includes('ROLE_ADMIN')) {
          this.route.navigate(['/home']);
        } else if (this.roles.includes('ROLE_PILOTE')){
          this.route.navigate(['/sim']);
        }else if (this.roles.includes('ROLE_CONTROLEUR')){
          this.route.navigate(['/simC']);
        }
        this.showSuccess('Login successful', 'Login successful');
        
      },
      err => {
        this.errorMessage = 'Login failed';
        this.showError('Login Failed', 'Login Failed');
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
