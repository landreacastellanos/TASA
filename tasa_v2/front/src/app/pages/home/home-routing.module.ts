import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleByIdGuard } from '../../shared/guards/role-by-id.guard';
import { RolAdministrador, RolVendedorTASA, RolCapataz, RolDuenoDeLaFinca, RolSocioAdicional } from '../../shared/models/role';
import { CalendarActivitiesComponent } from './calendar-activities/calendar-activities.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'initial',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
        canActivate: [RoleByIdGuard],
        data: {
          roles: [
            new RolAdministrador().key,
            new RolVendedorTASA().key,
            new RolCapataz().key,
            new RolDuenoDeLaFinca().key,
            new RolSocioAdicional().key,
          ]
        },
      },
      {
        path: 'farms',
        loadChildren: () =>
          import('./farms/farms.module').then((m) => m.FarmsModule),
      },
      {
        path: 'initial',
        loadChildren: () =>
          import('./initial/initial.module').then((m) => m.InitialModule),
      },
      {
        path: 'chat/:idProperty/:idLand',
        loadChildren: () =>
          import('./chat/chat.module').then((m) => m.ChatModule),
        canActivate: [RoleByIdGuard],
        data: { roles: [new RolAdministrador().key] },
      },
      {
        path: 'calendar-activities',
        component: CalendarActivitiesComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
