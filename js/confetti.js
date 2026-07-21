// js/confetti.js
document.addEventListener('DOMContentLoaded', () => {
  // Elemente
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const egg = document.getElementById('easterEgg');

  // Canvas Größe initial und bei Resize
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Partikel-Array
  const parts = [];

  // Partikel-Konstruktor
  function Part(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 7 + 3;
    // Startrichtung: nach oben, mit seitlicher Streuung (so entsteht Kanonen-Effekt)
    const spread = 8; // mehr = breiter
    this.vx = (Math.random() - 0.5) * spread * 1.5;
    this.vy = -(Math.random() * 6 + 6); // initial stark nach oben
    this.gravity = 0.35 + Math.random() * 0.12;
    this.rotation = Math.random() * 360;
    this.rotateSpeed = (Math.random() - 0.5) * 10;
    this.color = `hsl(${Math.floor(Math.random()*360)}, 75%, 55%)`;
    this.life = 80 + Math.floor(Math.random()*40);
  }

  Part.prototype.update = function() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotateSpeed;
    this.life--;
  };

  Part.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    ctx.restore();
  };

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.update();
      p.draw(ctx);
      // Entfernen, wenn außerhalb oder tot
      if (p.y > canvas.height + 50 || p.x < -100 || p.x > canvas.width + 100 || p.life <= 0) {
        parts.splice(i, 1);
      }
    }
    requestAnimationFrame(animate);
  }
  animate();

  // Erzeuge Konfetti von Element-Position (Footer-Ei)
  function burstFromElement(el, count = 40) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // absolute Dokumentposition (berücksichtigt Scroll)
    const startX = rect.left + rect.width/2 + window.scrollX;
    const startY = rect.top + rect.height/2 + window.scrollY;

    // Erzeuge Partikel mit leichter Variation, so dass sie NICHT aus Mitte des Screens erscheinen
    for (let i = 0; i < count; i++) {
      parts.push(new Part(startX, startY));
    }
  }

  // Klick-Logik: Mehrfachklick-Trigger (z. B. nach 3 Klicks)
  let clicks = 0;
  if (egg) {
    // Vergewissere dich, dass nur dieses eine Ei existiert
    egg.addEventListener('click', (e) => {
      e.stopPropagation();
      clicks++;
      // Optional kurzes Feedback: kleines Scale-Animation (CSS kann das verfeinern)
      egg.style.transform = 'scale(0.95)';
      setTimeout(() => egg.style.transform = '', 100);

      // Bei jedem Klick ein kleines Burst, bei jedem 3. Klick ein großer Burst:
      burstFromElement(egg, 12); // kleines Burst bei jedem Klick
      if (clicks % 3 === 0) {
        burstFromElement(egg, 40); // größerer Burst
      }
      // Cap Partikelmenge, um performance zu schonen
      if (parts.length > 800) {
        parts.splice(0, parts.length - 400);
      }
    });
  }
});
