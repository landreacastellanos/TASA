import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CreateComponent } from './create/create.component';
import { UsersRoutingModule } from './users-routing.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class UsersModule { }
