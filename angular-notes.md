
# What is Angular — in simple terms

-> Angular is a framework (made by Google) used to build web apps, especially single-page applications (SPAs). SPAs are apps where much of the interaction happens without reloading the whole page. 

-> It uses TypeScript, which is like JavaScript + extra features (static types, classes, interfaces) to help you build more robust code. 

-> Angular has built-in tools (Angular CLI), architecture patterns (components, modules, services), and features like routing, dependency injection, forms etc. These help you organize, scale, test, maintain apps


**------------------------------------------------------------------------------------------------**


# First Steps: Setting up an Angular Project

-> Install Angular CLI : In your terminal: npm install -g @angular/cli

-> Create a new project : ng new my-first-angular-app — this creates files/folders, set up configuration etc. It might ask whether you want routing, which stylesheet format (CSS, SCSS) etc.

-> Serve the app locally : Go into your project folder, then ng serve --open. This runs a local dev server and opens your app in the browser (usually at http://localhost:4200).


**------------------------------------------------------------------------------------------------**


# View template of component

-> 

-> 

@Component({
  selector: 'app-dashboard',
  // templateUrl: './dashboard.component.html',
  templateUrl: './test.html',
  // template: `
  //   <h1>Hello</h1>
  //   <h2>Hello 2</h2>
  //   <h3>Hello 2</h3>
  // `,
  // styleUrls: ['./dashboard.component.scss']
  styles: [
    `h1{
      color: red;
      font-size: 30px
    }`, 
    
    'h2{color: blue}',

    `.h3-tag{
      color: orange;
    }`
  ]
})

**------------------------------------------------------------------------------------------------**


# Types of selector

1. Element selector
2. Attribute selector
3. Class selector

<!-- <app-header></app-header> // element-directive -->
<!-- <div app-header></div>  // attribute directive -->
<!-- <div class="app-header"></div>  // class directive -->

@Component({
  // selector: 'app-header', // element-directive
  // selector: '[app-header]', // attribute directive
  // selector: '.app-header', // class directive
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


**------------------------------------------------------------------------------------------------**


# Directive

-> A directive is an instructions to the DOM.

-> Types of Directives in Angular:

1. Component Directives:

- These are actually components — every component is a type of directive with a template.
- @Component({...})

- Every component you create is a directive with an HTML template.
- Eg.

@Component({
  selector: 'app-hello',
  template: `<p>Hello!</p>`
})
export class HelloComponent {}

- Here, <app-hello> becomes a directive that renders the component.


2. Attribute Directives:

- These change the appearance or behavior of elements — but don’t add/remove them.
- ngClass, ngStyle, custom ones

- Used to change style or behavior of an existing element.

1) ngClass:

- Add/remove CSS classes dynamically.
- Eg.

1] <h2 [ngClass]="isDarkMode ? 'white' : 'red'">Welcome</h2>
2] <h2 [ngClass]="{ 'red': isDarkMode, 'font-30': isActive }">Welcome</h2>


2) ngStyle:

- Set styles dynamically.
- Eg.

1]  

<h2 [ngStyle]="{ 
  'color': isDarkMode ? 'white' : 'red', 
  'backgroundColor': isActive ? 'red' : 'white', 
  'padding': isActive ? '10px' : '5px' 
}">
  Welcome
</h2>

3) Custom Directive

- 
- Eg.


3. Structural Directives:

- These change the structure of the DOM — add/remove elements.
- *ngIf, *ngFor, *ngSwitchCase

1) *ngIf:

- Show or hide elements:
- Eg.

1] <h2 *ngIf="isDarkMode">Welcome</h2>

2] With ng-templete

<h2 *ngIf="isDarkMode; else w1">Welcome 2</h2>
<ng-template #w1>
  <h2>Welcome</h2>
</ng-template>


2) *ngFor:

- Loop through a list:
- Eg.

1] 

<mat-list role="list" class="mat-elevation-z8">
    <ng-container *ngFor="let name of names; let i = index">
        <mat-list-item> {{ name + ' ' + (i + 1)  }} </mat-list-item>
    </ng-container>
</mat-list>

2] With ng-templete

<mat-list role="list" class="mat-elevation-z8">
    <ng-template ngFor let-name [ngForOf]="names" let-i = index>
        <mat-list-item> {{ name + ' ' + (i + 1)  }} </mat-list-item>
    </ng-template>
</mat-list>

3. *ngSwitchCase:

1] 

case = 'h';

<div [ngSwitch]="case">
  <p *ngSwitchCase="'r1'">Roshan</p>
  <p *ngSwitchCase="'o'">Omkar</p>
  <p *ngSwitchCase="'h'">Harsh</p>
  <p *ngSwitchCase="'r2'">Raj</p>
</div>

2] 

case = 1;

<div [ngSwitch]="case">
  <p *ngSwitchCase="1">Roshan</p>
  <p *ngSwitchCase="2">Omkar</p>
  <p *ngSwitchCase="3">Harsh</p>
  <p *ngSwitchCase="4">Raj</p>
</div>