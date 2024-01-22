import { Component, OnInit } from '@angular/core';

// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {
  homeclick(){
    window.location.href = '/home';
      return; // Stop further processing
  }
  ngOnInit(): void {
  console.log("Hey There i'm glad you liked the site and want to see whats going on, check the repo at https://github.com/Blackbird-3");


}

}
