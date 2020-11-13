import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    { path: 'create', component: CreateComponent },
    { path: 'view/:id', component: CreateComponent, data: { mode: 'view' } },
    { path: 'list', component: ListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FarmsRoutingModule {}
