import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-frame-layout',
  templateUrl: './frame-layout.component.html',
  styleUrls: ['./frame-layout.component.scss']
})
export class FrameLayoutComponent {

  @ViewChild(HeaderComponent) headerComp!: HeaderComponent;

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
}
