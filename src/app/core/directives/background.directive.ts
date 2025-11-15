import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective implements OnInit {

  @Input('appBackground') appBackgroundColor: string = 'lightblue'; 

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    // this.el.nativeElement.style.backgroundColor = 'red';
    // this.el.nativeElement.style.color = 'white';
    // this.el.nativeElement.style.padding = '1rem'
    // this.el.nativeElement.style.margin = '1rem 0'

    // this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'red');
    // this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    // this.renderer.setStyle(this.el.nativeElement, 'padding', '1rem');
    // this.renderer.setStyle(this.el.nativeElement, 'margin', '1rem 0');

    // this.renderer.setProperty(this.el.nativeElement, 'textContent', 'Hello!');
    // this.renderer.setAttribute(this.el.nativeElement, 'title', 'Hi');

    // const newDiv = this.renderer.createElement('div');
    // const text = this.renderer.createText('Hello from Renderer2!');
    // this.renderer.appendChild(newDiv, text);
    // this.renderer.appendChild(this.el.nativeElement, newDiv);

    // this.renderer.listen(this.el.nativeElement, 'click', () => {
    //   alert('Element clicked!');
    // });

    // this.renderer.listen(this.el.nativeElement, 'mouseenter', () => {
    //   this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appBackgroundColor);
    // });

    // this.renderer.listen(this.el.nativeElement, 'mouseout', () => {
    //   this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '');
    // });

    // this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appBackgroundColor);
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event) {
    // console.log('Mouseenter Event ', event);
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appBackgroundColor);
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: Event) {
    // console.log('Mouseout Event ', event);
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '');
  }



}
