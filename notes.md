## When you install Angular Material into an Angular project (using ng add @angular/material), the Angular CLI automatically updates several files in your project. Here’s what happens:

1. package.json

-> Adds @angular/material, @angular/cdk, and @angular/animations dependencies.

-> Example:

"dependencies": {
  "@angular/material": "^18.2.0",
  "@angular/cdk": "^18.2.0",
  "@angular/animations": "^18.2.0"
}

2. angular.json

-> Updates the styles and scripts arrays to include Angular Material theme and global styles.

-> Example change in build > options > styles:

"styles": [
  "src/styles.scss",
  "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
]

3. src/app/app.module.ts (only if you’re using NgModules, not standalone components)

-> Adds BrowserAnimationsModule import from @angular/platform-browser/animations.

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ...
  ]
})
export class AppModule {}


-> In Angular v16+ standalone projects, this goes to app.config.ts instead:

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync()]
};

4. index.html

-> Added in head tag

<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

-> add typography class in body tag

<body class="mat-typography">
  <app-root></app-root>
</body>

5. styles.scss

-> Added height - 100%, remove margin and set font-familly

/* You can add global styles to this file, and also import other style files */

html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }

**-----------------------------------------------------------------------------------------------------------------------------------------------------------**

## What is theming?

-> Angular Material's theming system lets you customize color, typography, and density styles for components in your application. 
-> The theming system is based on Google's Material Design specification.

### Note:

-> Use below file for sass functions - node_modules/@angular/material/_index.scss
-> Use below file for palatted - node_modules/@angular/material/core/theming/_palette.scss

