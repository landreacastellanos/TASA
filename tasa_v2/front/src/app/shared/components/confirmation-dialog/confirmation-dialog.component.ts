import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  public message: string;
  public subtitle: string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: any) {
      this.message = data?.message || '¿Eliminar permanentemente?';
      this.subtitle = data?.subtitle || '';
     }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

