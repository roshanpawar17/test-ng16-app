import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDisabled]'
})
export class DisabledDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input() set appDisabled(disabled: boolean) {
    if (disabled) {
      this.renderer.addClass(this.el.nativeElement, 'disabled');
    } 
  }

}
