import { Component, inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header', // element-directive
  // selector: '[app-header]', // attribute directive
  // selector: '.app-header', // class directive
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDarkMode: boolean = false;
  isActive: boolean = false;

  renderer = inject(Renderer2);

  setTheme(isdark: boolean) {
    if (isdark) {
      this.isDarkMode = true;
      this.isActive = true;
      this.renderer.addClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.isDarkMode = false;
      this.isActive = false;
      this.renderer.removeClass(document.body, 'dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
