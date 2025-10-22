
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


**------------------------------------------------------------------------------------------------**

# @Input() property

-> This helps pass data from a parent component → to a child component.

-> @Input() is a decorator that lets a child component receive data from its parent component.

-> Use for custom property binding  

-> Eg.

1]

- frame-layout.component - parent component

.ts

@Component({
  selector: 'app-frame-layout',
  templateUrl: './frame-layout.component.html',
  styleUrls: ['./frame-layout.component.scss']
})
export class FrameLayoutComponent {
  title = 'Header';
}

.html

<!-- Child Component -->
<app-header [title]="title"></app-header>

- header.component - child component

.ts 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input() title: string = 'Default Title';

  ngOnInit(): void {
    console.log('Title:', this.title);
  }

}

**------------------------------------------------------------------------------------------------**


# @Output property

-> @Output() is a decorator that allows a child component to send data or events back to its parent component.

-> It usually works with something called EventEmitter — which literally “emits” an event the parent can listen to.

-> Use for custom event binding.

-> Eg.

1] 

- header.component - child component

.html

<mat-slide-toggle color="accent" (change)="setTheme($event.checked)">
  {{isDarkMode ? 'Dark Mode' : 'Light Mode'}}
</mat-slide-toggle>

.ts

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<any>();

  setTheme(isdark: boolean) {
    if (isdark) {
      this.toggleSidenav.emit(true);
    } else {
      this.toggleSidenav.emit(false);
    }
  }
}

- frame-layout.component - parent component

.html

<app-header [title]="title" (toggleSidenav)="onToggle($event)"></app-header>

.ts

@Component({
  selector: 'app-frame-layout',
  templateUrl: './frame-layout.component.html',
  styleUrls: ['./frame-layout.component.scss']
})
export class FrameLayoutComponent {
  title = 'Header';

  onToggle(isDarkMode: boolean) {
    console.log('Sidenav toggled. Dark mode is now:', isDarkMode);
  }
}


**------------------------------------------------------------------------------------------------**

# Template Reference variable

-> A template reference variable is a variable which stores a reference to a DOM element, Component or Directive on which it is used.

-> Eg.

1] DOM element Reference:

.html

<div>
  <input type="text" placeholder="Search..." #searchInput/>
  <button mat-raised-button color="accent" (click)="search(searchInput.value)">Search</button>
</div>

.ts

search(value: string) {
  console.log('Search value:', value);
}


2] Component Reference:

- frame-layout.component - parent component

.html

<app-header [title]="title" (toggleSidenav)="onToggle($event)" #appHeader></app-header>
<button mat-stroked-button color="primary" (click)="appHeader.testMeth()">Click</button>

- header.component

.ts

testMeth(){
  console.log('testMeth called');
}

3] Directive Reference:

<form #myForm="ngForm">
  <input name="username" ngModel required>
  <button [disabled]="!myForm.valid">Submit</button>
</form>


- #myForm="ngForm" assigns the Angular NgForm directive instance to myForm.
- You can then use myForm.valid or myForm.value to check form status or data.

**------------------------------------------------------------------------------------------------**
