import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const contenedor = document.getElementById('marill-contenedor');
 
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfe9f7); 
 
const camera = new THREE.PerspectiveCamera(
  45,                                                  
  contenedor.clientWidth / contenedor.clientHeight,    
  0.1,                                                 
  100                                                 
);
camera.position.set(0, 2.5, 9); 
 
const renderer = new THREE.WebGLRenderer({ antialias: true }); 
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
renderer.setSize(contenedor.clientWidth, contenedor.clientHeight);
contenedor.appendChild(renderer.domElement); 
 
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.4, 0); 
controls.enableZoom = false;    

const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(luzAmbiente);
 
const luzSol = new THREE.DirectionalLight(0xffffff, 2);
luzSol.position.set(5, 8, 6);
scene.add(luzSol);
 
const luzPunto = new THREE.PointLight(0x88ccff, 30, 20);
luzPunto.position.set(-5, 3, 4);
scene.add(luzPunto);

const azul       = new THREE.MeshStandardMaterial({ color: 0x2f9be3, roughness: 0.5 });
const azulClaro  = new THREE.MeshStandardMaterial({ color: 0x7ec0f2, roughness: 0.5 });
const azulOscuro = new THREE.MeshStandardMaterial({ color: 0x2a6fb8, roughness: 0.5 });
const panza      = new THREE.MeshStandardMaterial({ color: 0xe3eaf0, roughness: 0.7 }); 
const naranja    = new THREE.MeshStandardMaterial({ color: 0xe0603f, roughness: 0.6 }); 
const rosa       = new THREE.MeshStandardMaterial({ color: 0xd0688e, roughness: 0.5 }); 
const blanco     = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
const negro      = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3 });
 
function crearEsfera(radio, material, x, y, z, escala = [1, 1, 1]) {
  const geometria = new THREE.SphereGeometry(radio, 32, 32); 
  const malla = new THREE.Mesh(geometria, material);
  malla.position.set(x, y, z);
  malla.scale.set(escala[0], escala[1], escala[2]); 
  return malla;
}

const marill = new THREE.Group();

marill.add(crearEsfera(1.3, azul, 0, 0.9, 0));

const geometriaPanza = new THREE.SphereGeometry(1.32, 32, 32, 0, Math.PI * 2, 2.2, Math.PI - 2.2);
const barriga = new THREE.Mesh(geometriaPanza, panza);
barriga.position.set(0, 0.9, 0); 
marill.add(barriga);
 
marill.add(crearEsfera(0.5, azul, -1.0, 1.95, -0.1));
marill.add(crearEsfera(0.5, azul, 1.0, 1.95, -0.1));
marill.add(crearEsfera(0.32, naranja, -1.0, 1.95, 0.32, [1, 1, 0.3]));
marill.add(crearEsfera(0.32, naranja, 1.0, 1.95, 0.32, [1, 1, 0.3]));
 
marill.add(crearEsfera(0.13, negro, -0.4, 1.25, 1.15));
marill.add(crearEsfera(0.13, negro, 0.4, 1.25, 1.15));
marill.add(crearEsfera(0.045, blanco, -0.43, 1.3, 1.265)); 
marill.add(crearEsfera(0.045, blanco, 0.37, 1.3, 1.265));  
 
marill.add(crearEsfera(0.04, negro, 0, 1.05, 1.3));                  
marill.add(crearEsfera(0.16, rosa, 0, 0.82, 1.28, [1, 0.7, 0.5]));   
 
const brazoIzq = crearEsfera(0.28, azul, -1.25, 0.8, 0.35, [1.3, 0.8, 0.8]);
const brazoDer = crearEsfera(0.28, azul, 1.25, 0.8, 0.35, [1.3, 0.8, 0.8]);
brazoIzq.rotation.z = 0.4;  
brazoDer.rotation.z = -0.4;
marill.add(brazoIzq);
marill.add(brazoDer);

marill.add(crearEsfera(0.32, azul, -0.6, -0.35, 0.45, [1, 0.7, 1.3]));
marill.add(crearEsfera(0.32, azul, 0.6, -0.35, 0.45, [1, 0.7, 1.3]));

const geometriaCola = new THREE.CylinderGeometry(0.12, 0.15, 1.2, 16); 
const cola = new THREE.Mesh(geometriaCola, azulOscuro);
cola.position.set(0, 1.2, -1.4);
cola.rotation.x = -0.5; 
marill.add(cola);
marill.add(crearEsfera(0.5, azulClaro, 0, 1.9, -1.8));

marill.position.y = 0.35;
scene.add(marill);

const reloj = new THREE.Clock();
 
function animar() {
  requestAnimationFrame(animar); 
 
  const tiempo = reloj.getElapsedTime();
  marill.rotation.y = tiempo * 0.5;                                
  marill.position.y = 0.35 + Math.abs(Math.sin(tiempo * 2)) * 0.2; 
 
  controls.update();
  renderer.render(scene, camera); 
}
animar();

window.addEventListener('resize', () => {
  camera.aspect = contenedor.clientWidth / contenedor.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(contenedor.clientWidth, contenedor.clientHeight);
});