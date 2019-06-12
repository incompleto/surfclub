// script.js

const TAU = Zdog.TAU;
const white = "#fff";
const black = "#111";

let illo = new Zdog.Illustration({
  element: ".zdog-canvas",
  dragRotate: true,
  zoom: 3
});

let outline = new Zdog.Ellipse({
  addTo: illo,
  width: 120,
  height: 120,
  stroke: 5,
  color: "#000"
});

let eyeGroup = new Zdog.Group({
  addTo: illo,
  translate: { y: -15, x: -16 }
});

let eye = new Zdog.Ellipse({
  addTo: eyeGroup,
  width: 8,
  height: 26,
  stroke: 5,
  color: "#000",
  fill: true
});

let glitter = new Zdog.Ellipse({
  addTo: eyeGroup,
  width: 4,
  height: 8,
  stroke: 0,
  color: "#fff",
  fill: true,
  translate: { x: 1, y: -8, z: 1 }
});

eyeGroup.copyGraph({
  translate: { y: -15, x: 16 }
});

let mouth = new Zdog.Shape({
  addTo: illo,
  path: [
    { x: -35, y: 20 },
    {
      bezier: [{ x: -18, y: 48 }, { x: 18, y: 48 }, { x: 35, y: 20 }]
    }
  ],
  closed: false,
  stroke: 6,
  color: "#000"
});

let wrinkle = new Zdog.Shape({
  addTo: mouth,
  path: [
    { x: 0, y: 0 },
    {
      arc: [{ x: 6, y: -5 }, { x: 12, y: 0 }]
    }
  ],
  translate: { x: -40.5, y: 23 },
  rotate: { z: -TAU / 12 },
  stroke: 6,
  closed: false,
  color: "#000"
});

wrinkle.copyGraph({
  translate: { x: 29, y: 18 },
  rotate: { z: TAU / 12 }
});

function animate() {
  // illo.rotate.x = 0;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();

let $circles = document.querySelectorAll('.js-circle')

window.addEventListener('scroll', function(e) {
  let height = document.body.getBoundingClientRect().height
  let top = document.body.getBoundingClientRect().y
  let y = window.scrollY + 30 

  $circles[0].style.marginTop = `${y}px`;
  $circles[1].style.marginTop = `${y}px`;
})

