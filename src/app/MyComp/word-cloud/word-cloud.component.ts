import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {

  homeclick(){
    window.location.href = '/home';
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
  cvclick(){

  }
  @ViewChild('container', { static: true }) containerRef!: ElementRef;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  words: string[] = [
    'HTML', 'CSS', 'JavaScript', 'Angular', 'Python', 'C#', 'C++', 'Java', 'SQL', 'Three.js', 'TypeScript',
    'Flutter', 'Dart', 'MS Office', 'Node.js', 'OOPS', 'SDLC', 'NPM', 'Deep Learning'
  ];
  wordMeshes: THREE.Mesh[] = [];

  ngOnInit(): void {
  console.log("Hey There i'm glad you liked the site and want to see whats going on, check the repo at https://github.com/Blackbird-3");

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initControls();
    this.createWordMeshes();
    this.renderScene();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
  }

  private initCamera(): void {
    const width = this.containerRef.nativeElement.clientWidth;
    const height = this.containerRef.nativeElement.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 100;
  }

  private initRenderer(): void {
    const width = this.containerRef.nativeElement.clientWidth;
    const height = this.containerRef.nativeElement.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true , alpha: true});
    this.renderer.setSize(600,400);
    this.containerRef.nativeElement.appendChild(this.renderer.domElement);
  }

  private initControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  private createWordMeshes(): void {
    const fontLoader = new FontLoader();

    fontLoader.load('assets/optimer_bold.typeface.json', (font) => {
      // const material = new THREE.MeshBasicMaterial({ color: 0x01fffd });
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const spacing = 100;

      for (let i = 0; i < this.words.length; i++) {
        const word = this.words[i];
        const textGeometry = new TextGeometry(word, {
          font: font,
          size: 5,
          height: 0.5,
          curveSegments: 12,
          bevelEnabled: false
        });
        const wordMesh = new THREE.Mesh(textGeometry, material);
        wordMesh.position.set(
          (Math.random() - 0.5) * spacing,
          (Math.random() - 0.5) * spacing,
          (Math.random() - 0.5) * spacing
        );
        this.wordMeshes.push(wordMesh);
        this.scene.add(wordMesh);
      }
    });
  }

  private update(): void {
    const time = Date.now() * 0.0005;

    for (let i = 0; i < this.wordMeshes.length; i++) {
      const wordMesh = this.wordMeshes[i];
      const radius = 30;
      const angle = time + (i * Math.PI * 2) / this.wordMeshes.length;

      wordMesh.position.x = radius * Math.cos(angle);
      wordMesh.position.y = radius * Math.sin(angle);
      const cameraPosition = this.camera.position;

    for (let i = 0; i < this.wordMeshes.length; i++) {
      const wordMesh = this.wordMeshes[i];
      wordMesh.lookAt(cameraPosition);
    }
    }

  }


  private renderScene(): void {
    requestAnimationFrame(() => this.renderScene());

    this.update();

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
