import { Component, OnInit  } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvionService } from 'src/app/services/services/avion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avion-add',
  templateUrl: './avion-add.component.html',
  styleUrls: ['./avion-add.component.css']
})
export class AvionAddComponent implements OnInit {
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;
name:any;
vitesse:any;
type:any;
  constructor(private uploadService: AvionService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";
  
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile, this.name, this.vitesse, this.type).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
            // Redirection après succès du téléchargement
            this.router.navigate(['/avions']).then(() => {
              window.location.reload();  // Forcer le rechargement de la page si nécessaire
            });
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;
  
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
  
          this.currentFile = undefined;
        }
      );
    }
  }
}  
