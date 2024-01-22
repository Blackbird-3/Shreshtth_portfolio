import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  abtclick(){
    window.location.href = '/about';
      return; // Stop further processing
  }
  contactclick(){
    window.location.href = '/contact';
    return;
  }
  projclick(){
    window.location.href = '/projects';
    return;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
