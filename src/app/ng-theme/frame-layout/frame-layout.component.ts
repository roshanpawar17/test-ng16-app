import { Component } from '@angular/core';

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
