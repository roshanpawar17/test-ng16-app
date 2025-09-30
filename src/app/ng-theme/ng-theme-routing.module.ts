import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameLayoutComponent } from './frame-layout/frame-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgThemeComponent } from './ng-theme.component';

const routes: Routes = [
  {
    path: '',
    component: NgThemeComponent,
    children: [
      {
        path: '',
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgThemeRoutingModule { }
