import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreatedocComponent } from './createdoc/createdoc.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'create-doc', component: CreatedocComponent },
    { path: 'dashboard', component: DashboardComponent },
      // Add other routes here
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to login by default
    // { path: '**', redirectTo: '/login' } // Wildcard route for a 404 page
];
