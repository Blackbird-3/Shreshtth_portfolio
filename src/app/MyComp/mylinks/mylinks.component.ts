import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mylinks',
  templateUrl: './mylinks.component.html',
  styleUrls: ['./mylinks.component.css']
})
export class MylinksComponent implements OnInit{

  homeclick(){
    window.location.href = '/home';
      return; // Stop further processing
  }
  constructor() {}

  ngOnInit(): void {
  console.log("Hey There i'm glad you liked the site and want to see whats going on, check the repo at https://github.com/Blackbird-3");
  }
  @ViewChild('cursor') refCursor!: ElementRef<HTMLDivElement>;

@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  this.refCursor.nativeElement.style.left = (event.pageX -24)+ 'px';
  this.refCursor.nativeElement.style.top = (event.pageY-24) + 'px';
}

}
