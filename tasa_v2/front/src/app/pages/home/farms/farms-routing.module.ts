import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleByIdGuard } from 'src/app/shared/guards/role-by-id.guard';
import { RolAdministrador } from 'src/app/shared/models/role';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: 'create', component: CreateComponent,
        canActivate: [RoleByIdGuard],
        data: { roles: [new RolAdministrador().key] }
    },
    {
        path: 'view/:id', component: CreateComponent,
        data: { mode: 'view'}
    },
    {
        path: 'calendar', loadChildren: () =>
        import('./calendar/calendar.module').then((m) => m.CalendarModule),
    },
    {
        path: 'historical', loadChildren: () =>
        import('./historical/historical.module').then((m) => m.HistoricalModule),
        canActivate: [RoleByIdGuard],
        data: { roles: [new RolAdministrador().key] },
    },
    { path: 'list', component: ListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FarmsRoutingModule { }
