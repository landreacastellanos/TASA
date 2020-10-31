import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [LoginGuard] },
    {
        path: 'not-found', loadChildren:
            () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
        path: 'reset-password', loadChildren:
            () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule), canActivate: [LoginGuard]
    },
    {
        path: 'restore-password', loadChildren:
            () => import('./pages/restore-password/restore-password.module').then(m => m.RestorePasswordModule), canActivate : [LoginGuard]
    },
    { path: '**', redirectTo: 'not-found' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }