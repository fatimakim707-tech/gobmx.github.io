import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

// ===== LUCES =====

const light = new THREE.PointLight(0xff8800, 300);

light.position.set(10, 10, 10);

scene.add(light);

// ===== ESTRELLAS =====

const starsGeometry = new THREE.BufferGeometry();

const starsCount = 5000;

const starsArray = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i++) {

  starsArray[i] = (Math.random() - 0.5) * 200;

}

starsGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(starsArray, 3)
);

const starsMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.02
});

const stars = new THREE.Points(
  starsGeometry,
  starsMaterial
);

scene.add(stars);

// ===== CORAZÓN =====

const heartShape = new THREE.Shape();

heartShape.moveTo(0, 0);

heartShape.bezierCurveTo(0, 0, -4, -4, -7, 2);

heartShape.bezierCurveTo(-9, 6, -5, 11, 0, 13);

heartShape.bezierCurveTo(5, 11, 9, 6, 7, 2);

heartShape.bezierCurveTo(4, -4, 0, 0, 0, 0);

const extrudeSettings = {
  depth: 2,
  bevelEnabled: true,
  bevelSegments: 5,
  steps: 2,
  bevelSize: 0.3,
  bevelThickness: 0.3
};

const heartGeometry =
  new THREE.ExtrudeGeometry(
    heartShape,
    extrudeSettings
  );

const heartMaterial =
  new THREE.MeshStandardMaterial({

    color: 0xff0000,

    emissive: 0xff0000,

    emissiveIntensity: 17,

    metalness: 1,

    roughness: 0.15

});

const heart =
  new THREE.Mesh(
    heartGeometry,
    heartMaterial
  );

heart.scale.set(0.3, 0.3, 0.3);

heart.rotation.z = Math.PI;

heart.position.set(0, 2, 2);

scene.add(heart);

// ===== GLOW =====

const glowGeometry = new THREE.TorusGeometry(
  5,
  0.12,
  32,
  200
);

const glowMaterial = new THREE.MeshBasicMaterial({
  color: 0xffFFf0,
  emissive: 0xf4A460, 
  emissiveIntensity: 5,
  metalness: 0.1,
  roughness: 0.1

});

const glowRing = new THREE.Mesh(
  glowGeometry,
  glowMaterial
);

glowRing.rotation.x = 1.4;

scene.add(glowRing);
const shadowRing = new THREE.Mesh(

  new THREE.TorusGeometry(
    5.2,
    0.30,
    30,
    200
  ),

  new THREE.MeshBasicMaterial({

    color: 0xf4A460,

    transparent: true,

    opacity: 0.25

  })

);

shadowRing.rotation.x = 1.3;

shadowRing.position.y = -0.6;

scene.add(shadowRing);
glowRing.rotation.x = 1.3;
glowRing.position.y = -0.6;

// ===== LETRAS =====

const phrases = [
  'TE AMO ❤️',
  'MI VIDA ✨',
  'MI AMOR 💖',
  'MI CIELO 💌',
  'SIEMPRE 💍',
  'CONTIGO ',
  'ERES TODO 🌙',
  'TE QUIERO',
  '👑',
  'SOLO TÚ 👫',
  '❤️💫',
  'I LOVE YOU MY HONEY 💖',
  'TE AMO ❤️',
  'MI VIDA ✨',
  'MI AMOR 💖',
  'MI CIELO 💌',
  'SIEMPRE 💍',
  'CONTIGO ',
  'ERES TODO 🌙',
  'TE QUIERO',
  '👑',
  'SOLO TÚ 👫',
  '❤️💫',
  'I LOVE YOU MY HONEY 💖'
];

const textElements = [];

for (let i = 0; i < phrases.length; i++) {

  const div = document.createElement('div');

  div.className = 'orbitText';

  div.innerText = phrases[i];

  document.body.appendChild(div);

  textElements.push({

  element: div,

  x:
  Math.cos(
    (i / phrases.length) *
    Math.PI * 2
  ) * 270 +

  (Math.random() - 0.5) * 80,

y:
  Math.sin(
    (i / phrases.length) *
    Math.PI * 2
  ) * 140 +

  (Math.random() - 0.5) * 50

 });
}

// ===== ANIMACIÓN =====

function animate() {

  requestAnimationFrame(animate);

  stars.rotation.y += 0.0005;

  glowRing.rotation.z += 0.003;

  heart.rotation.y += 0.01;

  textElements.forEach((text) => {

  text.element.style.left =
    `${window.innerWidth / 2 + text.x}px`;

  text.element.style.top =
    `${window.innerHeight / 2 + text.y}px`;

 });

  renderer.render(scene, camera);
}

animate();

// ===== RESPONSIVE =====

window.addEventListener('resize', () => {

  camera.aspect =
    window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

});
function createFloatingItem(symbol) {

  const item =
    document.createElement('div');

  item.className = 'floatingItem';

  item.innerHTML = symbol;

  document.body.appendChild(item);

  item.style.left =
    `${Math.random() * window.innerWidth}px`;

  item.style.top =
    `${window.innerHeight + 50}px`;

  const size =
    Math.random() * 30 + 20;

  item.style.fontSize =
    `${size}px`;

  const duration =
    Math.random() * 3 + 2;

  item.animate(

    [

      {
        transform:
          'translateY(0px)',
        opacity: 1
      },

      {
        transform:
          `translateY(-${window.innerHeight + 200}px)`,
        opacity: 0
      }

    ],

    {

      duration:
        duration * 1000,

      easing: 'ease-out'

    }

  );

  setTimeout(() => {

    item.remove();

  }, duration * 1000);

}

// ===== EFECTO 2 SEGUNDOS =====

const symbols = [
  '❤️',
  '🌸',
  '💖',
  '🌺',
  '💕',
  '🌷'
];

const interval = setInterval(() => {

  const randomSymbol =
    symbols[
      Math.floor(
        Math.random() * symbols.length
      )
    ];

  createFloatingItem(randomSymbol);

}, 120);

// detener después de 2 segundos

setTimeout(() => {

  clearInterval(interval);

}, 4000);
