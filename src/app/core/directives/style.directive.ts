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
