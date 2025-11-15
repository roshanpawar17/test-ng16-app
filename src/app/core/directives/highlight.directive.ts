import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  constructor() { }

  @Input() appHighlight: string = '';
  @Input() customeInput: string = '';

  // @HostBinding('style.backgroundColor') backgroundColor = 'red';
  // @HostBinding('class') class = '';
  // @HostBinding('class.hover-style') class = false;
  @HostBinding('style.color') hcolor = '';

  ngOnInit(): void {
    this.hcolor = this.appHighlight
  }

  @HostListener('mouseenter')
  mouseEnter() {
    // this.backgroundColor = 'blue';
    // this.class = 'hover-style';
    // this.class = true;
  }

  @HostListener('mouseout')
  mouseOut() {
    // this.backgroundColor = 'red';
    // this.class = 'dafult-style';
    // this.class = false;
  }

}
