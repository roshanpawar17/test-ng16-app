import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './ng-theme/header/header.component';
import { DashboardComponent } from './ng-theme/dashboard/dashboard.component';
import { FrameLayoutComponent } from './ng-theme/frame-layout/frame-layout.component';
import { NgThemeService } from './ng-theme/ng-theme.service';
import { HeaderService } from './ng-theme/header/header.service';
import { DashboardService } from './ng-theme/dashboard/dashboard.service';
import { ReactiveFormsModule } from '@angular/forms';

export const HEADER_SERVICE = new InjectionToken<HeaderService>('HEADER_SERVICE');

@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // DashboardComponent,
    // FrameLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [NgThemeService, 
    {
      provide: HEADER_SERVICE,
      useClass: HeaderService
    }
  , DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
