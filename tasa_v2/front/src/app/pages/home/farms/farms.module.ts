import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { FarmsRoutingModule } from './farms-routing.module';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FarmsRoutingModule
  ]
})
export class FarmsModule { }
