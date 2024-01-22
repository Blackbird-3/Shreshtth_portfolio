import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders//MTLLoader.js';
import { TGALoader } from 'three/examples/jsm/loaders//TGALoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css']
})
export class RangeComponent implements OnInit{

  ngOnInit(): void {


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGL1Renderer();
    const container = document.getElementById('#bg');

        if (container) {
          container.appendChild(renderer.domElement);
        }
    document.body.appendChild(renderer.domElement)
    let isHovered = false;
    let textAnimation: any = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const materials = [
      new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/crate.gif') }),  // Material for back face
      new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/crate.gif') }),  // Material for top face
      new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/crate.gif') }),  // Material for bottom face
      new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/crate.gif') }),  // Material for right face
      new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/crate.png') }),  // Material for front face
      new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load('assets/crate.gif') })   // Material for left face
    ];
    const texture = new THREE.TextureLoader().load('assets/crate.png');
    texture.minFilter= THREE.NearestFilter;
    // const cratematerial = new THREE.MeshStandardMaterial(materials);
    const boxgeometry = new THREE.BoxGeometry(6,6,6);
    const crate1= new THREE.Mesh( boxgeometry, materials);
    const crate2= new THREE.Mesh( boxgeometry, materials);
    const crate3= new THREE.Mesh( boxgeometry, materials);

    crate1.position.set(-12,-2,0);
    crate2.position.set(0,-2,0);
    crate3.position.set(12,-2,0);
    scene.add(crate1);
    scene.add(crate2);
    scene.add(crate3);

let skilltext: THREE.Mesh;
let abttxt: THREE.Mesh;
let prjtxt: THREE.Mesh;
let ctctxt: THREE.Mesh;
const loader = new FontLoader();
// const floader = new FontLoader();

    loader.load( 'assets/optimer_bold.typeface.json', function ( font ) {

      const skillgeometry = new TextGeometry( 'Shreshtth Kumar \n      Agarwaal', {
        font: font,
        size: 1,
        height: .2,
        curveSegments: 12,

      } );
      const textmaterial = new THREE.MeshBasicMaterial({color: 0x00ffff} )
      skilltext = new THREE.Mesh(skillgeometry, textmaterial)
      skilltext.position.set(1.5, 5, 0);
      skilltext. rotation.x += 0.1;
      skillgeometry.center();
      scene.add(skilltext)

      });

      loader.load('assets/optimer_bold.typeface.json', function (mono){
      // floader.load('assets/MonomaniacOne.json', function (mono){
        const txtgeo = new TextGeometry('ABOUT ME',{
          font:mono,
          size:1,
          height:.1
        });
        txtgeo.center();
        const txtmaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
        abttxt= new THREE.Mesh(txtgeo, txtmaterial)
        abttxt.position.set(-12, 1.7, 2);
        scene.add(abttxt)


      }
      , undefined, function (error) {
        console.error('Failed to load font:', error);
      })
      loader.load('assets/optimer_bold.typeface.json', function (mono){
      // floader.load('assets/MonomaniacOne.json', function (mono){
        const txtgeo = new TextGeometry('PROJECTS',{
          font:mono,
          size:1,
          height:.1
        });
        txtgeo.center();
        const txtmaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
        prjtxt= new THREE.Mesh(txtgeo, txtmaterial)
      prjtxt.position.set(-0, 1.7, 2);
      scene.add(prjtxt)


      }
      , undefined, function (error) {
        console.error('Failed to load font:', error);
      })
      loader.load('assets/optimer_bold.typeface.json', function (mono){
      // floader.load('assets/MonomaniacOne.json', function (mono){
        const txtgeo = new TextGeometry('CONTACT',{
          font:mono,
          size:1,
          height:.1
        });
        txtgeo.center();
        const txtmaterial = new THREE.MeshBasicMaterial({color: 0xff0000})
        ctctxt= new THREE.Mesh(txtgeo, txtmaterial)
      ctctxt.position.set(12, 1.7, 2);
      scene.add(ctctxt)


      }
      , undefined, function (error) {
        console.error('Failed to load font:', error);
      })




      const gunContainer = new THREE.Object3D();
      const objmat = new MTLLoader()
      objmat.load('assets/Glock18/Glock18.mtl', function (matl){
        matl.preload();

        const objLoader = new OBJLoader();
        objLoader.setMaterials(matl);
        objLoader.load('assets/Glock18/Glock18.obj', function(obj){
          obj.position.set(9,-5,20)
          obj.rotateY(1.7)
          obj.scale.set(1.4,1.4,1.4)
          gunContainer.add(obj);
        })
      })
      scene.add(gunContainer);

      document.addEventListener('click', function () {
        // Animate the gun
        const tween = new TWEEN.Tween(gunContainer.rotation)
  .to({ z: Math.PI / 6 }, 100) // Rotate around the z-axis
  .easing(TWEEN.Easing.Quadratic.Out)
  .onComplete(function () {
    // Reset the gun to its default state
    gunContainer.rotation.set(0, 0, 0);
  })
  .start();

      });

      window.addEventListener('click', onClick, false);

// Mousemove event listener
renderer.domElement.addEventListener('mousemove', onCrateMouseMove);

// Mouseout event listener
renderer.domElement.addEventListener('mouseout', onCrateMouseOut);

function onCrateMouseMove(event: MouseEvent) {
  // Calculate mouse position normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set the raycaster origin and direction based on the mouse position
  raycaster.setFromCamera(mouse, camera);

  // Find intersecting objects
  const intersects = raycaster.intersectObjects(scene.children, true);

  // Check if the mouse intersects with the crate
  const isMouseOverCrate1 = intersects.some(intersect => intersect.object === crate1);
  const isMouseOverCrate2 = intersects.some(intersect => intersect.object === crate2);
  const isMouseOverCrate3 = intersects.some(intersect => intersect.object === crate3);

  // Apply hover animation if the mouse is over the crate
  if (isMouseOverCrate1) {
    abttxt.scale.set(1.2, 1.2, 1.2);
  } else {
    abttxt.scale.set(1, 1, 1);
  }
  if (isMouseOverCrate2) {
    prjtxt.scale.set(1.2, 1.2, 1.2);
  } else {
    prjtxt.scale.set(1, 1, 1);
  }
  if (isMouseOverCrate3) {
    ctctxt.scale.set(1.2, 1.2, 1.2);
  } else {
    ctctxt.scale.set(1, 1, 1);
  }
}

function onCrateMouseOut(event: MouseEvent) {
  // Reset the crate to its original state when the mouse moves out of the renderer's DOM element
  abttxt.scale.set(1, 1, 1);
  ctctxt.scale.set(1, 1, 1);
  prjtxt.scale.set(1, 1, 1);
}


function onClick(event: MouseEvent) {
  // Calculate mouse position normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set the raycaster origin and direction based on the mouse position
  raycaster.setFromCamera(mouse, camera);

  // Find intersecting objects
  const intersects = raycaster.intersectObjects(scene.children, true);

  // Check if the crate is clicked
  for (const intersect of intersects) {
    if (intersect.object === crate1) {
      window.location.href = '/wordcloud';
      return; // Stop further processing
    }
    if (intersect.object === crate2) {
      window.location.href = '/skills';
      return; // Stop further processing
    }
    if (intersect.object === crate3) {
      window.location.href = '/links';
      return; // Stop further processing
    }
  }
}
      // crate1.addEventListener( 'click', function(){
      //   window.location.href='/wordcloud';
      // })
      // crate1.addEventListener('mouseover', () => {
      //   isHovered = true;
      //   animateText();
      // });

      // Mouseout event listener
//       crate1.addEventListener('mouseout', () => {
//   isHovered = false;
//   if (textAnimation) {
//     textAnimation.stop();
//   }
//   // Reset the position or any other desired properties of the text geometry
//   abttxt.position.set(1.5, 5, 0);
// });

function animateText() {
  // Add your animation logic here using Tween.js
  const speed = 1; // Adjust the speed of the animation as needed
  const amplitude = 0.5; // Adjust the amplitude of the animation as needed

  textAnimation = new TWEEN.Tween(abttxt.position)
    .to({ y: 5 + amplitude }, speed * 1000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .yoyo(true)
    .repeat(Infinity)
    .start();

  animate(); // Start the animation loop
}

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(30)

    const rangetexture = new THREE.TextureLoader().load('assets/rangebg.png');
    scene.background=rangetexture;

    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(ambientLight);

    // const controls = new OrbitControls(camera, renderer.domElement)
    let rotationAngle = 0;
function animate(): void {
  window.requestAnimationFrame(animate);
  rotationAngle += 0.02;
  // skilltext.rotation.y = rotationAngle;
  // controls.update()
  TWEEN.update();
  renderer.render(scene, camera)
}
animate();
  }

}
