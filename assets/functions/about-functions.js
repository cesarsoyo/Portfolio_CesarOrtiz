var canvas = document.querySelector("#canvas"),
  ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var config = {
  particleNumber: 800,
  maxParticleSize: 10,
  maxSpeed: 40,
  colorVariation: 50
};


var colorPalette = {
  bg: { r: 12, g: 9, b: 29 },
  matter: [
    { r: 127, g: 0, b: 255 },
    { r: 255, g: 105, b: 180 },
    { r: 12, g: 191, b: 255 },
    { r: 128, g: 128, b: 128 }
  ]
};


var particles = [],
  centerX = canvas.width / 2,
  centerY = canvas.height / 2,
  drawBg,

  drawBg = function (ctx, color) {
    ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

var Particle = function (x, y) {
  this.x = x || Math.round(Math.random() * canvas.width);
  this.y = y || Math.round(Math.random() * canvas.height);
  this.r = Math.ceil(Math.random() * config.maxParticleSize);
  this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
  this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
  this.d = Math.round(Math.random() * 360);
};

var colorVariation = function (color, returnString) {
  var r, g, b, a, variation;
  r = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.r);
  g = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.g);
  b = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.b);
  a = Math.random() + .5;
  if (returnString) {
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  } else {
    return { r, g, b, a };
  }
};

var updateParticleModel = function (p) {
  var a = 180 - (p.d + 90);
  p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
  p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
  return p;
};

var drawParticle = function (x, y, r, c) {
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
};

var cleanUpArray = function () {
  particles = particles.filter(p => {
    return p.x > -100 && p.y > -100;
  });
};


var initParticles = function (numParticles, x, y) {
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(x, y));
  }
  particles.forEach(p => {
    drawParticle(p.x, p.y, p.r, p.c);
  });
};

window.requestAnimFrame = function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
}();


var frame = function () {
  drawBg(ctx, colorPalette.bg);
  particles.map(p => {
    return updateParticleModel(p);
  });
  particles.forEach(p => {
    drawParticle(p.x, p.y, p.r, p.c);
  });
  window.requestAnimFrame(frame);
};

document.body.addEventListener("click", function (event) {
  var x = event.clientX,
    y = event.clientY;
  cleanUpArray();
  initParticles(config.particleNumber, x, y);
});

frame();

initParticles(config.particleNumber);

// screen particles responsive


var mediaQueries = [
  { maxWidth: 360, maxHeight: 800, sizeRatio: 0.5 },
  { maxWidth: 450, maxHeight: 950, sizeRatio: 0.6 },
  { maxWidth: 850, maxHeight: 1250, sizeRatio: 0.9 }
];

var Particle = function (x, y) {
  this.x = x || Math.round(Math.random() * canvas.width);
  this.y = y || Math.round(Math.random() * canvas.height);
  this.r = Math.ceil(Math.random() * config.maxParticleSize);
  this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
  this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed),.7);
  this.d = Math.round(Math.random() * 360);
  this.className = 'particle';

  mediaQueries.some(function (mq) {
    if (window.matchMedia("(max-width: " + mq.maxWidth + "px) and (max-height: " + mq.maxHeight + "px)").matches) {
      this.r = Math.ceil(Math.random() * (config.maxParticleSize * mq.sizeRatio));
      return true;
    }
    return false;
  }, this);
};


// 3D effect in projects images

const posters = document.querySelectorAll('.poster-pages')

for (let i = 0; i < posters.length; i++) {
  const poster = posters[i]
  const height = poster.clientHeight
  const width = poster.clientWidth

  poster.addEventListener('mousemove', (evt) => {
    const { layerX, layerY } = evt
    const yRotation = (
      (layerX - width / 2) / width
    ) * 20
    const xRotation = (
      (layerY - height / 2) / height
    ) * 20

    const string = `
    perspective(500px)
    scale(1.1)
    rotateX(${xRotation}deg)
    rotateY(${yRotation}deg)`

    poster.style.transform = string
  })

  poster.addEventListener('mouseout', () => {
    poster.style.transform = `
    perspective(500px)
    scale(1)
    rotateX(0)
    rotateY(0)`

  })
}

function toggleMenu() {
  const linksContainer = document.getElementById("links-container");
  linksContainer.classList.toggle("show");
}

// Carousel logos
var copy = document.querySelector(".logos-slide").cloneNode(true)
document.querySelector('.logos').appendChild(copy)


// Images Formulaire
const formContainer = document.querySelector('.form-container');

const imageSources = [
  '../medias/person-icon.svg',
  '../medias/crew-icon.svg',
  '../medias/email-icon.svg',
  '../medias/cellphone-icon.svg',
  '../medias/message-icon.svg',
  '../medias/project-icon.svg'
];

const hoverSources = [
  '../medias/person-icon-hover.svg',
  '../medias/crew-icon-hover.svg',
  '../medias/email-icon-hover.svg',
  '../medias/cellphone-icon-hover.svg',
  '../medias/message-icon-hover.svg',
  '../medias/project-icon-hover.svg'
];

const btnFormImageSource = '../medias/sending-icon.svg';
const btnFormImageHoverSource = '../medias/sending-icon-hover.svg';

const iconsForm = [];
for (let i = 0; i < imageSources.length; i++) {
  const img = document.createElement('img');
  img.src = imageSources[i];
  img.className = 'icons-form';
  img.alt = 'Icone';
  iconsForm.push(img);
}

const labelCards = document.querySelectorAll('.label-cards');
for (let i = 0; i < labelCards.length; i++) {
  labelCards[i].appendChild(iconsForm[i]);
}

const btnForm = document.querySelector('.btn-form-container button');

const btnFormImage = document.createElement('img');
btnFormImage.src = btnFormImageSource;
btnFormImage.className = 'btn-form-image';
btnFormImage.alt = 'Icone d\'envoi';

btnForm.insertBefore(btnFormImage, btnForm.firstChild);
btnForm.style.display = 'flex';
btnForm.style.alignItems = 'center';
btnForm.style.gap = "10px"
btnForm.style.transition = ".5s"

formContainer.onmouseover = function () {
  for (let i = 0; i < iconsForm.length; i++) {
    iconsForm[i].src = hoverSources[i];
  }
  btnFormImage.src = btnFormImageHoverSource;
};

formContainer.onmouseout = function () {
  for (let i = 0; i < iconsForm.length; i++) {
    iconsForm[i].src = imageSources[i];
  }
  btnFormImage.src = btnFormImageSource;
};




const contactCardImages = document.querySelectorAll('.mycontact-card img');
const contactLogosImages = document.querySelectorAll('.mycontact-logos img');

const contactCardImageSources = ['../medias/cellphone-icon.svg', '../medias/email-icon.svg'];
const contactLogosImageSources = ['../medias/logo-linkedin.svg', '../medias/whatsapp-icon.svg'];

const contactCardHoverSources = ['../medias/cellphone-icon-hover-yellow.svg', '../medias/email-icon-hover-yellow.svg'];
const contactLogosHoverSources = ['../medias/logo-linkedin-hover.svg', '../medias/whatsapp-icon-hover.svg'];


formContainer.addEventListener('mouseover', () => {
  contactCardImages.forEach((image, index) => {
    image.src = contactCardHoverSources[index];
  });

  contactLogosImages.forEach((image, index) => {
    image.src = contactLogosHoverSources[index];
  });
});

formContainer.addEventListener('mouseout', () => {
  contactCardImages.forEach((image, index) => {
    image.src = contactCardImageSources[index];
  });

  contactLogosImages.forEach((image, index) => {
    image.src = contactLogosImageSources[index];
  });
});

