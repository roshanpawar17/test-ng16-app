import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, ContentChildren, DoCheck, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TestChildComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  @ContentChild('para') para!: ElementRef<any>;
  @ContentChildren('para') paras!: QueryList<ElementRef>;

  @ViewChild('h2Heading') h2Heading!: ElementRef;

  // @Input() message!: string;
  // @Input() list!: string[];

  name = 'Roshan';
  color = ''

  constructor(){
    // console.log('Test child Constructor Called');
    // console.log('Messaeg ', this.message);
    // console.log('Name ', this.name);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Test child OnChange called ', changes);
    // console.log('Message ', this.message);
    // console.log('list ', this.list);
  }

  ngOnInit(): void {
    // console.log('Test child OnInit called');
    // console.log('Message ', this.message);
    // console.log('list ', this.list);
  }

  ngDoCheck(): void {
    // console.log('Test child DoCheck called');
    // console.log('Test child DoCheck ContentChild ', this.para);
    // console.log('list ', this.list);
  }

  ngAfterContentInit(): void {
    // console.log('Test child ngAfterContentInit called');
    // console.log('Test child ngAfterContentInit ContentChild ', this.para.nativeElement);
  }

  ngAfterContentChecked(): void {
    // console.log('Test child ngAfterContentChecked called');
    // console.log('Test child ngAfterContentChecked ContentChild ', this.para.nativeElement);
  }

  ngAfterViewInit(): void {
    // console.log('Test child ngAfterViewInit called');
    // console.log('Test child ngAfterViewInit ContentChild ', this.h2Heading.nativeElement);
  }

  ngAfterViewChecked(): void {
    // console.log('Test child ngAfterViewChecked called');
    // console.log('Test child ngAfterViewChecked ContentChild ', this.h2Heading.nativeElement);
  }

  getProjectedContent() {
    // console.log('Project Content ', this.para);
    // console.log('Project Content nativeElement ', this.para.nativeElement);
    // console.log('Project Content nativeElement value - ', this.para.nativeElement.textContent);
    // this.para.nativeElement.style.color = 'blue';
    
    // this.paras.forEach((para, index, arr)=>{
    //   console.log('Project Content nativeElement ', para.nativeElement);
    //   para.nativeElement.style.color = 'blue';

    //   console.log('index ', index);
    //   console.log('arr ', arr);
    // });
  }

}
