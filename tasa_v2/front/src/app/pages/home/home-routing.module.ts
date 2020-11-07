import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,children:[
          { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
