import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CreateComponent } from './create/create.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class UsersModule { }
