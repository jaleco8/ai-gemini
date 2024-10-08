import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'home', component: HomeComponent }],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
