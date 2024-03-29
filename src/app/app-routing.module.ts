import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, PlansComponent, WelcomeComponent } from './components';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [LoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'plans', component: PlansComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
