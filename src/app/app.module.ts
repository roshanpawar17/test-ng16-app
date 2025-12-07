import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './ng-theme/header/header.component';
import { DashboardComponent } from './ng-theme/dashboard/dashboard.component';
import { FrameLayoutComponent } from './ng-theme/frame-layout/frame-layout.component';
import { NgThemeService } from './ng-theme/ng-theme.service';

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
    SharedModule
  ],
  providers: [NgThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
