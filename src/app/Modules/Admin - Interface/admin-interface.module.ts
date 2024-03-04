import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './Components/admin-home/admin-home.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { AdminProjectComponent } from './Components/admin-project/admin-project.component';


const userRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: AdminLoginComponent },

  { path: 'home', component: AdminHomeComponent },

  { path: 'project', component: AdminProjectComponent },

];
@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class AdminInterfaceModule { }
