import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatIconModule, MatRadioModule, MatTableModule,
    MatCardModule, MatDatepickerModule, MatListModule, MatMenuModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatSnackBarModule, MatBadgeModule
  ],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatIconModule, MatRadioModule, MatTableModule,
    MatCardModule, MatDatepickerModule, MatListModule, MatMenuModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatSnackBarModule, MatBadgeModule]
})
export class MaterialModule { }
