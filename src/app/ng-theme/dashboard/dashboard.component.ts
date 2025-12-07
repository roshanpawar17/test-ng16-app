import { AfterViewInit, Component, ElementRef, inject, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgThemeService } from '../ng-theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  // templateUrl: './test.html',
  // template: `
  //   <h1>Hello</h1>
  //   <h2>Hello 2</h2>
  //   <h3>Hello 2</h3>
  // `,
  styleUrls: ['./dashboard.component.scss'],
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
  // providers: [NgThemeService]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('myInput', { static: false, read: ElementRef }) inputElement!: ElementRef;
  @ViewChildren('inputEl') inputEl!: QueryList<ElementRef>;

  @ViewChild('greetTemplate', { static: true }) greetTemplate!: TemplateRef<any>;

  name: string = 'roshan';
  isAdmin: boolean = false;
  
  snackbar = inject(MatSnackBar)
  
  names: Array<string> = ['Rohan', 'Atharva', 'Kunal', 'Mayur', 'Yash'];
  
  // case = 'r1';
  case = 1;

  constructor(private ngThemeService: NgThemeService){}

  ngOnInit(): void {
    // const value = this.inputElement?.nativeElement?.value;
    // console.log('Name pro : ' + this.name);
    // console.log('Input Value: ' + value);
  }

  ngAfterViewInit(): void {
    // const value = this.inputElement.nativeElement.value;
    // console.log('Input Value: ' + value);
    // console.log('greetTemplate ', this.greetTemplate.createEmbeddedView({}).rootNodes[0].textContent);
  }
  

  save() {
    this.snackbar.open('Opened', 'OK');
  }

  showValue() {
    // const value = this.inputElement.nativeElement.value;
    // console.log('Input Value: ' + value);

    this.inputEl.forEach((el)=>{
      console.log('Input Element Value: ' + el.nativeElement.value);
    });
  }

  subscribe() {
    // const ngThemeSerive = new NgThemeService();
    this.ngThemeService.onSubscribe();
  }

  addUser() {
    this.ngThemeService.users.push('Omkar');
    console.log(this.ngThemeService.users);
  }

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
}
