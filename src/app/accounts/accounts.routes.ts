import { Routes } from '@angular/router';
import { RegisterComponent } from './presentation/views/register/register.component';
import { LoginComponent } from './presentation/views/login/login.component';

export const ACCOUNT_ROUTES: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];



