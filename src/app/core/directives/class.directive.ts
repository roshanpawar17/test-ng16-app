import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClass]'
})
export class ClassDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() set appClass(value: Object | string) {
    if (typeof value === 'object') {
      const entries = Object.entries(value);
      for (let entry of entries) {
        let [className, condition] = entry;

        if (condition) {
          this.renderer.addClass(this.el.nativeElement, className);
        }
      }


    } else if (value && typeof value === 'string') {
      this.renderer.addClass(this.el.nativeElement, value);
    }
  }

}
