import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AvionService } from 'src/app/services/services/avion.service';


@Component({
  selector: 'app-avion-modify',
  templateUrl: './avion-modify.component.html',
  styleUrls: ['./avion-modify.component.css']
})
export class AvionModifyComponent {
  avionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AvionModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { avion: any },
    private avionService: AvionService
  ) { }

  ngOnInit(): void {
    this.avionForm = this.fb.group({
      name: [this.data.avion.name, Validators.required],
      type: [this.data.avion.type, Validators.required],
      vitesse: [this.data.avion.vitesse, [Validators.required, Validators.min(0)]]
    });
  }

  onUpdate(): void {
    if (this.avionForm.valid) {
      this.avionService.updateAvion(this.data.avion.id, this.avionForm.value).subscribe(() => {
        this.dialogRef.close(true); // Fermez le dialogue et renvoyez un indicateur de succès
        window.location.reload();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); // Fermez le dialogue sans faire de modifications
    window.location.reload();
  }
}