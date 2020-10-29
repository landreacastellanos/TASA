import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
