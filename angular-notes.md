
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

# Angular Folder Structure

1) package.json :

1️⃣ What is package.json? (Big Picture)

-> package.json is the identity card + dependency manager + command center of your Angular project.

It tells:

  📦 What your project is
  🔗 Which libraries it depends on
  🧪 Which scripts/commands can be run
  ⚙️ How the project behaves with Node/NPM

Angular itself cannot run without package.json.

-> Proper Definition of package.json:

package.json is a configuration and metadata file used by Node.js and npm that defines a project’s identity, dependencies, scripts, and behavioral rules required to develop, build, run, and manage a JavaScript or Angular application.

-----------------------------------------------

2️⃣ A Typical Angular package.json

Example (simplified):

{
  "name": "my-angular-app",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint"
  },
  "dependencies": {
    "@angular/core": "^17.0.0",
    "@angular/common": "^17.0.0",
    "rxjs": "~7.8.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular/cli": "^17.0.0",
    "typescript": "~5.3.0"
  }
}

-----------------------------------------------

-> Now let’s deep dive into every section.

3️⃣ name

"name": "my-angular-app"

Purpose:

  1. Project name
  2. Used by npm
  3. Used when publishing a package (libraries)

Rules:

  ✅ lowercase
  ❌ no spaces
  ❌ no special characters except -

Real-world note:

  For Angular applications, this is mostly informational.
  For Angular libraries, it becomes very important.

------------------------

4️⃣ version

"version": "0.0.1"

Purpose:

Uses Semantic Versioning: MAJOR.MINOR.PATCH

Example:

  1.0.0 → stable release
  1.1.0 → new feature
  1.1.1 → bug fix

In Angular apps:

  * Mostly not critical unless you publish the app as a package
  * Still useful for tracking releases

Semantic Versioning is a standard way to version software so that:

  * Developers know what changed
  * Tools (npm, Angular CLI) know what is safe to upgrade
  * Apps don’t break unexpectedly

Format: MAJOR.MINOR.PATCH
Example: 1.4.2

-> Meaning of Each Part (Deep Explanation)

🔴 MAJOR version (1.x.x)

Rule:

  * Increment MAJOR when you make breaking changes
  * Breaking change = existing code will stop working.

Examples:

  * API method removed
  * Function signature changed
  * Behavior changed in incompatible way

Example:

// v1.0.0
getUser(id: number)

// v2.0.0 (BREAKING)
getUser(userId: string)

🔴 Breaking Changes — Explained with Real Examples

A breaking change means:

  Existing code that worked earlier will fail to compile, fail at runtime, or behave incorrectly after upgrading.

1️⃣ API Method Removed

What does this mean?

  A public method that developers were using is deleted in the new version.

Example (Library / Service):

Old version (v1.0.0)

  export class UserService {
    getUser(id: number) {
      return http.get(`/users/${id}`);
    }
  }

Your app code:

  this.userService.getUser(10);


New version (v2.0.0)

  export class UserService {
    // getUser() REMOVED ❌
  }

What happens?

❌ TypeScript compile error:

Property 'getUser' does not exist on type 'UserService'

Angular Real Example:
Angular removed:

  Http module (old)
  Replaced by HttpClient
  Apps broke → major version upgrade


2️⃣ Function Signature Changed

What is a function signature?

It includes:

  Function name
  Parameters (type, order, count)
  Return type

Example 1: Parameter type changed

Old (v1.0.0)
  getUser(id: number)

New (v2.0.0)
  getUser(id: string)

Old usage:

getUser(10); // ❌ now broken


Example 2: Parameter removed

Old
  getUser(id: number, isAdmin: boolean)

New
  getUser(id: number)


Old call:

getUser(10, true); // ❌

Example 3: Return type changed

Old
  getUser(): User

New
  getUser(): Observable<User>


Old code:

const user = getUser();
console.log(user.name); // ❌ now async


3️⃣ Behavior Changed in an Incompatible Way

⚠️ This is most dangerous, because:

  Code compiles
  App runs
  But behavior is wrong

Example 1: Default value changed

Old
  saveUser(user, validate = false)

New
  saveUser(user, validate = true)


Old code:
  saveUser(user); // validation OFF before, ON now ❌


Example 2: Logic changed

Old behavior
deleteUser(id);
// Soft delete (mark inactive)

New behavior
deleteUser(id);
// Hard delete (permanent)

🚨 Data loss risk

✅ Short Summary

  API removed → code doesn’t compile
  Signature changed → types & logic break
  Behavior changed → silent bugs (worst kind)

All require MAJOR version increment

🟡 MINOR version (x.1.x)

Rule:

  Increment MINOR when you add new features that are backward compatible
  Backward compatible = old code still works.

Examples:

  New method added
  Optional parameter added
  New component added (Angular)

1️⃣ New Method Added

What does this mean?

  A new method is added to a class/service,
  but existing methods are untouched.

Example (Service)

Old version – v1.0.0
export class UserService {
  getUser(id: number) {
    return this.http.get(`/users/${id}`);
  }
}

Your app:
this.userService.getUser(1); // works

New version – v1.1.0
export class UserService {
  getUser(id: number) {
    return this.http.get(`/users/${id}`);
  }

  getAllUsers() {               // ✅ NEW METHOD
    return this.http.get('/users');
  }
}

Angular Real Example

Angular added:

  New lifecycle hooks
  New router APIs
  New RxJS operators
  Old apps kept working.

2️⃣ Optional Parameter Added

Key idea
Adding an optional parameter means existing calls still work.

Example
Old version – v1.2.0
saveUser(user: User) {
  // save logic
}

Usage:
saveUser(user); // works

New version – v1.3.0
saveUser(user: User, notify?: boolean) {
  if (notify) {
    // send email
  }
}

Usage:
saveUser(user);          // still works ✅
saveUser(user, true);    // new feature ✅

Why safe?

  Parameter is optional (?)
  Default behavior unchanged

👉 MINOR version

❌ Breaking version example (for contrast)

Eg.
saveUser(user: User, notify: boolean) // required ❌

This would break old code → MAJOR

3️⃣ New Component Added (Angular)

Meaning

A new Angular component is introduced, but existing components:

  Are unchanged
  Behave the same

Example
Old version – v2.0.0
<app-user-list></app-user-list>

New version – v2.1.0
<app-user-list></app-user-list>
<app-user-profile></app-user-profile> <!-- ✅ NEW -->

Angular Library Example

Angular Material:

  Adds new components (MatDatepicker, MatStepper)
  Old components remain unchanged

Result → MINOR version bump

🟢 PATCH version (x.x.1)

Rule:

  Increment PATCH when you make bug fixes only

  No new features
  No breaking changes

Examples:

  Fix null pointer
  Fix UI bug
  Fix performance issue

Example:

  // v1.1.1
  Fix: user name not showing in header


3️⃣ Visual Timeline Example

1.0.0  → Initial stable release
1.0.1  → Bug fix
1.0.2  → Bug fix
1.1.0  → New feature
1.1.1  → Bug fix
2.0.0  → Breaking changes

4️⃣ What Does 0.x.x Mean?

"version": "0.0.1"

Very Important Rule:  0.x.x = unstable / under development

Example:

0.0.1 → First draft
0.1.0 → Some features
0.5.0 → Almost ready
1.0.0 → Production stable

👉 Angular apps usually stay at 0.x.x during early development.

--------------

Why Angular Major Updates Matter

Angular major releases often include:

  TypeScript upgrade
  RxJS changes
  Deprecated APIs removed

That’s why Angular upgrades must be done with: ng update

6️⃣ Why SemVer Is Critical for npm

  npm uses semantic versioning to decide:
    What can be installed
    What is safe to upgrade

Example: "@angular/core": "^17.0.0"

Means:

  ✅ 17.0.1
  ✅ 17.1.5
  ❌ 18.0.0

If Angular breaks backward compatibility → major version bump protects you.

-----------------------------------------------

7️⃣ Version Prefixes — Deep Explanation

Version prefixes tell npm how far it is allowed to upgrade a dependency automatically.

They control:

  🔒 Safety
  🚀 Feature upgrades
  💥 Risk of breaking changes

1️⃣ No Prefix (Exact Version)

"@angular/core": "17.0.0"

Meaning:

  Install only 17.0.0
  ❌ No updates at all
  Even bug fixes are blocked

Behavior:

  Allowed: 17.0.0
  Blocked: 17.0.1, 17.1.0, 18.0.0

When to use:

  Mission-critical systems
  Banking / healthcare apps
  Highly regulated environments

Pros / Cons:

  ✅ Maximum stability
  ❌ No bug fixes unless manually upgraded

2️⃣ Caret (^) — Most Common

"@angular/core": "^17.0.0"

Meaning:

  Allow updates that do NOT change the MAJOR version

Allowed versions:
  17.0.0 → 17.9.9 ✅
  18.0.0 ❌

Why this is safe

SemVer guarantees:

  No breaking changes within same MAJOR version

Angular Example:

  "@angular/router": "^17.0.0"


Allows:

  New features (MINOR)
  Bug fixes (PATCH)

Blocks:

  Angular 18 breaking changes

3️⃣ Tilde (~) — Patch-Only Updates

"rxjs": "~7.8.0"

Meaning:

  Allow PATCH updates only

Allowed versions:

  7.8.0 → 7.8.9 ✅
  7.9.0 ❌

Why use tilde?

  Extremely stable APIs
  Avoid feature changes
  Only bug fixes allowed

4️⃣ Special Case: ^ with 0.x.x (VERY IMPORTANT ⚠️)

  "some-lib": "^0.3.0"

SemVer Rule:

  0.x.x is considered unstable

  So caret behaves differently.

Allowed versions:
  0.3.0 → 0.3.9 ✅
  0.4.0 ❌

🚨 Even MINOR can be breaking in 0.x.x

6️⃣ Real Angular package.json Example

  "dependencies": {
    "@angular/core": "^17.0.0",
    "@angular/common": "^17.0.0",
    "rxjs": "~7.8.0",
    "zone.js": "~0.14.0"
  }

5️⃣ private

"private": true

Why this exists:

  Prevents accidental publishing to npm


1️⃣ What is "private" really?

"private" is a safety flag for npm.

It tells npm:

  ❗ “This project is NOT meant to be published as an npm package.”

It does NOT:

  affect Angular runtime
  affect builds
  affect performance

It only affects npm publishing behavior.

2️⃣ Why does "private" exist?

The problem npm wanted to solve

Developers accidentally ran: 

  npm publish

And suddenly:

  Their app got published
  Sensitive code leaked
  Company IP exposed

So npm introduced "private" as a hard stop.

3️⃣ What happens when "private": true?

"private": true

Behavior

  ❌ npm publish → FAILS immediately
  ❌ No warnings
  ❌ No override

Error message:
  
  npm ERR! This package has been marked as private


4️⃣ What if "private" is NOT present?

If you remove it:

{
  "name": "my-angular-app",
  "version": "1.0.0"
}

Default behavior:

  "private" defaults to false
  Project is publishable

🚨 Even Angular apps become publishable!

5️⃣ What happens if "private": false?

"private": false

Behavior:

  ✅ npm publish is allowed
  npm treats your project as a library/package

-> What npm checks before publishing?

  name is unique
  version is new
  You are logged in
  No policy violations

If all pass → published publicly 😬

6️⃣ Why "private": false is Dangerous for Angular Apps

Angular applications:

  Are NOT meant to be installed via npm
  Have build files, assets, configs
  Often contain business logic

Publishing them can:

  Leak company code
  Expose environment configs
  Confuse other developers

7️⃣ When SHOULD "private": false be used?

✅ Angular Libraries (Correct use case)

Example:

"name": "@company/ui-components",
"private": false


Used when:

  You are creating a reusable Angular library

You want to install it via:

  npm install @company/ui-components

Angular Library Example

Created using:

  ng generate library shared-ui

This library:

  Should be publishable
  Must have "private": false
  
✅ Final Summary

  "private": true → cannot be published
  "private": false → can be published
  Default is false
  Critical safety flag for Angular apps
  Should almost always be true for applications

-----------------------------------------------------------------

6️⃣ scripts (VERY IMPORTANT)

"scripts": {
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test"
}

What are scripts?

They are shortcuts for terminal commands.

Instead of: 

  ng serve

You run: 

  npm run start

Common Angular Scripts (Deep Meaning):

▶ start

  "start": "ng serve"
  Starts development server
  Runs app on http://localhost:4200
  Uses development environment
  Watches file changes (live reload)
  command: npm run start

🚀 How ng serve Works Internally (Deep Dive)

When you run:

  ng serve

you’re starting a development pipeline, not just a server.

1️⃣ ng serve starts with Angular CLI

First thing to know:

  ng is Angular CLI, not Angular framework.

So the flow starts here:

  Terminal → Angular CLI → Dev Server

Angular CLI is a Node.js program installed via:

  npm install -g @angular/cli

2️⃣ Angular CLI Reads Configuration Files

Once you run ng serve, CLI immediately reads:

🔹 angular.json (MOST IMPORTANT)

It looks for:

  project name
  build options
  serve options
  default configuration

Example:

  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server"
  }

👉 This tells CLI:

“Use Angular Dev Server to serve the app”

3️⃣ CLI Chooses the Dev Server Builder

This is critical.

@angular-devkit/build-angular:dev-server

This builder:

  Sets up Webpack
  Starts a local HTTP server
  Enables live reload

So effectively:

  ng serve → Webpack Dev Server


4️⃣ Webpack Is Initialized (Behind the Scenes)

Angular CLI internally configures Webpack for you.

Webpack does:

  Bundles all .ts, .html, .scss
  Resolves imports
  Handles assets
  Applies loaders

You never see the Webpack config unless you eject or inspect it.

1️⃣ What is Webpack? (Proper Definition)

Webpack is a JavaScript module bundler that analyzes a dependency graph starting from entry points and bundles all required modules into optimized output files for the browser.

2️⃣ In Which Language Webpack Is Created?

✅ Webpack is written in JavaScript (Node.js)

  Runs on Node.js
  Uses CommonJS internally
  Executes via npm

That’s why:

  npx webpack

works.

Webpack itself is just:

  A Node.js program

3️⃣ How Webpack Is Created / Used in Angular

Important truth ⚠️

  You do NOT create Webpack manually in Angular.

Angular CLI:

  Creates Webpack config automatically

Where Webpack comes from in Angular?

Angular CLI installs:

  "@angular-devkit/build-angular"

Inside this package:

  Webpack
  Webpack Dev Server
  Loaders
  Plugins

Angular CLI generates Webpack config in memory.

4️⃣ How Webpack Works Internally (Deep Flow)

Step 1: Entry Point

Webpack starts from an entry file.

In Angular:

  src/main.ts

This is defined internally as:

  entry: 'src/main.ts'

Step 2: Dependency Graph Creation

Webpack reads:

  import { AppComponent } from './app/app.component';

Then:

  Finds that file
  Reads its imports
  Continues recursively

Result:

  A full dependency graph

Step 3: Loaders Transform Files

Browsers understand:

  JavaScript
  HTML
  CSS

But Angular uses:

  TypeScript
  SCSS
  HTML templates

Loaders convert them.

Examples:

| File    | Loader                       |
| ------- | ---------------------------- |
| `.ts`   | ts-loader + Angular compiler |
| `.scss` | sass-loader                  |
| `.html` | html-loader                  |
| `.css`  | css-loader                   |

👉 Loaders transform files before bundling

Step 4: Plugins Enhance the Build

Plugins:

  Optimize bundles
  Inject scripts into index.html
  Handle environment variables
  Minify code

Angular uses:

  HtmlWebpackPlugin
  DefinePlugin
  MiniCssExtractPlugin

Step 5: Bundling

Webpack bundles:

  App code
  Vendor code
  Polyfills
  Runtime

Output (in dev):

  served from memory

Output (in build):

  dist/
  ├── main.js
  ├── runtime.js
  ├── styles.css

Step 6: Dev Server (ng serve)

Webpack Dev Server:

  Watches files
  Triggers rebuilds
  Serves bundles
  Reloads browser

5️⃣ How to SEE Webpack in an Angular Project

Angular hides it—but you can still inspect it.

🔍 Option 1: View Installed Webpack

  npm list webpack

Shows:

  Webpack version
  Dependency tree

🔍 Option 2: Show Webpack Config (Recommended)

  ng build --stats-json

Then:

  npx webpack-bundle-analyzer dist/stats.json

This shows:

  Bundle composition
  Dependency sizes

🔍 Option 3: Use Custom Webpack Builder (Advanced)

@angular-builders/custom-webpack

Allows:

  Extend Angular’s Webpack config
  View and modify it

🔍 Option 4: Debug Logs

  ng serve --verbose

Shows:

  Build steps
  Webpack phases

6️⃣ Why Angular Hides Webpack

Because:

  Webpack is complex
  Config is large
  Wrong config breaks Angular
  Angular needs strict version matching

Angular wants you to focus on:

  Components, services, business logic

7️⃣ Mental Model (Easy to Remember)

Angular CLI
   ↓
Generates Webpack config
   ↓
Webpack builds dependency graph
   ↓
Loaders transform files
   ↓
Plugins optimize output
   ↓
Dev Server serves bundles

---------------------------------------------------

🏗 build

  "build": "ng build"
  Creates production-ready files
  Outputs to dist/ folder
  Minifies & optimizes code
  command: npm run build
  You can also do: npm run build -- --configuration=production

🏗️ How ng build Works Internally (Deep Dive)

When you run:

ng build

you’re telling Angular:

  “Compile my app, optimize it, and generate deployable files.”

This is a production-oriented pipeline, not a dev one.

1️⃣ Angular CLI Takes Control

Just like ng serve, everything starts with Angular CLI.

  Terminal → Angular CLI (Node.js)

CLI:

  Parses the command
  Resolves flags (--configuration, --prod)
  Determines which project to build

2️⃣ Angular CLI Reads Configuration

🔹 angular.json (Critical)

CLI reads:

  "build": {
    "builder": "@angular-devkit/build-angular:browser"
  }

This builder is different from ng serve.

| Command  | Builder    |
| -------- | ---------- |
| ng serve | dev-server |
| ng build | browser    |

👉 This builder is designed for production builds.

🔹 Environment Configuration

By default:

  ng build

Uses:

  environment.ts

For production:

  ng build --configuration=production

Uses:

  environment.prod.ts

3️⃣ Dependency Resolution & Graph Creation

Webpack starts from:

  src/main.ts

Then:

  Follows all imports
  Builds full dependency graph

Includes:

  Components
  Modules
  Services
  Assets
  Styles

This graph defines what must be bundled.

4️⃣ TypeScript Compilation (Strict Mode)
Key Difference from ng serve

ng build:

  Uses full TypeScript compilation
  Enforces stricter checks
  Fails on type errors

This ensures:

  No broken types reach production

5️⃣ AOT Compilation (Huge Difference ⚠️)

By default:
  ng build → AOT enabled

That means:

  Templates compiled at build time
  No template compilation in browser
  Faster runtime
  Smaller bundles

Angular compiler:

  Converts templates to JS instructions
  Resolves DI at build time
  Removes unused metadata

6️⃣ Tree Shaking (Dead Code Elimination)

Webpack + Angular compiler:

  Analyze dependency graph
  Remove unused code

Example:

  import { A, B } from 'lib';
  // only A used

Result:

  B is removed
  Smaller bundle

This is critical for performance.

7️⃣ Code Splitting

Angular splits bundles automatically:

| Bundle         | Purpose         |
| -------------- | --------------- |
| `main.js`      | App code        |
| `runtime.js`   | Webpack runtime |
| `polyfills.js` | Browser support |
| `styles.css`   | Global styles   |

8️⃣ Hashing for Cache Busting

Filenames include hashes:

  main.8d9f3c2.js

Why?

  Browser cache invalidation
  New build → new filename

1️⃣1️⃣ Output Written to Disk

Unlike ng serve:

  Files are written to disk
  Located in dist/

This output:

  Can be deployed
  Served by Nginx, Apache, CDN

🔥 High-Level Build Flow (Mental Model)

ng build
  ↓
Angular CLI
  ↓
Browser Builder
  ↓
Webpack
  ↓
TypeScript + AOT
  ↓
Optimizations & Tree Shaking
  ↓
Bundle Splitting
  ↓
Write files to dist/

🎯 Key Differences: ng serve vs ng build

| Feature      | ng serve   | ng build  |
| ------------ | --------   | --------  |
| Output       | Memory     | Disk      |
| AOT          | ❌         | ✅        |
| Optimization | ❌         | ✅        |
| Live reload  | ✅         | ❌        |


🧪 test

  "test": "ng test"
  Runs unit tests
  Uses Karma + Jasmine
  command: npm run test

🧹 lint

  "lint": "ng lint"
  Checks code quality
  Finds unused variables, bad practices
  command: npm run lint

Custom Scripts (Real World Example)

  "scripts": {
    "start:dev": "ng serve --configuration=dev",
    "start:qa": "ng serve --configuration=qa",
    "build:prod": "ng build --configuration=production"
  }


7️⃣ What are dependencies?

Dependencies are external packages that an application requires at runtime in order to execute correctly in development, production, or any deployed environment.

Short version:

  If a package is missing from dependencies, your app will break when it runs.

2️⃣ Why dependencies Exist

JavaScript applications:

  Don’t ship with the browser
  Don’t have standard libraries like Java / .NET

So we import functionality from packages:

  Angular framework
  RxJS
  Utility libraries

These must be present when the app is running.

3️⃣ dependencies vs devDependencies (Conceptual Difference)

| Aspect               | dependencies   | devDependencies     |
| -------------------- | ------------   | -----------------   |
| Needed at runtime    | ✅ Yes         | ❌ No               |
| Needed in production | ✅ Yes         | ❌ No               |
| Shipped with app     | ✅ Yes         | ❌ No               |
| Used by browser      | ✅ Yes         | ❌ No (build only)  |

5️⃣ What Should NEVER Go Into dependencies

  ❌ Testing libraries
  ❌ Build tools
  ❌ CLI tools
  ❌ Linters

Examples:

  "typescript"
  "@angular/cli"
  "eslint"
  "karma"

These belong in devDependencies.

6️⃣ How npm Uses dependencies Internally

When you run:

  npm install

npm:

  Reads package.json
  Installs all dependencies
  Resolves sub-dependencies
  Creates node_modules

Then:

  ng serve
  ng build
  node app.js

can run correctly.

7️⃣ What Happens If a Runtime Dependency Is Missing?

Example:

  import { Component } from '@angular/core';

If @angular/core is not in dependencies:

  ❌ Build fails
  ❌ Runtime crashes
  ❌ App won’t start

8️⃣ Angular Production Build & dependencies

During:

  ng build --configuration=production

Angular:

  Bundles only used dependencies
  Tree-shakes unused code
  Optimizes final output
  But only from dependencies.

9️⃣ Why dependencies Are Critical in Deployment

In real servers:

  CI/CD runs npm install --production
  Only dependencies are installed
  devDependencies are skipped

If runtime lib is wrongly placed in devDependencies:

  🚨 App crashes in production

🔥 Real-World Failure Example

"devDependencies": {
  "rxjs": "~7.8.0"
}

Works locally ❌
Fails in production 🚨

Because:

  CI installs only dependencies
  RxJS missing

🔹 Angular dependencies — Deep Explanation (One by One)

"dependencies": {
  "@angular/animations": "^16.2.0",
  "@angular/cdk": "^16.2.14",
  "@angular/common": "^16.2.0",
  "@angular/compiler": "^16.2.0",
  "@angular/core": "^16.2.0",
  "@angular/forms": "^16.2.0",
  "@angular/material": "^16.2.14",
  "@angular/platform-browser": "^16.2.0",
  "@angular/platform-browser-dynamic": "^16.2.0",
  "@angular/router": "^16.2.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.13.0"
}

1️⃣ @angular/core — ❤️ The Heart of Angular

"@angular/core": "^16.2.0"

What it is?

  The core framework of Angular.

What it provides?

  Component, Directive, Pipe
  Dependency Injection
  Change Detection
  Lifecycle hooks
  Signals (Angular 16+)

Without it

  ❌ Angular cannot start
  ❌ App will not compile

This is the brain of Angular

2️⃣ @angular/common — 🧱 Common Building Blocks

"@angular/common": "^16.2.0"

What it provides?

Common directives:

  *ngIf
  *ngFor
  *ngSwitch

Common pipes:

  date
  currency
  uppercase

HttpClientModule

Without it:

  ❌ Templates break
  ❌ Pipes don’t work
  ❌ HTTP calls fail

3️⃣ @angular/compiler — 🧠 Template Compiler

"@angular/compiler": "^16.2.0"

What it does?

  Compiles Angular templates (HTML)
  Converts decorators into executable code
  Processes metadata

Used in:

  JIT compilation
  Development mode (ng serve)

Without it:

  ❌ Angular can’t compile templates
  ❌ ng serve fails


4️⃣ @angular/platform-browser — 🌐 Browser Integration

"@angular/platform-browser": "^16.2.0"

What it does?

  Connects Angular to the browser DOM
  Provides browser-specific services
  Handles sanitization
  Event handling

Without it:

  ❌ Angular can’t run in a browser


5️⃣ @angular/platform-browser-dynamic — ⚡ JIT Bootstrap

"@angular/platform-browser-dynamic": "^16.2.0"

What it does?

  Bootstraps Angular in JIT mode
  Compiles templates in the browser

Used by:
  platformBrowserDynamic().bootstrapModule(AppModule);

Without it:

  ❌ ng serve fails
  ❌ Dev mode breaks

Production builds may not require it (AOT)  


6️⃣ @angular/router — 🧭 Navigation Engine

"@angular/router": "^16.2.0"

What it provides?

  SPA routing
  Lazy loading
  Guards
  Resolvers

Without it:

  ❌ No navigation
  ❌ Cannot build multi-page to SPA


7️⃣ @angular/forms — 📝 Forms Engine

"@angular/forms": "^16.2.0"

What it provides?

  Template-driven forms
  Reactive forms
  Validation
  FormControl, FormGroup

Without it:

  ❌ Forms break
  ❌ Validation unavailable


8️⃣ @angular/animations — 🎞 Animation Engine

"@angular/animations": "^16.2.0"

What it provides?

  Angular animation DSL
  Transitions, triggers
  Smooth UI effects

Required by:

  Angular Material
  UI animations

Without it:

  ❌ Material animations break
  ⚠ App may still run without animations


9️⃣ @angular/material — 🎨 UI Components

"@angular/material": "^16.2.14"

What it is?

  Angular’s official UI component library

Depends on:

  @angular/cdk
  @angular/animations

Provides:

  Buttons, dialogs, tables, date pickers

Without it:

  ❌ Material UI won’t work


🔟 @angular/cdk — 🧰 Component Dev Kit

"@angular/cdk": "^16.2.14"

What it is?

  Low-level utilities
  No UI
  Used by Angular Material

Provides:

  Overlay
  Drag & Drop
  Accessibility
  Layout utilities


1️⃣1️⃣ rxjs — 🔄 Reactive Engine

"rxjs": "~7.8.0"

What it does?

  Observables
  Async data streams
  HTTP responses
  Event handling

Angular uses it for:

  HttpClient
  Router events
  State management

Without it:

  ❌ Async features break
  ❌ HTTP stops working


1️⃣2️⃣ zone.js — 🔍 Change Detection Trigger

"zone.js": "~0.13.0"

What it does?

  Detects async operations
  Triggers Angular change detection

Example:

  setTimeout(() => {
    this.title = 'Updated';
  });

UI updates automatically → thanks to Zone.js

Without it:

  ❌ UI won’t update
  ❌ Manual change detection needed


1️⃣3️⃣ tslib — 🧩 TypeScript Helper Library

"tslib": "^2.3.0"

What it does?

  Provides helper functions
  Reduces bundle size

Example helpers:

  __extends
  __assign

Without it:

  ❌ Compilation fails
  ❌ Larger bundle size


🧠 Mental Model (Easy)

Think of Angular like a machine:

| Part           | Package             |
| -------------- | ------------------- |
| Brain          | `@angular/core`     |
| Muscles        | `@angular/common`   |
| Nervous system | `zone.js`           |
| Blood flow     | `rxjs`              |
| UI skin        | `@angular/material` |


📦 What is devDependencies? (Proper Definition)

devDependencies are packages required only during development, build, testing, and linting — NOT required at runtime in production.

In simple words:

  Needed by developers
  Needed by build tools
  Needed by test runners
  ❌ Not shipped to users

🔍 Key Difference: dependencies vs devDependencies

| Aspect              | dependencies  | devDependencies   |
| ------------------- | ------------  | ---------------   |
| Used in browser     | ✅ Yes        | ❌ No             |
| Required at runtime | ✅ Yes        | ❌ No             |
| Needed for build    | Sometimes     | ✅ Yes          |
| Shipped to prod     | ✅ Yes        | ❌ No             |
| Used by users       | Yes           | No                |


👉 If you delete node_modules in production, only dependencies are needed to run the app.

🔧 Deep Explanation of Your devDependencies

1️⃣ @angular/cli — 🛠 Angular Command Line Tool

"@angular/cli": "^16.2.16"

What it does?

  Provides commands:

    ng serve
    ng build
    ng generate
    ng test

  Project scaffolding
  Dev server

Without it:

  ❌ No ng commands
  ❌ You cannot run or build Angular easily


2️⃣ @angular-devkit/build-angular — 🏗 Build Engine

"@angular-devkit/build-angular": "^16.2.16"

What it does?

Actual build logic behind:

  ng serve
  ng build

Configures:

  Webpack
  TypeScript
  Babel
  Optimization

Relationship:

  ng build → Angular CLI → build-angular → Webpack

Without it:

  ❌ Build fails
  ❌ Dev server breaks

3️⃣ @angular/compiler-cli — 🧠 AOT Compiler

"@angular/compiler-cli": "^16.2.0"

What it does?

  Ahead-of-Time (AOT) compilation
  Template type checking
  Produces optimized JS

Used during:

  ng build
  ng serve (AOT mode)
  Production builds

Without it:

  ❌ AOT fails
  ❌ Production build impossible


4️⃣ typescript — 🟦 Language Compiler

"typescript": "~5.1.3"

What it does?

  Compiles .ts → .js
  Type checking
  Decorator support

Why devDependency?

  Browser runs JavaScript, not TypeScript

Without it:

  ❌ App won’t compile


5️⃣ @types/jasmine — 🧪 Type Definitions

"@types/jasmine": "~4.3.0"

What it does?

  TypeScript types for Jasmine
  Autocomplete & type safety

Example:

  describe('Test', () => {
    it('should work', () => {});
  });

Without it:

  ⚠ Type errors in test files
  ❌ IDE autocomplete breaks


6️⃣ jasmine-core — 🧪 Testing Framework

"jasmine-core": "~4.6.0"

What it does?

  Test framework
  describe, it, expect

Without it:

  ❌ Unit tests fail


7️⃣ karma — 🚗 Test Runner

"karma": "~6.4.0"

What it does?

  Runs tests in real browsers
  Watches files
  Reports results

Without it:

  ❌ ng test doesn’t run


8️⃣ karma-chrome-launcher — 🌐 Browser Launcher

"karma-chrome-launcher": "~3.2.0"

What it does? 

  Launches Chrome for tests

Without it:

  ❌ Tests cannot run in Chrome

9️⃣ karma-coverage — 📊 Test Coverage

"karma-coverage": "~2.2.0"

What it does?

  Generates coverage reports
  Shows % of tested code

Without it:

  ⚠ No coverage metrics


🔟 karma-jasmine — 🔗 Adapter

"karma-jasmine": "~5.1.0"

What it does?

  Connects Jasmine with Karma

Without it:

  ❌ Karma can’t understand Jasmine tests


1️⃣1️⃣ karma-jasmine-html-reporter — 🖥 Test UI

"karma-jasmine-html-reporter": "~2.1.0"

What it does?

  Shows test results in browser UI


1️⃣2️⃣ eslint — 🧹 Code Quality Tool

"eslint": "^9.39.1"

What it does?

  Finds code smells
  Enforces standards
  Prevents bugs


1️⃣3️⃣ angular-eslint — 🅰 Angular Lint Rules

"angular-eslint": "21.0.1"

What it does?

  Angular-specific lint rules
  Template linting
  Component style enforcement

1️⃣4️⃣ typescript-eslint — 🔌 Bridge

"typescript-eslint": "8.46.4"

What it does?

  Makes ESLint understand TypeScript AST

--------------------------------------------------------------------------

1️⃣ One-line Definitions (Anchor in your mind)

devDependencies

Packages needed only to develop, build, test, or lint your project.

peerDependencies

Packages that your package expects the consumer to already have installed.

👉 Key difference:

devDependencies = tools you use

peerDependencies = contracts you enforce

-------------------------------------------------------------------------------

2) package-lock.json

package-lock.json is one of the most misunderstood but most important files in modern Angular / Node projects.

I’ll explain it deeply, step-by-step, from why it exists → how npm uses it internally → Angular real-world behavior.

📦 What is package-lock.json? (Proper Definition)

package-lock.json is an auto-generated file that records the exact versions and dependency tree of all installed npm packages to ensure deterministic and reproducible installs across environments.

Short version:

  Same code + same lock file = same node_modules everywhere

1️⃣ Why package-lock.json Exists (Core Problem)

Before package-lock.json

package.json allows version ranges:

  "rxjs": "^7.8.0"

This means:

  Today → 7.8.0
  Tomorrow → 7.8.5
  Next month → 7.9.1

⚠ Same project → different installs → bugs appear randomly.


2️⃣ What package-lock.json Solves

✔ Locks exact versions
✔ Locks nested dependencies
✔ Locks dependency tree structure
✔ Improves install speed
✔ Prevents “works on my machine” issues


3️⃣ package.json vs package-lock.json (Critical Difference)

| Aspect           | package.json     | package-lock.json |
| ---------------- | ---------------- | ----------------- |
| Written by       | Developer        | npm               |
| Purpose          | Allowed versions | Exact versions    |
| Version ranges   | Yes (`^`, `~`)   | No                |
| Dependency depth | Direct only      | Full tree         |
| Should be edited | Yes              | ❌ Never          |
| Committed to git | Yes              | Yes               |


4️⃣ What’s Inside package-lock.json (Structure)

Example (simplified):


{
  "name": "my-angular-app",
  "version": "0.0.1",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "test-ng16-app",
      "version": "0.0.0",
      "dependencies": {
        "@angular/core": "^16.2.0"
      },
      "devDependencies": {
        "@angular-devkit/build-angular": "^16.2.16",
        "@angular/cli": "^16.2.16",
        "@angular/compiler-cli": "^16.2.0"
      }
    },
    "node_modules/@angular/core": {
      "version": "16.2.12",
      "resolved": "...",
      "integrity": "...",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "rxjs": "^7.5.0"
      },
      "engines": {
        "node": "^16.14.0 || >=18.10.0",
        "npm": "^6.11.0 || ^7.5.6 || >=8.0.0",
        "yarn": ">= 1.13.0"
      },
      "optionalDependencies": {
        "esbuild": "0.18.17"
      },
      "peerDependencies": {
        "@angular/compiler-cli": "^16.0.0",
        "@angular/localize": "^16.0.0"
      },
      "peerDependenciesMeta": {
        "@angular/localize": {
          "optional": true
        },
        "@angular/platform-server": {
          "optional": true
        }
      }
    }
  }
}


5️⃣ Key Fields Explained Deeply

🔹 lockfileVersion

Version of npm lock format

  npm v9 → 3
  npm v6 → 1

⚠ Don’t manually change it.


🔹 resolved

  URL of exact package tarball
  Ensures same source
  where package was downloaded from

🔹 integrity

  SHA-512 hash
  Verifies package hasn’t been tampered with 🔐 Security feature

🔐 What is integrity: SHA-512 in package-lock.json?

Short definition (interview-ready):

  Integrity is a cryptographic hash that ensures the downloaded package has not been tampered with and is exactly the same as the one originally published.

📍 Where you see it

"integrity": "sha512-4c7xFJ1n9X1pXk0c..."

This appears in package-lock.json, not in package.json.


🧠 Why integrity exists

When npm installs a package:

  It downloads the package (.tgz file)
  It calculates the SHA-512 hash
  It compares it with the hash stored in package-lock.json

✅ Match → install succeeds
❌ Mismatch → install fails

👉 This guarantees security + reproducibility


🔎 What is SHA-512?

SHA-512 = Secure Hash Algorithm (512-bit)

  Part of SHA-2 family
  Produces a 512-bit (64-byte) hash
  Extremely hard to fake


Example:

  sha512-fx5d8Y9...pJg==

Even 1 character change → completely different hash.

🧪 Simple analogy

Think of integrity like:

  📦 A sealed package with a fingerprint

If the fingerprint doesn’t match → someone opened or changed it


🔄 How npm uses integrity internally

During npm install:

  Download package
    ↓
  Calculate SHA-512 hash
    ↓
  Compare with package-lock.json
    ↓
  Install OR fail


If corrupted / hacked / incomplete:

  npm ERR! Integrity checksum failed


🔥 Why SHA-512 (not MD5 / SHA-1)?

| Algorithm   | Status                                 |
| ----------- | -------------------------------------- |
| MD5         | ❌ Broken                               |
| SHA-1       | ❌ Weak                                 |
| SHA-256     | ✅ Good                                 |
| **SHA-512** | ✅ **Stronger & faster on 64-bit CPUs** |

👉 npm uses SHA-512 by default


🧩 Who generates this hash?

  npm registry generates it when package is published
  Stored in package-lock.json
  npm CLI verifies it during install

You never write this manually


8️⃣ Production Builds & CI/CD

In CI:

npm ci

  ✔ Uses lock file strictly
  ✔ Fails if lock doesn’t match package.json
  ✔ Faster than npm install
  ✔ Clean install every time

👉 Industry standard


🔹 dependencies

  Exact dependency tree
  Includes sub-dependencies


6️⃣ How npm Uses package-lock.json (Internals)

When you run:

  npm install

npm follows this order:

1️⃣ If package-lock.json exists

➡ npm ignores version ranges
➡ installs exact versions

2️⃣ If lock file missing

➡ resolves versions again
➡ creates new lock file


7️⃣ Why package-lock.json Is Critical in Angular

Angular apps:

  Have deep dependency trees
  Depend on matching versions
  Break easily with mismatches
  Example Failure

RxJS minor update:

  Passes TypeScript
  Breaks runtime
  Lock file prevents this.


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

<p [appBackground]="'lightgreen'">Hover me for light green</p>
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

**------------------------------------------------------------------------------------------------**

# @HostBinding()

-> It binds a DOM property of the host element to a variable in your directive/component class.
-> So when your class variable changes, Angular automatically updates that property on the host element.
-> Eg. 

1] Bind CSS styles - @HostBinding('style.color') myColor: string = 'blue';
2] Bind CSS classes - @HostBinding('class.active') isActive = false;
3] Bind attributes - @HostBinding('attr.role') role = 'button';
4] Bind boolean DOM properties - @HostBinding('disabled') isDisabled = true;

5] full eg. Bind CSS styles

highlight.directive.ts

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostBinding('style.background') bg = 'transparent';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.bg = 'lightblue';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.bg = 'transparent';
  }
}


Usage:

<p appHighlight>Hover me</p>

6] full eg. Bind CSS classes

highlight.directive.ts

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor() { }

  @HostBinding('class') class = 'default-style';

  @HostListener('mouseenter')
  mouseEnter() {
    this.class = 'hover-style';
  }

  @HostListener('mouseout')
  mouseOut() {
    this.class = 'dafult-style';
  }

}

test-child.component.html

<p appHighlight>Hover me</p>


test-child.component.scss

.dafult-style {
  background-color: red;
  color: white;
}

.hover-style {
  background-color: blue;
  color: red;
}


7] full eg. Bind CSS classes

highlight.directive.ts

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor() { }

  @HostBinding('class.hover-style') class = false;

  @HostListener('mouseenter')
  mouseEnter() {
    this.class = true;
  }

  @HostListener('mouseout')
  mouseOut() {
    this.class = false;
  }

}

test-child.component.html

<p appHighlight>Hover me</p>

test-child.component.scss

.hover-style {
  background-color: blue;
  color: red;
}

**------------------------------------------------------------------------------------------------**

**Note: 

1. Import Directive in Module file
2. Import only in one module. Not more than one.

# Property Binding in Directive

Property binding inside a directive means:
➡️ You expose an @Input() property on your directive
➡️ The parent component can pass data to the directive
➡️ The directive can use that value to change behavior, styles, classes, etc.

➡️ Eg.

1] 

-> 1st way have only one property

<p appHighlight [color]="'red'">Hover me</p>

import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  constructor() { }

  @Input() color: string = '';

  @HostBinding('style.color') hcolor = '';

  ngOnInit(): void {
    this.hcolor = this.color
  }

}


-> 2nd way have only one property

<p [appHighlight]="'red'">Hover me</p>

import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  constructor() { }

  @Input('appHighlight') color: string = '';

  @HostBinding('style.color') hcolor = '';

  ngOnInit(): void {
    this.hcolor = this.color
  }

}


-> 3rd way have only one property

<p [appHighlight]="'red'">Hover me</p>

import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  constructor() { }

  @Input() appHighlight: string = '';

  @HostBinding('style.color') hcolor = '';

  ngOnInit(): void {
    this.hcolor = this.appHighlight;
  }

}

-> Also add more inputs

<p [appHighlight]="'red'" [myInput]="''">Hover me</p>

import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  constructor() { }

  @Input() appHighlight: string = '';
  @Input() myInput: string = ''; <--

  @HostBinding('style.color') hcolor = '';

  ngOnInit(): void {
    this.hcolor = this.appHighlight;
  }

}


**------------------------------------------------------------------------------------------------**

# Conditional Attribute Directive

<button [appDisabled]="false">Click</button>

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDisabled]'
})
export class DisabledDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() set appDisabled(disabled: boolean) {
    if (disabled) {
      this.renderer.addClass(this.el.nativeElement, 'disabled');
    } 
  }

}


**------------------------------------------------------------------------------------------------**

# Custom class directive - like [ngClass]="{}" or [ngClass]=""

test-child.component.scss

.app-backgrond {
  background-color: yellow;
}

.app-border {
  border: 1px solid black;
}

.app-font {
  font-size: 20px;
}

.app-padding {
  padding: 1rem;
}

test-child.component.html

<p [appClass]="{ 'app-backgrond': true, 'app-border': false, 'app-font': 5 > 4, 'app-padding': true }">Custom class directive object way</p>

<p [appClass]="5 > 4 ? 'app-backgrond' : ''">Custom class directive string way</p>


class.directive.ts

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClass]'
})
export class ClassDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() set appClass(value: Object | string) {
    if (typeof value === 'object') {
      const entries = Object.entries(value);
      for (let entry of entries) {
        let [className, condition] = entry;

        if (condition) {
          this.renderer.addClass(this.el.nativeElement, className);
        }
      }

    } else if (value && typeof value === 'string') {
      this.renderer.addClass(this.el.nativeElement, value);
    }
  }

}

**------------------------------------------------------------------------------------------------**

# Custom style directive - like [ngStyle]="{}"

test-child.component.html

<p [appStyle]="{ 'backgroundColor': 'blue', 'padding': 5 > 2 ? '1rem' : '', 'color': 'white' }">Custom style directive string way</p>

style.directive.ts

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() set appStyle(styles: object) {
    if (typeof styles === 'object') {
      const entries = Object.entries(styles);
      for (let entry of entries) {
        let [style, value] = entry;
        this.renderer.setStyle(this.el.nativeElement, style, value);
      }
    }
  }

}

**------------------------------------------------------------------------------------------------**

# How structural directive works

-> Structural directives change the DOM structure — they add, remove, or modify elements in the DOM.

Examples:

*ngIf
*ngFor
*ngSwitch

Let’s break it into simple words.

-> What is a Structural Directive?

A structural directive is a directive that uses a * and tells Angular:

“I want to add or remove elements dynamically.”

It changes how the DOM is structured.

Eg. <div *ngIf="show">Hello</div>

If show = false, Angular removes this <div> from the DOM.

-> Why Do They Use *?

The * is just a short-hand syntax.

This code:

<div *ngIf="show"></div>

is SAME AS:

<ng-template [ngIf]="show">
  <div></div>
</ng-template>

Angular expands the * into an ng-template.

-> A structural directive uses TemplateRef + ViewContainerRef to add or remove parts of the DOM.

**------------------------------------------------------------------------------------------------**

# Custom Structural Directive

A structural directive needs:

1. TemplateRef → the HTML block you want to insert/remove
2. ViewContainerRef → the place where Angular inserts views
3. Some logic → when to create & destroy views

-> if.directive.ts

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIf]'
})
export class IfDirective {

  constructor(private templateRef: TemplateRef<any>, private vcr: ViewContainerRef) { }

  @Input() set appIf(condition: boolean) {
    if (condition) {
      this.vcr.createEmbeddedView(this.templateRef);
    } else {
      this.vcr.clear();
    }
  }

}

<div *appIf="true">
  <p>Welcome User!</p>
</div>

✔ TemplateRef → contains the HTML inside the directive
✔ ViewContainerRef → the container where Angular will insert the view
✔ createEmbeddedView() → adds the element to DOM
✔ clear() → removes it

**Note:

| Concept              | Meaning                           |
| -------------------- | --------------------------------- |
| `*` shorthand        | Converts DOM into `<ng-template>` |
| `TemplateRef`        | Holds the template block          |
| `ViewContainerRef`   | Inserts/removes template content  |
| Structural directive | modifies DOM structure            |
| Examples             | `*ngIf`, `*ngFor`, custom         |


**------------------------------------------------------------------------------------------------**

# ngSwitch

-> ngSwitch is an Angular structural directive used when you need multiple conditional views — similar to a switch-case statement in JavaScript.

It helps you show one template out of many based on a matching value.

-> Eg.

color = ''; -> <p *ngSwitchDefault>Select a valid color</p>
color = 'red' ->  <p *ngSwitchCase="'red'">Red selected</p>

<div [ngSwitch]="color">
  <p *ngSwitchCase="'red'">Red selected</p>
  <p *ngSwitchCase="'blue'">Blue selected</p>
  <p *ngSwitchCase="'green'">Green selected</p>
  <p *ngSwitchDefault>Select a valid color</p>
</div>

**------------------------------------------------------------------------------------------------**

# View Encapsulation

-> Encapsulation: Encapsulation meanse hiding data and behavior from outside world.

-> View Encapsulation: The View Encapsulation is a concept or behavior in Angular, where component CSS style are encapsulted into the components view and 
  dot not affect the rest of the application.

-> Why View Encapsulation Exists?

To prevent this problem:

❌ A component’s CSS accidentally affecting other components
❌ Global CSS overriding component CSS

Angular gives each component its own style boundary, so the styles stay inside.

-> There are 3 Types of View Encapsulation

1) Emulated (Default)

-> encapsulation: ViewEncapsulation.Emulated

✔ Most commonly used
✔ Angular modifies CSS selectors to scope them to the component

Example:

h1 {
  color: red;
}

Angular transforms this into:

h1[_ngcontent-eaj-1] {
  color: red;
}

And HTML becomes:

<h1 _ngcontent-eaj-1>Heading</h1>

So styles apply only to this component.

Advantages:

Best balance
Prevents style leakage
No browser issues
Default for most apps

2) ShadowDom

-> encapsulation: ViewEncapsulation.ShadowDom
-> When we add inside in child component then the global style not applied in the component.
-> 
✔ Uses the browser’s real Shadow DOM (web components technology)
✔ Completely isolates component styles
✔ Styles cannot leak out, and outer styles cannot come in

-> HTML becomes:

<my-component>
  #shadow-root
    <h1>Inside Shadow DOM</h1>
</my-component>

-> Advantages:

True isolation
Best for Web Components
Avoids global CSS problems

-> Disadvantages:

Some CSS features behave differently
The Shadow DOM boundary blocks styles from outside

3) None

-> encapsulation: ViewEncapsulation.None
-> If add this in parent then parent style apply in the child also

-> 
❌ No protection
❌ Styles become global

-> Meaning:
Styles written in the component apply everywhere in the app.

-> Use Cases:

-When you want to apply a layout/framework stylesheet globally
-When using Tailwind or Bootstrap custom overrides


| Type                   | Behavior                             | Style Scope    | Use Case                         |
| ---------------------- | ------------------------------------ | -------------- | -------------------------------- |
| **Emulated** (default) | Angular adds attributes to scope CSS | Component only | Most apps                        |
| **ShadowDom**          | Real Shadow DOM                      | Fully isolated | Web components, strict isolation |
| **None**               | No scoping                           | Global styles  | When global CSS is needed        |


**Note:

1. If we applied encapsulation: ViewEncapsulation.None in parent component and applied encapsulation: ViewEncapsulation.ShadowDom in child component
even the parent styles applied inside the child component.


**------------------------------------------------------------------------------------------------**

# What is Service

-> A Service in Angular is a class used to share logic, data, or functions across multiple components.

-> How to Create a Service

ng generate service user

🟦 Why Do We Need Services?

Without services:

❌ You will repeat the same code in multiple components
❌ Sharing data between components becomes difficult
❌ API calls would be written everywhere
❌ Business logic stays in the component (bad practice)

With services:

✔ Reusable code
✔ Cleaner components
✔ Easy data sharing
✔ Centralized API calls
✔ Logic separated from UI


-------------------------------------------------------------------------

# Creating and Using Service - Creating instance explicitly

* Dashboard Component 

.html

<button mat-flat-button color="primary" (click)="subscribe()">Header Subscribe Component</button>

.ts

subscribe() {
  const ngThemeSerive = new NgThemeService();
  ngThemeSerive.onSubscribe();
}

* ng-theme service

export class NgThemeService {
  currentTheme: string = 'light';

  onSubscribe() {
    alert('Theme subscription activated.');
    console.log(`Subscribed to theme changes. Current theme is ${this.currentTheme}.`);
  }
}


-------------------------------------------------------------------------

# Dependency Injection

-> A dependency is a relationship between two software components where one component relies on the other component to work properly.

-> Dependency Injection (DI) in Angular is a system that automatically creates and provides objects (services, classes) wherever they are needed — so you don’t have to create them manually using new.

-> Dependency Injection (DI) is a technique (design pattern) using which a class receives its dependencies from external source rather than creating them itself.

-> You need UserService inside HomeComponent.

Instead of: 
- let service = new UserService(); // ❌ Don't do this in Angular

You let Angular give it to you:
- constructor(private userService: UserService) {}
- Angular creates it, manages it, and injects it.

-> 🧱 Why Do We Use Dependency Injection?

✔ Avoid writing new Service() everywhere
✔ Avoid duplicate instances
✔ Easy to share one service instance across the app
✔ Cleaner, testable, maintainable code
✔ Loose coupling (components and services are not tightly connected)

-> Eg.

* Dashboard Component 

.html

<button mat-flat-button color="primary" (click)="subscribe()">Header Subscribe Component</button>

.ts

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgThemeService] // Tell Angular what dependency we want / What to provide
})
export class DashboardComponent  {
  constructor(private ngThemeService: NgThemeService){} // How to Inject Dependency

  subscribe() {
    this.ngThemeService.onSubscribe();
  }
}

* ng-theme service

export class NgThemeService {
  currentTheme: string = 'light';

  onSubscribe() {
    alert('Theme subscription activated.');
    console.log(`Subscribed to theme changes. Current theme is ${this.currentTheme}.`);
  }
}

-------------------------------------------------------------------------

# Hierarchical Dependency

-> Hierarchical Injectors in Angular

Angular uses multiple levels of dependency injectors, arranged in a tree structure, just like the component tree.

-> Components and modules each have their own dependency injector. If a component asks for a service, Angular searches from the nearest injector upward until it finds it.

-> Each component have different serive instance if have provide in provides array in component.

-> Child component override the parent component instance. 

-> Angular has multiple injectors, arranged like a hierarchy:

Root Injector
   |
   |-- Module Injector
          |
          |-- Component Injector
                 |
                 |-- Child Component Injector

-> Injector Levels

Angular has mainly three DI levels:

1. Root Injector (Global Level)

Created when the application starts.

@Injectable({
  providedIn: 'root'
})

The service goes into the root injector → so one shared instance is used everywhere.

This is the most common case.

2. Module-level Injector

If a module provides a service:

@NgModule({
  providers: [UserService]
})
export class AdminModule {}

This creates a new instance of the service only when the module is loaded.

Useful for lazy-loaded modules.

3. Component-level Injector

If you provide a service in a component:

@Component({
  selector: 'app-home',
  providers: [UserService]
})
export class HomeComponent {}

Then:

  The component gets a new instance of the service.

  All its child components also get that same instance.

  Other components outside do not share it.

-> How Angular Searches for Services

When a component asks for a service:

1. Look in its own injector
2. If not found → look in parent component
3. If not found → look in parent’s parent
4. Continue until the root injector
5. If still not found → error

This is dependency resolution.

-> Eg.

app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgThemeService } from './ng-theme/ng-theme.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FrameLayoutComponent
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

**Note: We can inject a service from Module class. In that case same instance of the dependency will be available throughtout the Angular Apllication.
In this way we implement singleton pattern where a single instance is shared throughout the application.

-------------------------------------------------------------------------

# Injecting Service into another service

Eg.

- header.component.html

<button  mat-raised-button color="primary" (click)="getDashBoardMessage()">Get Dashboard Message</button>

- header.component.ts

getDashBoardMessage() {
  this.headerService.getDashBoardMessage();
}

- header.service.ts

import { Injectable } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable() // - The class is Injectable class (means we can inject another services in this service)
export class HeaderService {

  constructor(private dashboardService: DashboardService) { }

  getDashBoardMessage() {
    this.dashboardService.logMessage(); 
  }
}

- dashboard.component.ts

import { Injectable } from '@angular/core';

export class DashboardService {

  constructor() { }

  logMessage() {
    console.log('Dashboard Message');
  }
}

app.module.ts

@NgModule({
  providers: [NgThemeService, HeaderService, DashboardService]
})
export class AppModule { }

Note: 

1) If 

@Injectable({
  providedIn: 'root'
}) 

is not use in service then add service in module - 
@NgModule({
  providers: [NgThemeService, HeaderService, DashboardService]
})
export class AppModule { }


-------------------------------------------------------------------------

# Angular Injection Token

-> Behide the seen angular add serive in pivides array like this

app.module.ts

providers: [
  {
    provide: HeaderService, // using type
    useClass: HeaderService
  }
]

-> Using string token

app.module.ts

providers: [
  {
    provide: 'HEADER_SERVICE',
    useClass: HeaderService
  }
]

header.component.ts

export class HeaderComponent implements OnInit {

  constructor(@Inject('HEADER_SERVICE') private headerService: HeaderService){}

}

-> Using unique injection token

app.module.ts

export const HEADER_SERVICE = new InjectionToken<HeaderService>('HEADER_SERVICE');

providers: [
  {
    provide: HEADER_SERVICE,
    useClass: HeaderService
  }
]

header.component.ts

import { HEADER_SERVICE } from 'src/app/app.module';

export class HeaderComponent implements OnInit {

  constructor(@Inject(HEADER_SERVICE) private headerService: HeaderService){}

}


🔥 What is an InjectionToken?

InjectionToken is a special key that Angular uses to inject values or objects that are not classes.

👉 Use it when you want to inject:
✔ A constant value
✔ A configuration object
✔ A string/number
✔ A function
✔ Third-party data
✔ Anything that is not a service class

Why needed?

Because Angular DI cannot identify non-class values.
So you give Angular a “token” to recognize them.

🧩 Simple Example

Step 1: Create a token

import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('api_url');

Step 2: Provide the value

providers: [
  { provide: API_URL, useValue: 'https://api.example.com' }
]

Step 3: Inject into any service/component

constructor(@Inject(API_URL) private apiUrl: string) {
  console.log(this.apiUrl);
}


🧠 Why Not Just Use a Normal Constant?

Because Angular DI works by types.
If you pass this:

providers: [
  { provide: 'api_url', useValue: 'https://...' }
]


-> Using strings as tokens is dangerous:

1. Typos → bugs
2. No type safety
3. Collisions with other tokens

Using InjectionToken avoids all of these.

🔥 Example with Full Flow (Beginner Friendly)

1. Create token

export const USER_ROLES = new InjectionToken<string[]>('user_roles');

2. Provide value

In module:

providers: [
  { provide: USER_ROLES, useValue: ['admin', 'editor', 'viewer'] }
]

3. Inject it

In service:

constructor(@Inject(USER_ROLES) private roles: string[]) {}

printRoles() {
  console.log(this.roles);
}


Output:

["admin", "editor", "viewer"]

----------------------------------------------------------

# New way to inject service instead of constructor

- header.component.ts

export class HeaderComponent implements OnInit {

  headerService = inject(HeaderService); // new way to inject service instead of constructor

}

----------------------------------------------------------

# Without explicitly adding service in module privides array, use @Injectable({ providedIn: 'root' }) in service

Don't use -

@NgModule({
  providers: [NgThemeService, 
    {
      provide: HEADER_SERVICE,
      useClass: HeaderService
    }, 
    DashboardService
  ]
})

Use below - 

1)

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

}

2) 

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  logMessage() {
    console.log('Dashboard Message');
  }
}

---------------------------------** RxJs **----------------------------------------

# What is an Observable

-> An Observable is a special object that can send data over time.
-> You can listen to that data by subscribing.
-> We can use observable to handle asynchronouse data.

----------------

** What is synchronous programming?

-> Javascript is a single-threaded programming language.
-> The code is executed line by line one after the other in the order in which they are defined.

----------------

** What is asynchronous programming?

-> Asynchronous code does not execute in single-threaded. It gets executed in the background.

----------------

** Why Do We Use Observables?

Observables are useful when data is:

✔ Coming asynchronously (later)
✔ Coming multiple times
✔ Coming continuously or streaming

Examples:

1. API calls
2. User typing events
3. Button clicks
4. WebSocket live updates
5. Form value changes
6. Timers / intervals
7. Route changes

----------------

-> Simple Example

Create an observable:

import { Observable } from 'rxjs';

const obs = new Observable(observer => {
  observer.next("Hello");
  observer.next("World");
  observer.complete();
});

Subscribe to it:

obs.subscribe(value => {
  console.log(value);
});


Output:

Hello
World


🟩 Observable Terms

1) Observable - Event Emitter
  -> next() - Sends a value.
  -> error() - Observable is finished.
  -> complete() - Sends an error.

2) Observer - Event Listner

3) Handler - Event Handler
  -> next()
  -> error()
  -> complete()


🚀 Observables in Angular (Most Common Use)

1. HttpClient returns Observables

this.http.get('/api/users')
  .subscribe(data => console.log(data));

2. Form valueChanges is an observable

this.form.valueChanges.subscribe(res => {
  console.log(res);
});


3. Router Events are observables

this.router.events.subscribe(event => {
  console.log(event);
});


🟧 Key Features of Observables

| Feature                | Explanation                     |
| ---------------------- | ------------------------------- |
| **Asynchronous**       | Data comes later                |
| **Stream**             | Multiple values over time       |
| **Lazy**               | Only runs when you subscribe    |
| **Cancellable**        | You can unsubscribe             |
| **Powerful operators** | debounceTime, map, filter, etc. |


🧠 Promises vs Observables (Simple)

| Promise               | Observable                    |
| --------------------- | ----------------------------- |
| Returns **one** value | Returns **many** values       |
| Cannot be cancelled   | Can be cancelled              |
| Eager                 | Lazy (runs only on subscribe) |
| No operators          | 100+ RxJS operators           |


⭐ Super Simple Explanation

An Observable is like a YouTube Live Stream:
Events keep coming, and you subscribe to watch them.

A Promise is like a single YouTube video:
You get one result only.

🔥 Unsubscribe Example (Important)

When using long-running observables:

private sub: Subscription;

ngOnInit() {
  this.sub = this.service.data$.subscribe(...)
}

ngOnDestroy() {
  this.sub.unsubscribe();
}


**Example:

<button mat-flat-button color="primary" (click)="getData()">Get Data</button>

<ng-container *ngFor="let d of data">
  <div>{{ d }}</div>
</ng-container>

data: any[] = [];

myObservable = new Observable((observable) => {
  // observable.next([1,2,3,4,5]);
  setTimeout(() => observable.next(1), 1000);
  setTimeout(() => observable.next(2), 2000);
  setTimeout(() => observable.next(3), 3000);
  // setTimeout(() => observable.error(new Error('Something went wrong')), 3000);
  setTimeout(() => observable.next(4), 4000);
  setTimeout(() => observable.next(5), 5000);
  setTimeout(() => observable.complete(), 3000);
});

getData() {
  this.myObservable.subscribe({
    next: (res: any) => {
      // this.data = res;
      this.data.push(res);
    },
    error: (err) => {
      console.log('Error ', err);
      alert(err.message);
    },
    complete: () => {
      alert('Data Completed');
    }
  });
}

** Note:

1) When Error is occured is goes to error block and after that data not getting emmited.

Means, print 1 ,2, 3 and after that get error and 4, 5 not printed.

setTimeout(() => observable.next(1), 1000);
setTimeout(() => observable.next(2), 2000);
setTimeout(() => observable.next(3), 3000);
setTimeout(() => observable.error(new Error('Something went wrong')), 3000);
setTimeout(() => observable.next(4), 4000);
setTimeout(() => observable.next(5), 5000);

2) When observable finished/stop is goes to complete block and after that data not getting emmited.

Means, print 1, 2, 3 and after that get complete observable and 4, 5 not printed.

setTimeout(() => observable.next(1), 1000);
setTimeout(() => observable.next(2), 2000);
setTimeout(() => observable.next(3), 3000);
setTimeout(() => observable.next(4), 4000);
setTimeout(() => observable.next(5), 5000);
setTimeout(() => observable.complete(), 3000);

-----------------------------------------------------------------------------

# of() and from() operator

1) of() operator

✅ of() in RxJS

-> What it does: of() creates an Observable from the values you pass directly.

Think of it like: “I have some values. Just give them to me as an Observable.”

-> Examples:

1. Basic values
import { of } from 'rxjs';

of(1, 2, 3).subscribe(console.log);

or

const ofOp = of(1, 2, 3);
ofOp.subscribe({
  next: (res) => {
    console.log(res)
  }
});
// Output: 1, 2, 3


2. Arrays (important!)

of([1, 2, 3]).subscribe(console.log);

or

const ofOp = of([1, 2, 3]);
ofOp.subscribe({
  next: (res) => {
    console.log(res)
  }
});

// Output: [1, 2, 3]  (entire array is single emission)

👉 of() does NOT loop through arrays.
It emits the entire array as ONE value.

-> Use when:

1. You want to convert fixed values to an Observable.
2. Mocking API data.
3. Creating simple synchronous streams.

---------------------------

2) from() operator

✅ from() in RxJS

-> What it does: from() converts iterable / promise-based things into an Observable.

-> Think of it like: “I have a collection or async object—convert it into a stream.”

-> Examples:


1. Array (each element emitted separately)

import { from } from 'rxjs';

from([1, 2, 3]).subscribe(console.log);

or

const ofOp = from([1, 2, 3])

ofOp.subscribe({
  next: (res) => {
    console.log(res)
  }
});

// Output: 1, 2, 3     (separate emissions)


👉 Difference:
of([1,2,3]) → emits one value
from([1,2,3]) → emits 3 separate values

2. Promise

const p = Promise.resolve('Hello');

from(p).subscribe(console.log);
// Output: Hello


3. String (because string is iterable)
from('ABC').subscribe(console.log);
// Output: A, B, C

**Note:

Super Simple Memory Trick

1) of() = "one value at a time as-is."
2) from() = "comes from a collection → emits many." / emits each element separately

---------------------------------------------------------------------------------------

# fromEvent() operator

-> ✅ What is fromEvent(): fromEvent() creates an Observable from DOM events (or any event emitter).

-> Think of it as: “Listen to a DOM event (like click, keyup, scroll) and convert it into an Observable.”

✅ Basic Example

import { fromEvent } from 'rxjs';

const button = document.getElementById('myBtn');

fromEvent(button, 'click').subscribe(() => {
  console.log('Button clicked!');
});

🔹 Every time the button is clicked → the Observable emits a value.

✅ What does it emit?

It emits the event object.

-> Example:

1) 

import { fromEvent } from 'rxjs';

const button = document.getElementById('myBtn');

fromEvent(button, 'click').subscribe(() => {
  console.log('Button clicked!');
});

2)

<button id="myBtn">My Button</button>

ngAfterViewInit(): void {
  const myBtn = document.getElementById('myBtn') as HTMLButtonElement;
  fromEvent(myBtn, 'click').subscribe({
    next: (res) => {
      console.log('button clicked ', res);
    }
  });
}

3) Angular way

<button id="myBtn" #myBtn>My Button</button>

@ViewChild('myBtn') myBtnEl!: ElementRef<any>;

ngAfterViewInit(): void {
  fromEvent(this.myBtnEl.nativeElement, 'click').subscribe({
    next: (res) => {
      console.log('button clicked ', res);
    }
  });
}

4) 

<input type="text" #myInput />

@ViewChild('myInput') myInputEl!: ElementRef<any>;

ngAfterViewInit(): void {
  fromEvent(this.myInputEl.nativeElement, 'keyup').pipe(debounceTime(300)).subscribe({
    next: (res) => {
      console.log('keyup', res);
    }
  });
}

5) 

fromEvent(window, 'scroll').subscribe(() => {
  console.log('Scrolling');
});

--------------------------------------------------------------------------------

# map() and filter() operator

1) map()

✅ map() Operator

-> What it does: map() transforms each value emitted by an Observable into something else.

-> Think of it as: “Take a value → change it → emit the new value”

-> Example

1)

import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3)
  .pipe(map(x => x * 2))
  .subscribe(console.log);

// Output: 2, 4, 6


2) 

of([1,2,3]).pipe(map(x=>x.map(x=>x*2))).subscribe(console.log);

or

for array use from() - from([1,2,3]).pipe(map(x=>x*2)).subscribe(console.log);

-----------------------------------------

2) filter()

✅ filter() Operator

-> What it does: filter() removes unwanted values based on a condition.

-> Think of it as: “Only let values pass if condition is true”

-> Example:

1) 

import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5)
  .pipe(filter(x => x % 2 === 0))
  .subscribe(console.log);

// Output: 2, 4

2)

from([1,2,3,4,5,6]).pipe(filter(x => x%2 === 0)).subscribe(console.log);

3)

🔥 Using map() + filter() Together

of(
  { name: 'A', age: 15 },
  { name: 'B', age: 22 },
  { name: 'C', age: 30 }
).pipe(
  filter(x => x.age > 20),
  map(x => x.name)
).subscribe(console.log);

// Output: B, C

------------------------

📌 Common Mistake (Very Important)

❌ Wrong:

map(x => x > 10)

➡️ This converts values to true/false

✅ Correct:

filter(x => x > 10)

------------------------

🧠 Easy Memory Trick

| Operator   | Purpose   | Removes values? | Changes values? |
| ---------- | --------- | --------------- | --------------- |
| `map()`    | Transform | ❌ No            | ✅ Yes           |
| `filter()` | Select    | ✅ Yes           | ❌ No            |

--------------------------------------------------------------------------

# Subject

✅ What is a Subject?

-> A Subject is both: 

- an Observable (you can subscribe() to it)
- an Observer (you can call next(), error(), complete())

👉 Think of it as a message broadcaster.

One value → many subscribers receive it.

--------------------------------------

🔁 Observable vs Subject (Key Difference)

❌ Normal Observable

Data flows from producer
You cannot manually emit values

observable.subscribe(...)

✅ Subject

You can manually push values

subject.next(value)

--------------------------------------

-> Example:

1) 

import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe(v => console.log('Subscriber A:', v));
subject.subscribe(v => console.log('Subscriber B:', v));

subject.next(1);
subject.next(2);

// output

Subscriber A: 1
Subscriber B: 1
Subscriber A: 2
Subscriber B: 2


🔥 Why do we need Subjects?

Use Subjects when:

- You want component-to-component communication
- You want to trigger events manually
- You want to share data between subscribers

--------------------------------------

🧠 Subject in Angular (Common Use Case)

Service → Component Communication

service.ts

@Injectable({ providedIn: 'root' })
export class DataService {
  private refreshSubject = new Subject<void>();

  refresh$ = this.refreshSubject.asObservable();

  triggerRefresh() {
    this.refreshSubject.next();
  }
}

component.ts

this.dataService.refresh$.subscribe(() => {
  console.log('Refresh triggered');
});


➡️ When triggerRefresh() is called → all subscribers react.

-----------------------------------

⚠️ Important Behavior of Subject

No initial value

Late subscribers miss previous values

subject.next(1);

subject.subscribe(v => console.log(v));
// ❌ Will NOT receive 1

---------------------------------------------------------------------------

# subject vs observable

🔹 What is an Observable?

An Observable is a data producer that emits values over time.

-> Key points

1. You subscribe to receive values
2. You cannot push values manually
3. Execution starts on subscribe
4. Each subscriber gets its own execution

-> Example:

const obs$ = new Observable(observer => {
  observer.next(Math.random());
});

obs$.subscribe(v => console.log('A:', v));
obs$.subscribe(v => console.log('B:', v));

Output
A: 0.34
B: 0.78

👉 Each subscriber gets a different value

----------------------------

🔹 What is a Subject?

-> A Subject is both:

an Observable (can subscribe)
an Observer (can emit values)

-> Key points

1. You can call next() manually
2. Same value goes to all subscribers
3. Starts emitting immediately
4. Late subscribers miss previous values

-> Example:

const subject = new Subject<number>();

subject.subscribe(v => console.log('A:', v));
subject.subscribe(v => console.log('B:', v));

subject.next(Math.random());

Output:

A: 0.52
B: 0.52

🔥 Main Differences (Important)

| Feature                           | Observable     | Subject         |
| --------------------------------- | -------------- | --------------- |
| Can emit manually (`next`)        | ❌ No           | ✅ Yes           |
| Is multicast                      | ❌ No (unicast) | ✅ Yes           |
| Execution                         | Per subscriber | Shared          |
| Late subscribers                  | Start fresh    | Miss old values |
| Can be both observer & observable | ❌              | ✅               |


🧠 Unicast vs Multicast (Simple)

1. Observable → Unicast (1 producer → 1 consumer)
2. Subject → Multicast (1 producer → many consumers)

✅ Subject to share data

private dataSubject = new Subject<any>();
data$ = this.dataSubject.asObservable();

loadData() {
  this.http.get('/api/data')
    .subscribe(data => this.dataSubject.next(data));
}

⚠️ When NOT to use Subject

For simple data streams
When Observable + operators is enough
When you don’t need manual emission

✅ When to use Subject

✔️ Event broadcasting
✔️ Component communication
✔️ Shared state (prefer BehaviorSubject)
✔️ Manual triggers

🧠 Best Practice (Angular)

private subject = new BehaviorSubject<User | null>(null);
public user$ = this.subject.asObservable();

Expose Observable, keep Subject private

-----------------------------------------------------------------

# BehaviorSubject

✅ What is a BehaviorSubject?

1. A BehaviorSubject is a special type of Subject that:
2. Requires an initial value
3. Always stores the latest value
4. Immediately emits the latest value to new subscribers

👉 Think of it as:

“I always remember the last value and give it to anyone who subscribes.”

🔁 BehaviorSubject vs Subject (Quick)

| Feature                               | Subject | BehaviorSubject |
| ------------------------------------- | ------- | --------------- |
| Initial value required                | ❌ No    | ✅ Yes           |
| Emits latest value to new subscribers | ❌ No    | ✅ Yes           |
| Stores current value                  | ❌ No    | ✅ Yes           |
| Common in Angular                     | ⚠️ Less | ⭐ Very common   |


📌 Basic Example

import { BehaviorSubject } from 'rxjs';

const count$ = new BehaviorSubject<number>(0);

count$.subscribe(v => console.log('A:', v));
count$.subscribe(v => console.log('B:', v));

count$.next(1);
count$.next(2);

count$.subscribe(v => console.log('C:', v));

// output

A: 0
B: 0
A: 1
B: 1
A: 2
B: 2   
C: 2   👈 latest value immediately

🧠 Why Initial Value Is Required?

Because BehaviorSubject must always have a value to emit.

new BehaviorSubject(null); // valid
new BehaviorSubject();     // ❌ error

🔥 Access Current Value (Important)

const cuurentVal = count$.getValue();
console.log('curr val ', cuurentVal); // returns latest value

⚠️ Use carefully (avoid in components).

------------------------

🧪 Angular Real-Life Example (Most Common)

Auth / Login State

auth.service.ts

private isLoggedInSubject = new BehaviorSubject<boolean>(false);
isLoggedIn$ = this.isLoggedInSubject.asObservable();

login() {
  this.isLoggedInSubject.next(true);
}

logout() {
  this.isLoggedInSubject.next(false);
}

.component

ngOnInit() {
  this.ngThemeService.isLoggedIn$.subscribe(isLoggedIn => {
    console.log('login ', isLoggedIn);
  });

  this.ngThemeService.login();
}

⚠️ Best Practices

✔️ Keep BehaviorSubject private
✔️ Expose as Observable using asObservable()
✔️ Use meaningful initial values

private userSubject = new BehaviorSubject<User | null>(null);
user$ = this.userSubject.asObservable();

🎯 Simple Summary

1. BehaviorSubject = Subject + memory
2. Always has a value
3. Emits latest value to new subscribers
4. Most used Subject in Angular apps

----------------------------------------------------------------------------

# ReplaySubject

✅ What is a ReplaySubject?

- A ReplaySubject is a type of Subject that:
- Remembers previous values
- Replays them to new subscribers

👉 Think of it as:

“When someone subscribes late, replay the past values.”

🔁 ReplaySubject vs Subject vs BehaviorSubject

| Feature                | Subject  | BehaviorSubject  | ReplaySubject      |
| ---------------------- | -------  | ---------------  | -----------------  |
| Requires initial value | ❌ No    | ✅ Yes           | ❌ No              |
| Replays past values    | ❌ No    | ✅ (latest only) | ✅ (multiple)      |
| New subscriber gets    | Nothing  | Last value       | Last **N** values  |
| Stores history         | ❌ No    | 1 value          | Many values        |


📌 Basic Example

1) 

import { ReplaySubject } from 'rxjs';

const rs = new ReplaySubject<number>(2); // buffer size = 2

rs.next(1);
rs.next(2);
rs.next(3);

rs.subscribe(v => console.log(v));

// Output

2
3

2)

const rs = new ReplaySubject<number>();

rs.subscribe(v => console.log('Sub A ', v));
rs.subscribe(v => console.log('Sub B ', v));

rs.next(1);
rs.next(2);

rs.subscribe(v => console.log('Sub C ', v));

rs.next(3);

// Output

Sub A  1
Sub B  1
Sub A  2
Sub B  2
Sub C  1
Sub C  2
Sub A  3
Sub B  3
Sub C  3

⚠️ This stores ALL values forever → memory leak risk.

3)

const rs = new ReplaySubject<number>(2); // buffer size = 2

rs.subscribe(v => console.log('Sub A ', v));
rs.subscribe(v => console.log('Sub B ', v));

rs.next(1);
rs.next(2);
rs.next(3);

rs.subscribe(v => console.log('Sub C ', v));

rs.next(4);

// output

Sub A  1
Sub B  1
Sub A  2
Sub B  2
Sub A  3
Sub B  3
Sub C  2
Sub C  3
Sub A  4
Sub B  4
Sub C  4

➡️ Last 2 values are replayed.

4) 

⏱ ReplaySubject with Time Window

const rs = new ReplaySubject<number>(2, 3000); // last 2 values in 3 sec

rs.next(1);
setTimeout(() => rs.next(2), 1000);
setTimeout(() => rs.next(3), 4000);

rs.subscribe(console.log);

// output

1
2
3

print all values timer not working

➡️ Only values from last 3 seconds are replayed.

🎯 Simple Summary

1. ReplaySubject = Subject + history
2. Replays last N values
3. Useful for caching & late subscribers
4. Limit buffer size to avoid memory issues

------------------------------------------------------------

# AsyncSubject

✅ What is an AsyncSubject?

An AsyncSubject is a special type of Subject that:

- Emits only the LAST value
- Emits it ONLY when complete() is called
- All subscribers get the SAME final value

👉 Think of it as:

“Wait until the work is finished, then give everyone the final result.”

📌 Basic Example

import { AsyncSubject } from 'rxjs';

const as = new AsyncSubject<number>();

as.subscribe(v => console.log('A:', v));

as.next(1);
as.next(2);
as.next(3);

as.subscribe(v => console.log('B:', v));

as.complete();

as.next(4);

as.subscribe(v => console.log('C:', v));

// output

A: 3
B: 3
C: 3

➡️ Only the last value (3) is emitted
➡️ Emission happens after complete()

❗ Important Rule (Very Important)

❌ No complete() → NO emission

as.next(100);
// no output because complete() not called

🧠 Real-World Use Case
✔️ One-time operation where only final result matters

Examples:

1. File upload completion
2. Final API result
3. Initialization process
4. Cleanup tasks

🆚 AsyncSubject vs BehaviorSubject

| Feature           | AsyncSubject      | BehaviorSubject |
| ----------------- | ---------------   | --------------- |
| Emits immediately | ❌ No             | ✅ Yes          |
| Emits on complete | ✅ Yes            | ❌ No           |
| Stores value      | Final only        | Latest          |
| Use case          | One-time result   | App state       |

⚠️ When NOT to use AsyncSubject

❌ Continuous data streams
❌ Live updates
❌ UI state
❌ Events

✅ Final Summary

1. Emits only last value
2. Emits only after complete()
3. All subscribers get same result
4. Perfect for one-time async operations

-------------------------------------------------------------------

# Promise vs Observable

1. Promise is native to JS. 

const promise = new Promise((resolve, reject) => {});

-> means no need to import Promise from another third part library.

1. An observable is not native to JS. It is prividede by third party RxJS library. 

import { Observable } from 'rxjs';

const ob = new Observable((observer) => { observer.next(100) })

-> means Need to import from third party library.

--------------

2. Promise is eager. It returns the data as soon as a promise is created.

const promise = new Promise((resolve, reject) => {
  console.log('Promise is Created');
  resolve(100);
});

-> print 'Promise is Created' when promise is create as soon as.

2. Observable is lazy. It only emits the data if there is a subscriber for that observable.

const ob = new Observable((observer) => { 
  console.log('Observable is created') 
});
ob.subsribe((val) => {});

// output

-> print 'Observable is created' when only subscribe to ob

---------------

3. Promise can emit only single value.

const promise = new Promise((resolve, reject) => {
  resolve(100);
  resolve(200);
  resolve(300);
});

promise.then((val)=>{
  console.log(val)
})

// output

100

3. Observable can emit single or multiple values.

const ob = new Observable((observer) => { 
  observer.next(100); 
  observer.next(200); 
  observer.next(300); 
});
ob.subscribe((val) => console.log('val ', val));

// output

100
200
300

--------------

4. Promise has methods for success & error.
4. Observable has methods for success, error and completion,

--------------

5. Promise always returns asynchronuos data.
5.  An observable can return both syncronous and asynchrous data based on how it is implemented

-----------------------------------------------------------------------------


