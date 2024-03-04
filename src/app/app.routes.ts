import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },

  { path: 'user', loadChildren: () => import('./Modules/User - Interface/user-interface.module').then(m => m.UserInterfaceModule) },

  { path: 'admin', loadChildren: () => import('./Modules/Admin - Interface/admin-interface.module').then(m => m.AdminInterfaceModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
