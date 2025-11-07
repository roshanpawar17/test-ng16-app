import { Component, EventEmitter, inject, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header', // element-directive
  // selector: '[app-header]', // attribute directive
  // selector: '.app-header', // class directive
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input() title: string = 'Default Title';
  @Output() toggleSidenav = new EventEmitter<any>();
  
  isDarkMode: boolean = false;
  isActive: boolean = false;
  
  renderer = inject(Renderer2);
  
  ngOnInit(): void {
    // console.log('Title:', this.title);
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
}
