import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgThemeRoutingModule } from './ng-theme-routing.module';
import { NgThemeComponent } from './ng-theme.component';
import { FrameLayoutComponent } from './frame-layout/frame-layout.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { TestChildComponent } from './test-child/test-child.component';
import { BackgroundDirective } from '../core/directives/background.directive';

@NgModule({
  declarations: [
    NgThemeComponent,
    FrameLayoutComponent,
    HeaderComponent,
    DashboardComponent,
    TestChildComponent,
    BackgroundDirective
  ],
  imports: [
    CommonModule,
    NgThemeRoutingModule,
    SharedModule
  ]
})
export class NgThemeModule { }
