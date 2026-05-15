import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

/* =========================
   RESPONSIVE DETECTION
========================= */

const isMobile = window.innerWidth < 768;

/* =========================
   SCENE
========================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = isMobile ? 24 : 20;

/* =========================
   RENDERER
========================= */

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

/* =========================
   LIGHT
========================= */

const light = new THREE.PointLight(
  0xff8800,
  300
);

light.position.set(10, 10, 10);

scene.add(light);

/* =========================
   STARS
========================= */

const starsGeometry =
  new THREE.BufferGeometry();

const starsCount =
  isMobile ? 2000 : 5000;

const starsArray =
  new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i++) {

  starsArray[i] =
    (Math.random() - 0.5) * 200;

}

starsGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(
    starsArray,
    3
  )
);

const starsMaterial =
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: isMobile ? 0.03 : 0.02
  });

const stars =
  new THREE.Points(
    starsGeometry,
    starsMaterial
  );

scene.add(stars);

/* =========================
   HEART
========================= */

const heartShape =
  new THREE.Shape();

heartShape.moveTo(0, 0);

heartShape.bezierCurveTo(
  0, 0,
  -4, -4,
  -7, 2
);

heartShape.bezierCurveTo(
  -9, 6,
  -5, 11,
  0, 13
);

heartShape.bezierCurveTo(
  5, 11,
  9, 6,
  7, 2
);

heartShape.bezierCurveTo(
  4, -4,
  0, 0,
  0, 0
);

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

const heartScale =
  isMobile ? 0.22 : 0.3;

heart.scale.set(
  heartScale,
  heartScale,
  heartScale
);

heart.rotation.z = Math.PI;

heart.position.set(0, 2, 2);

scene.add(heart);

/* =========================
   GLOW RING
========================= */

const ringRadius =
  isMobile ? 3.8 : 5;

const glowGeometry =
  new THREE.TorusGeometry(
    ringRadius,
    0.12,
    32,
    200
  );

const glowMaterial =
  new THREE.MeshBasicMaterial({

    color: 0xffffff

  });

const glowRing =
  new THREE.Mesh(
    glowGeometry,
    glowMaterial
  );

glowRing.rotation.x = 1.3;

glowRing.position.y = -0.6;

scene.add(glowRing);

/* =========================
   SHADOW RING
========================= */

const shadowRing =
  new THREE.Mesh(

    new THREE.TorusGeometry(
      ringRadius + 0.2,
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

/* =========================
   TEXTS
========================= */

const phrases = [

  'TE AMO ❤️',
  'MI VIDA ✨',
  'MI AMOR 💖',
  'MI CIELO 💌',
  'SIEMPRE 💍',
  'CONTIGO ❤️',
  'ERES TODO 🌙',
  'TE QUIERO 💕',
  '👑',
  'SOLO TÚ 👫',
  '❤️💫',
  'I LOVE YOU 💖'

];

const textElements = [];

const radiusX =
  isMobile ? 140 : 270;

const radiusY =
  isMobile ? 90 : 140;

for (let i = 0; i < phrases.length; i++) {

  const div =
    document.createElement('div');

  div.className = 'orbitText';

  div.innerText = phrases[i];

  document.body.appendChild(div);

  textElements.push({

    element: div,

    x:
      Math.cos(
        (i / phrases.length) *
        Math.PI * 2
      ) * radiusX +

      (Math.random() - 0.5) * 40,

    y:
      Math.sin(
        (i / phrases.length) *
        Math.PI * 2
      ) * radiusY +

      (Math.random() - 0.5) * 30

  });

}

/* =========================
   FLOATING ITEMS
========================= */

function createFloatingItem(symbol) {

  const item =
    document.createElement('div');

  item.className =
    'floatingItem';

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
    isMobile
      ? Math.random() * 2 + 2
      : Math.random() * 3 + 2;

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

/* =========================
   FLOATING EFFECT
========================= */

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
        Math.random() *
        symbols.length
      )
    ];

  createFloatingItem(randomSymbol);

}, 120);

setTimeout(() => {

  clearInterval(interval);

}, 4000);

/* =========================
   MOUSE PARALLAX
========================= */

document.addEventListener(
  'mousemove',
  (event) => {

    const mouseX =
      (event.clientX /
      window.innerWidth) - 0.5;

    const mouseY =
      (event.clientY /
      window.innerHeight) - 0.5;

    heart.rotation.x =
      mouseY * 0.5;

    heart.rotation.y =
      mouseX * 0.5;

  }
);

/* =========================
   HEART BEAT
========================= */

let scaleDirection = 1;

function pulseHeart() {

  const minScale =
    isMobile ? 0.22 : 0.3;

  const maxScale =
    isMobile ? 0.25 : 0.34;

  heart.scale.x +=
    0.0008 * scaleDirection;

  heart.scale.y +=
    0.0008 * scaleDirection;

  heart.scale.z +=
    0.0008 * scaleDirection;

  if (heart.scale.x >= maxScale) {

    scaleDirection = -1;

  }

  if (heart.scale.x <= minScale) {

    scaleDirection = 1;

  }

}

/* =========================
   ANIMATION
========================= */

function animate() {

  requestAnimationFrame(animate);

  stars.rotation.y += 0.0005;

  glowRing.rotation.z += 0.003;

  shadowRing.rotation.z -= 0.002;

  pulseHeart();

  textElements.forEach((text, index) => {

    const time =
      Date.now() * 0.0003;

    const offsetX =
      Math.cos(time + index) * 10;

    const offsetY =
      Math.sin(time + index) * 10;

    text.element.style.left =
      `${window.innerWidth / 2 + text.x + offsetX}px`;

    text.element.style.top =
      `${window.innerHeight / 2 + text.y + offsetY}px`;

  });

  renderer.render(scene, camera);

}

animate();

/* =========================
   RESPONSIVE
========================= */

window.addEventListener(
  'resize',
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);
