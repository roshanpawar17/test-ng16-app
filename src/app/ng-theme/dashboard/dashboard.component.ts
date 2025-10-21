import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  // templateUrl: './test.html',
  // template: `
  //   <h1>Hello</h1>
  //   <h2>Hello 2</h2>
  //   <h3>Hello 2</h3>
  // `,
  styleUrls: ['./dashboard.component.scss']
  // styles: [
  //   `h1{
  //     color: red;
  //     font-size: 30px
  //   }`, 

  //   'h2{color: blue}',

  //   `.h3-tag{
  //     color: orange;
  //   }`
  // ]
})
export class DashboardComponent {
  snackbar = inject(MatSnackBar)

  names: Array<string> = ['Rohan', 'Atharva', 'Kunal', 'Mayur', 'Yash'];

  // case = 'r1';
  case = 1;

  save() {
    this.snackbar.open('Opened', 'OK');
  }
}
