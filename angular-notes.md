
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

# @ViewChild

-> The ViewChild decorator is used to query and get a reference of the DOM element in the component. 

-> It returns the first matching element.

-> @ViewChild is a decorator in Angular that lets you access a child element, directive, or component from your TypeScript code (the class) — not just the template.

-> So if a template reference variable (#something) is used in HTML, then @ViewChild() is used in TypeScript to get that same element.

-> 

Metadata Properties:

1. selector - The directive type or the name used for querying.
2. read - Used to read a different token from the queried elements.

- The read property tells Angular what type of instance you want from the matched element.
- read → tells what type of thing you want back (HTML element? directive? template? container?).

3. static - True to resolve query results before change detection runs, false to resolve after change detection. Defaults to false.

-> Eg.

1]  Accessing an element        

<input #myInput type="text" placeholder="Enter name">
<button (click)="showValue()">Show Input Value</button>

@ViewChild('myInput') inputElement!: ElementRef;

or

@ViewChild('myInput', { static: false }) inputElement!: ElementRef;

showValue() {
  const value = this.inputElement.nativeElement.value;
  console.log('Input Value: ' + value);
}

Note: static: false - means we can not use this before change detection run. means we can not able to access in ngOnInit, throwing undefine nativeElement error.


2] Accessing an element

<input #myInput type="text" placeholder="Enter name">
<button (click)="showValue()">Show Input Value</button>

@ViewChild('myInput', { static: true }) inputElement!: ElementRef;

ngOnInit(): void {
  const value = this.inputElement.nativeElement.value;
  console.log('Input Value: ' + value);
}

Note: static: true - means we can use this before change detection run. means we can able to access in ngOnInit also, not throwing error.


3] Accessing a Child Component

// child.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>Hello from child!</p>`
})
export class ChildComponent {
  greet() {
    alert('Hello from Child Component!');
  }
}


<!-- app.component.html -->
<app-child></app-child>
<button (click)="callChild()">Call Child Method</button>


import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild(ChildComponent) childComp!: ChildComponent;

  callChild() {
    this.childComp.greet();
  }
}


4] Accessing a Directive

<p appHighlight #highlightDir>Hover me!</p>

@ViewChild('highlightDir') highlightDirective!: HighlightDirective;

ngAfterViewInit() {
  this.highlightDirective.highlight();  // Works ✅
}

<!-- custom directive: -->
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(public el: ElementRef) {}
  highlight() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}

5] read property:

1)

@ViewChild('paraRef', { read: ElementRef }) paragraphEl!: ElementRef;

ngAfterViewInit() {
  this.paragraphEl.nativeElement.style.color = 'red';
}

2) 

@ViewChild('tpl', { read: TemplateRef }) template!: TemplateRef<any>;
@ViewChild('tpl', { read: ViewContainerRef }) viewContainer!: ViewContainerRef;

- TemplateRef → gives access to the template itself (its content).
- ViewContainerRef → gives access to the container that can hold or render views.


**------------------------------------------------------------------------------------------------**


# @ViewChildren

-> The ViewChildren decorator is used to get a reference to the list of DOM element from the view template in the component class.

-> It returns all the matching elements.

-> @ViewChildren helps you access multiple child elements, directives, or components from your template at once.

-> Eg.

1] Access element

<input #inputEl type="text" placeholder="First">
<input #inputEl type="text" placeholder="Middle">
<input #inputEl type="text" placeholder="Last">

<button (click)="showValue()">Show Input Value</button>

@ViewChildren('inputEl') inputEl!: QueryList<ElementRef>;

showValue() {
  this.inputEl.forEach((el)=>{
    console.log('Input Element Value: ' + el.nativeElement.value);
  });
}

2] Access Component


<app-child></app-child>
<app-child></app-child>
<app-child></app-child>

@ViewChildren(ChildComponent) childComponents!: QueryList<ChildComponent>;

ngAfterViewInit() {
  console.log(this.childComponents); // list of all child components
  this.childComponents.forEach(child => child.sayHello());
}

- Has useful methods like:

.toArray() → converts to normal array

.forEach() → loop through items

.changes → observable that emits when the list updates


**------------------------------------------------------------------------------------------------**


# ng-template

-> ng-template is a container that holds HTML content which is not displayed by default —

-> it’s like a hidden HTML block that Angular can show or use later when needed.

-> Eg.

1] Basic Example

<ng-template>
  <p>This content is inside ng-template</p>
</ng-template>

2] Using with *ngIf

<p *ngIf="isLoggedIn; else loginBlock">Welcome back!</p>

<ng-template #loginBlock>
  <p>Please login</p>
</ng-template>


3] Using with *ngFor

<ng-template ngFor let-name [ngForOf]="names" let-i="index">
  <li>{{ name }}</li>
</ng-template>

4] Using a Template Reference (#)

<ng-template #greetTemplate>
  <h2>Hello, Angular Learner!</h2>
</ng-template>

<ng-container *ngTemplateOutlet="greetTemplate"></ng-container>

5] Passing Data into ng-template

<ng-template #userTemplate let-name="userName">
  <p>Welcome, {{ name }}!</p>
</ng-template>

<ng-container *ngTemplateOutlet="userTemplate; context: { userName: 'Roshan' }"></ng-container>

6]

<ng-template #myTpl>
  <p>Hello from Template!</p>
</ng-template>

@ViewChild('myTpl') tpl!: TemplateRef<any>;

ngAfterViewInit() {
  console.log(this.tpl); // TemplateRef object
  console.log('greetTemplate ', this.greetTemplate.createEmbeddedView({}).rootNodes[0].textContent); // Hello from Template!
}

**------------------------------------------------------------------------------------------------**

# ng-container

-> ng-container is just a logical container — it does not create any extra HTML element in the DOM.

-> It’s often used with ng-template for conditional or dynamic content.

-> ng-container is a special Angular element that can hold structural directives without adding new/extra elements to the DOM.

-> So Angular gives you ng-container as a lightweight placeholder that doesn’t affect your design.

-> Eg.

1] Using with *ngIf

<ng-container *ngIf="isLoggedIn">
  <p>Welcome back!</p>
  <button>Logout</button>
</ng-container>

Output in DOM:

<p>Welcome back!</p>
<button>Logout</button>


2] Using with *ngFor

<ng-container *ngFor="let item of items">
  <p>{{ item }}</p>
</ng-container>

3] Using with ngIf and ngElse

<ng-container *ngIf="isAdmin; else userBlock">
  <p>Welcome, Admin!</p>
</ng-container>

<ng-template #userBlock>
  <p>Welcome, User!</p>
</ng-template>


**------------------------------------------------------------------------------------------------**

# ng-content

-> ng-content is a placeholder in your component’s template where you can insert content from outside that component.

-> It’s used for content projection — which means:
📤 passing HTML from parent → to child and showing it inside the child’s layout.

-> Eg.

1]

frame-layout component - parent

<app-test-child>
  <h2 id="heading">Heading App Child</h2>
  <button mat-stroked-button color="primary" (click)="appHeader.testMeth()" class="btn">Click</button>
</app-test-child>

test-child component - child

<div>
  <ng-content select="#heading"></ng-content> -> <h2 id="heading">Heading App Child</h2>
  <p>App Child Component Para</p>
  <ng-content select=".btn"></ng-content> -> <button mat-stroked-button color="primary" (click)="appHeader.testMeth()" class="btn">Click</button>
</div>

2]

Parent Component (parent.component.html)

<app-child>
  <div card-header>🌟 My Custom Header</div>
  <p>This is the main content.</p>
  <div card-footer>© 2025 Footer here</div>
</app-child>


Child Component (child.component.html)

<div class="card">
  <header>
    <ng-content select="[card-header]"></ng-content>
  </header>

  <section>
    <ng-content></ng-content> <!-- default slot -->
  </section>

  <footer>
    <ng-content select="[card-footer]"></ng-content>
  </footer>
</div>


**------------------------------------------------------------------------------------------------**

# @ContentChild Decorator

-> The @ContentChild decorator is used to access a reference of a DOM element or a component or directive from the projected content into 
  child component class.

-> @ViewChild → looks inside the child’s own template
-> @ContentChild → looks inside the projected content (content passed from parent through ng-content)

-> Eg.

1] DOM element

frame-layout component - parent

<app-test-child>
  <div card-header>My Custom Header</div>
  <p #para>This is the main content.</p>
  <div card-footer>© 2025 Footer here</div>
</app-test-child>


test-child component - child .ts

<button (click)="getProjectedContent()">Show Content</button>

export class TestChildComponent {

  @ContentChild('para') para!: ElementRef<any>;

  getProjectedContent() {
    console.log('Project Content ', this.para);
    console.log('Project Content nativeElement ', this.para.nativeElement);
    console.log('Project Content nativeElement value - ', this.para.nativeElement.textContent);
    this.para.nativeElement.style.color = 'blue';
  }
}

2] Using a Directive in Projected Content

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {
  constructor(public el: ElementRef) {}
  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}


Parent Component:

<app-child>
  <p highlight>Project me!</p>
</app-child>

Child Component:

@ContentChild(HighlightDirective) highlighter!: HighlightDirective;

ngAfterContentInit() {
  this.highlighter.highlight('yellow');
}


**------------------------------------------------------------------------------------------------**

# @ContentChildren Decorator

-> @ContentChildren lets a child component access multiple elements, directives, or components that are projected from the parent into it (via <ng-content>).

-> @ContentChild → get one projected item.

-> @ContentChildren → get all projected items as a list (QueryList).

frame-layout component - parent

<app-test-child>
  <div card-header>🌟 My Custom Header</div>
  <p #para>This is the main content.</p>
  <p #para>This is the main content 2.</p>
  <div card-footer>© 2025 Footer here</div>
</app-test-child>

test-child component - child .ts

export class TestChildComponent {

  @ContentChild('para') para!: ElementRef<any>;
  @ContentChildren('para') paras!: QueryList<ElementRef>;

  getProjectedContent() {
    this.paras.forEach((para)=>{
      console.log('Project Content nativeElement ', para.nativeElement);
      para.nativeElement.style.color = 'blue';
    });
  }
}

**------------------------------------------------------------------------------------------------**

# Component Initialization

-> Component Initialization = The entire process of creating, setting up, rendering, and running lifecycle hooks of a component.

-> Change Detection Run's on:

  1. When @Input property change
  2. When DOM event happend (click, change)
  3. on setTimeout, setInterval 
  4. on API Calles

* Step 1: Component Class is Instantiated

-> Angular creates an instance of your component class.
-> The constructor runs first.

constructor() {
  console.log('1️⃣ Constructor called');
}

At this point:

-> Inputs are not yet set.
-> The template (HTML) is not rendered.
-> You can only initialize class-level variables here.

* Step 2: Input Properties are Set

-> If the parent passes data using @Input(), Angular sets those values after the constructor.
-> Eg. @Input() title!: string;
-> These are assigned before ngOnInit() runs.

# ngOnChanges() hook

* Step 3: ngOnChanges() (if inputs are present)

-> Called whenever an @Input property changes.
-> It runs before ngOnInit(), and also later if inputs update again.
-> Eg.

ngOnChanges(changes: SimpleChanges) {
  console.log('2️⃣ ngOnChanges called', changes);
}

-> Called when have change in currentValue and previousValue.


# ngOnInit() hook

* step 4: ngOnInit()

-> Called once after all inputs are set.
-> Perfect place to do initialization logic — like API calls or data setup.
-> Eg.

ngOnInit() {
  console.log('3️⃣ ngOnInit called');
}

At this point:

-> Inputs are ready ✅
-> Template is not yet fully rendered, but data is available.


# ngDoCheck() hook

* step 5: ngDoCheck()

-> Runs after each change detection cycle.
-> This hook invoked even if there is no change in input bound properties.
-> Used for custom change detection logic.
-> Eg.[title]="title"

ngDoCheck() {
  console.log('4️⃣ ngDoCheck called');
}


# ngAfterContentInit() hook

* Step 6: ngAfterContentInit()

-> The ngAfterContentInit() lifecycle hook is called after the components projected content has been fully initialized.
-> If the component uses @ContentChild or @ContentChildren, you can safely access them here.
-> This lifecycle hook gets called only once, during the first change detection cycle. After that, if the projected content changes, this lifecycle hook
  will not get called.
-> It is component only hook.
-> Eg.

ngAfterContentInit() {
  console.log('5️⃣ ngAfterContentInit called');
}


# ngAfterContentCheck() hook

* Step 7: ngAfterContentCheck()

-> Runs after each change detection cycle.
-> Runs every time projected content is checked by Angular.
-> If the component uses @ContentChild or @ContentChildren, you can safely access them here.
-> It is component only hook.
-> The ngAfterContentInit hook is called after the projected content is initialized.
  ngAfterContentCheck is called whenever the projected content is initialized, checked & updated.
-> Eg.

ngAfterContentChecked() {
  console.log('6️⃣ ngAfterContentChecked called');
}


# ngAfterViewInit()

* Step 8: ngAfterViewInit()

-> The ngAfterViewInit is called after the components view template and all its child components view template are fully initialized.
-> You can safely access @ViewChild and @ViewChildren here.
-> This hook is called during the first change detection cycle, when angular initializes the view for the first time.
-> It is component only hook.
-> Eg.

ngAfterViewInit() {
  console.log('7️⃣ ngAfterViewInit called');
}


# ngAfterViewChecked()

* Step 9: ngAfterViewChecked()

-> Runs after every change detection when the component’s view is updated.
-> You can safely access @ViewChild and @ViewChildren here.
-> It is component only hook. It is not availabel for directive.
-> Eg.

ngAfterViewChecked() {
  console.log('8️⃣ ngAfterViewChecked called');
}


# ngOnDestroy()

* Step 10: ngOnDestroy()

-> Called right before Angular removes the component from the DOM.

-> Use it to clean up:
  - Unsubscribe from Observables
  - Remove event listeners
  - Stop timers, etc.

-> Eg.

ngOnDestroy() {
  console.log('9️⃣ ngOnDestroy called');
}

**Note: Parent-child hook sequence:

1. Frame-layout parent contructor called 
2. Test child Constructor Called
3. Frame-layout parent OnInit called
4. Frame-layout parent DoCheck called
5. Frame-layout parent ngAfterContentInit called
6. Frame-layout parent ngAfterContentChecked called
7. Test child OnInit called
8. Test child DoCheck called
9. Test child ngAfterContentInit called
10. Test child ngAfterContentChecked called
11. Test child ngAfterViewInit called
12. Test child ngAfterViewChecked called
13. Frame-layout parent ngAfterViewInit called
14. Frame-layout parent ngAfterViewChecked called
15. Frame-layout parent DoCheck called
16. Frame-layout parent ngAfterContentChecked called

**------------------------------------------------------------------------------------------------**

# Custom attribute directive

-> A Custom Attribute Directive is a class that you create to change the look or behavior of an HTML element or Angular component.
-> It works just like Angular’s built-in directives — like ngClass, ngStyle, ngModel, etc.
-> Create Directive File

You can generate it using Angular CLI: 'ng generate directive highlight'
This will create: 'highlight.directive.ts'

-> Eg.

- test-child.component.ts

<h2 #h2Heading appBackground>Heading 2 {{name}}</h2>

- background.directive.ts

import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = 'red';
    this.el.nativeElement.style.color = 'white';
    this.el.nativeElement.style.padding = '1rem'
    this.el.nativeElement.style.margin = '1rem 0'
  }

}

**------------------------------------------------------------------------------------------------**

# Renderer2

-> Renderer2 is a service provided by Angular that lets you safely modify the DOM (add, remove, or style elements) in a way that works everywhere — not   just in the browser.

-> Renderer2 allows us to manipulate the DOM without accessing the DOM elements directly, by providing a layer of abtraction between the DOM element and
  the component code.

-> Why Not Use document or element.nativeElement Directly?

- Normally in JavaScript, you might do: document.getElementById('box').style.color = 'red';
- But Angular apps can run:

1. on servers (Angular Universal),
2. on mobile (NativeScript),
3. or in web workers (no real DOM!).

- So if you use direct DOM access like this 👇:

this.el.nativeElement.style.color = 'red';

…it might break in non-browser environments

- That’s why Angular gives you Renderer2 — a safe, cross-platform abstraction for DOM operations.

-> Eg.

1]

- test-child.component.ts

<h2 #h2Heading appBackground>Heading 2 {{name}}</h2>

- background.directive.ts

import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'red');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '1rem');
    this.renderer.setStyle(this.el.nativeElement, 'margin', '1rem 0');

    this.renderer.setProperty(this.el.nativeElement, 'textContent', 'Hello!');
    this.renderer.setAttribute(this.el.nativeElement, 'title', 'Hi');

    const newDiv = this.renderer.createElement('div');
    const text = this.renderer.createText('Hello from Renderer2!');
    this.renderer.appendChild(newDiv, text);
    this.renderer.appendChild(this.el.nativeElement, newDiv);

    this.renderer.listen(this.el.nativeElement, 'click', () => {
      alert('Element clicked!');
    });
  }

}


2] 


- test-child.component.ts

<h2 #h2Heading appBackground>Heading 2 {{na<p appBackground="lightgreen">Hover me for light green</p>
<p appBackground="pink">Hover me for pink</p>
<p appBackground>Hover me for default blue</p>me}}</h2>

- background.directive.ts

import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective implements OnInit {

  @Input('appBackground') appBackgroundColor: string = 'lightblue'; 

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.listen(this.el.nativeElement, 'mouseenter', () => {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appBackgroundColor);
    });

    this.renderer.listen(this.el.nativeElement, 'mouseout', () => {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '');
    });

    // this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appBackgroundColor);
  }

}

**------------------------------------------------------------------------------------------------**

# @HostLister()

-> @HostListener() is a decorator in Angular that allows you to listen to DOM events on the host element of a directive or component.

-> Where It’s Used

- Usually inside:

1. Custom attribute directives
2. Components (sometimes)

It allows you to handle user interactions without directly writing event bindings in HTML.

-> Eg.

- test-child.component.ts

<p appBackground="lightgreen">Hover me for light green</p>
<p appBackground="pink">Hover me for pink</p>
<p appBackground>Hover me for default blue</p>

- background.directive.ts

import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective implements OnInit {

  @Input('appBackground') appBackgroundColor: string = 'lightblue'; 

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event) {
    console.log('Mouseenter Event ', event);
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appBackgroundColor);
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: Event) {
    console.log('Mouseout Event ', event);
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '');
  }
}