import { Component, ContentChild, ContentChildren, DoCheck, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.scss']
})
export class TestChildComponent implements OnChanges, OnInit, DoCheck {

  @ContentChild('para') para!: ElementRef<any>;
  @ContentChildren('para') paras!: QueryList<ElementRef>;

  // @Input() message!: string;
  @Input() list!: string[];

  name = 'Roshan';

  constructor(){
    console.log('Constructor Called');
    // console.log('Messaeg ', this.message);
    // console.log('Name ', this.name);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes ', changes);
    // console.log('Message ', this.message);
    console.log('list ', this.list);
  }

  ngOnInit(): void {
    console.log('OnInit');
    // console.log('Message ', this.message);
    console.log('list ', this.list);
  }

  ngDoCheck(): void {
     console.log('DoCheck');
    console.log('list ', this.list);
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
