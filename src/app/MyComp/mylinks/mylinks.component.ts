import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import gsap from "gsap";
import Glide from '@glidejs/glide';


@Component({
  selector: 'app-mylinks',
  templateUrl: './mylinks.component.html',
  styleUrls: ['./mylinks.component.css']
})
export class MylinksComponent implements OnInit{

  constructor() {}
  ngAfterViewInit() {
    new Glide('.glide').mount();
  }

  ngOnInit(): void {

  }
  @ViewChild('cursor') refCursor!: ElementRef<HTMLDivElement>;

@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  this.refCursor.nativeElement.style.left = (event.pageX -24)+ 'px';
  this.refCursor.nativeElement.style.top = (event.pageY-24) + 'px';
}

}
