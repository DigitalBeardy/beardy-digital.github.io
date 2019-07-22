class Starscape {
  constructor(){
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('starscape');
    document.body.insertAdjacentElement('afterbegin', this.canvas);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    window.starscapeContext = this.canvas.getContext('2d');

    this.stars = {
      nearStar : { width : 3, speed : 0.2 },
      midStar : { width : 2, speed : 0.1 },
      farStar : { width : 1, speed : 0.025 }
    };
    this.starArray = [];

    this.initialise();
    this.animate();
    this.bind();
  }

  initialise = () => {
    this.starArray = [];
    for (let i=0; i < 50; ++i) {
      const x = Math.random() * (window.innerWidth - this.stars.nearStar.width);
      const y = Math.random() * (window.innerHeight - this.stars.nearStar.width);
      const radius = (Math.random() * 1);
      this.starArray.push(new Star(x, y, this.stars.nearStar.width, this.stars.nearStar.speed, radius));
    }
    for (let i=0; i < 100; ++i) {
      const x = Math.random() * (window.innerWidth - this.stars.midStar.width);
      const y = Math.random() * (window.innerHeight - this.stars.midStar.width);
      const radius = (Math.random() * 1);
      this.starArray.push(new Star(x, y, this.stars.midStar.width, this.stars.midStar.speed, radius));
    }
    for (let i=0; i < 350; ++i) {
      const x = Math.random() * (window.innerWidth - this.stars.farStar.width);
      const y = Math.random() * (window.innerHeight - this.stars.farStar.width);
      const radius = (Math.random() * 1);
      this.starArray.push(new Star(x, y, this.stars.farStar.width, this.stars.farStar.speed, radius));
    }
  }

  bind = () => {
    window.addEventListener('resize', () => { window.starscape.initialise(); });
    window.addEventListener('orientationchange', () => { window.starscape.initialise(); });
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    window.starscapeContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var star of this.starArray) {
      star.update();
    }
  }
}

class Star {
  constructor(x, y, width, speed, radius) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.speed = speed;
    this.radius = radius;
    this.angle = 0;
    this.colors = ["#fff","#ddd", "#aaa", "#222"];

    this.draw = function() {
      var colorIndex = Math.floor(Math.random() * 3); 

      this.x += this.radius * Math.cos(this.angle * (Math.PI/180));
      this.y += this.radius * Math.sin(this.angle * (Math.PI/180));
      this.angle = this.angle + speed;

      window.starscapeContext.fillStyle = this.colors[colorIndex];
      window.starscapeContext.fillRect(this.x, this.y, this.width, this.width);
    }

    this.update = () => {
      if (this.x + this.width > window.innerWidth) {
        this.x = 0;
      }
      this.x += this.speed;
      this.draw();
    }
  }
}

window.starscape = new Starscape();