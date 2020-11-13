import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FarmsRoutingModule } from './farms-routing.module';
import { ListComponent } from './list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FarmsRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class FarmsModule { }
