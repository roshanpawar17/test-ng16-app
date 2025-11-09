import { Component, ViewChild, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, OnChanges, OnInit, DoCheck, SimpleChanges, Input, } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-frame-layout',
  templateUrl: './frame-layout.component.html',
  styleUrls: ['./frame-layout.component.scss']
})
export class FrameLayoutComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  @ViewChild(HeaderComponent) headerComp!: HeaderComponent;

  @Input() t!: string;

  title = 'Header';
  message: string = 'Hi';
  toggle: boolean = false;

  list = ['Roshan'];

  onToggle(isDarkMode: boolean) {
    console.log('Sidenav toggled. Dark mode is now:', isDarkMode);
    this.headerComp.testMeth();
  }

  changeMsg() {
    this.toggle = !this.toggle;
    this.message = this.toggle ? 'Hello' : 'Hi';

    this.list.push('Omkar');
  }

  constructor(){
    // console.log('Frame-layout parent contructor called ');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Frame-layout parent OnChange called ');
  }

  ngOnInit(): void {
    // console.log('Frame-layout parent OnInit called');
  }

  ngDoCheck(): void {
    // console.log('Frame-layout parent DoCheck called');
  }

  ngAfterContentInit(): void {
    // console.log('Frame-layout parent ngAfterContentInit called');
  }

  ngAfterContentChecked(): void {
    // console.log('Frame-layout parent ngAfterContentChecked called');
  }

  ngAfterViewInit(): void {
    // console.log('Frame-layout parent ngAfterViewInit called');
  }

  ngAfterViewChecked(): void {
    // console.log('Frame-layout parent ngAfterViewChecked called');
  }
}
