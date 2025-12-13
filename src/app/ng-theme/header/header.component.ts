import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, inject, Input, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgThemeService } from '../ng-theme.service';
import { HeaderService } from './header.service';
import { HEADER_SERVICE } from 'src/app/app.module';
import { AsyncSubject, BehaviorSubject, debounceTime, filter, from, fromEvent, map, Observable, of, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-header', // element-directive
  // selector: '[app-header]', // attribute directive
  // selector: '.app-header', // class directive
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
  // providers: [NgThemeService]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  
  @Input() title: string = 'Default Title';
  @Output() toggleSidenav = new EventEmitter<any>();
  
  isDarkMode: boolean = false;
  isActive: boolean = false;
  
  renderer = inject(Renderer2);

  constructor(public ngThemeService: NgThemeService, @Inject(HEADER_SERVICE) private headerService: HeaderService){}
  
  ngOnInit(): void {
    // console.log('Title:', this.title);

    // const ofOp = of(1, 2, 3)
    // const ofOp = of([1, 2, 3])
    const ofOp = from([1, 2, 3])

    ofOp.subscribe({
      next: (res) => {
        // console.log(res)
      }
    });

    const p = Promise.resolve('Hello');
    // from(p).subscribe(console.log);

    // from('ABC').subscribe(console.log);


  }
  @ViewChild('myBtn') myBtnEl!: ElementRef<any>;
  @ViewChild('myInput') myInputEl!: ElementRef<any>;

  ngAfterViewInit(): void {
    // const myBtn = document.getElementById('myBtn') as HTMLButtonElement;
    // fromEvent(myBtn, 'click').subscribe({
    //   next: (res) => {
    //     console.log('button clicked ', res);
    //   }
    // });

    // fromEvent(this.myBtnEl.nativeElement, 'click').subscribe({
    //   next: (res) => {
    //     console.log('button clicked ', res);
    //   }
    // });

    // fromEvent(this.myInputEl.nativeElement, 'keyup').pipe(debounceTime(300)).subscribe({
    //   next: (res) => {
    //     console.log('keyup', res);
    //   }
    // });

    // fromEvent(window, 'scroll').subscribe(() => {
    //   console.log('Scrolling');
    // });

    // of([1,2,3]).pipe(map(x=>x.map(x=>x*2))).subscribe(console.log);
    // from([1,2,3]).pipe(map(x=>x*2)).subscribe(console.log);

    // of(1,2,3,4,5,6).pipe(filter(x=>x%2===0)).subscribe(console.log)
    // from([1,2,3,4,5,6]).pipe(filter(x=>x%2===0)).subscribe(console.log);

    // of(
    //   { name: 'A', age: 15 },
    //   { name: 'B', age: 22 },
    //   { name: 'C', age: 30 }
    // ).pipe(
    //   filter(x => x.age > 20),
    //   map(x => x.name)
    // ).subscribe(console.log);

    // const subject = new Subject<number>();

    // subject.subscribe({
    //   next: (v) => {console.log('Sub 1: ', v)}
    // })
    // subject.subscribe({
    //   next: (v) => {console.log('Sub 2: ', v)}
    // })

    // subject.next(1);
    // subject.next(2);

    // subject.subscribe({
    //   next: (v) => {console.log('Sub 3: ', v)}
    // })
    // this.ngThemeService.refresh$.subscribe((res) => {
    //   console.log('Refresh triggered 1' , res);
    // });

    // this.ngThemeService.refresh$.subscribe((res) => {
    //   console.log('Refresh triggered 2' , res);
    // });

    // this.ngThemeService.triggerRefresh();

    // const count$ = new BehaviorSubject<number>(0);

    // count$.subscribe(v => console.log('A', v));
    // count$.subscribe(v => console.log('B', v));

    // count$.next(1);
    // count$.next(2);

    // count$.subscribe(v => console.log('C', v));
    // const cuurentVal = count$.getValue();
    // console.log('curr val ', cuurentVal);

    // this.ngThemeService.isLoggedIn$.subscribe(isLoggedIn => {
    //   console.log('login ', isLoggedIn);
    // });

    // this.ngThemeService.login();

    // const rs = new ReplaySubject<number>(2);

    // rs.subscribe(v => console.log('Sub A ', v));
    // rs.subscribe(v => console.log('Sub B ', v));

    // rs.next(1);
    // rs.next(2);
    // rs.next(3);

    // rs.subscribe(v => console.log('Sub C ', v));

    // rs.next(4);


    // const rs = new ReplaySubject<number>(2, 3000)
    // rs.next(1);
    // setTimeout(() => rs.next(2), 1000);
    // setTimeout(() => rs.next(3), 6000);

    // rs.subscribe(console.log);

    // const as = new AsyncSubject<number>();

    // as.subscribe(v => console.log('A:', v));

    // as.next(1);
    // as.next(2);
    // as.next(3);

    // as.subscribe(v => console.log('B:', v));

    // as.complete();

    // as.next(4);

    // as.subscribe(v => console.log('C:', v));

    const promise = new Promise((resolve, reject) => {
      console.log('Promise is Created');
      resolve(100);
      resolve(200);
      resolve(300);
    });

    promise.then((val)=>{
      console.log(val)
    })

    const ob = new Observable((observer) => { 
      observer.next(100); 
      observer.next(200); 
      observer.next(300); 
    });
    ob.subscribe((val) => console.log('val ', val));

  }
  

  setTheme(isdark: boolean) {
    if (isdark) {
      this.isDarkMode = true;
      this.isActive = true;
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'dark');
      this.toggleSidenav.emit(true);
    } else {
      this.isDarkMode = false;
      this.isActive = false;
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'light');
      this.toggleSidenav.emit(false);
    }

  }

  search(value: string) {
    console.log('Search value:', value);
  }

  testMeth(){
    console.log('testMeth called');
  }

  getDashBoardMessage() {
    this.headerService.getDashBoardMessage();
  }
}
