import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
      // Add other routes here
    // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
    // { path: '**', redirectTo: '/login' } // Wildcard route for a 404 page
];
