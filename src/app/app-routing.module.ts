import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/theme',
    pathMatch: 'full' 
  },
  {
    path: 'theme',
    loadChildren: () => import('./ng-theme/ng-theme.module').then(m => m.NgThemeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
