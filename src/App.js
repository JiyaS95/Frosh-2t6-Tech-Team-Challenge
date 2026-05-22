// Import the schedule data from the JSON file — you can use it like a regular JS array
import './App.css';
import scheduleData from './schedule_data.json';
import { useEffect, useRef } from 'react';

// TODO: Build your Frosh Week Schedule page here

function formatTime(time) {
  if (!time || !time.trim()) return '';
  if (time.includes('a1/p1') || time.includes('p1')) {
    const parts = time.trim().split(' ')[0].split(':');
    let hours = parseInt(parts[0]);
    const minutes = parts[1];
    const isPM = hours >= 12;
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return `${hours}:${minutes} ${isPM ? 'PM' : 'AM'}`;
  }
  return time.trim();
}

function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create stars
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.3,
      gold: Math.random() > 0.6,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Create shooting stars
    const shootingStars = Array.from({ length: 3 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.4,
      length: Math.random() * 120 + 60,
      speed: Math.random() * 4 + 3,
      opacity: 0,
      active: false,
      timer: Math.random() * 300,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space gradient background
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, '#05000f');
      bg.addColorStop(0.3, '#0d0020');
      bg.addColorStop(0.7, '#0a0018');
      bg.addColorStop(1, '#050010');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glowing moon
      const moonX = canvas.width * 0.82;
      const moonY = 130;
      const moonR = 55;

      // Outer glow layers
      [120, 90, 70].forEach((glowR, i) => {
        const glow = ctx.createRadialGradient(moonX, moonY, moonR * 0.5, moonX, moonY, glowR);
        glow.addColorStop(0, `rgba(245, 200, 0, ${0.06 - i * 0.015})`);
        glow.addColorStop(1, 'rgba(245, 200, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(moonX, moonY, glowR, 0, Math.PI * 2);
        ctx.fill();
      });

      // Moon body
      const moonGrad = ctx.createRadialGradient(moonX - 12, moonY - 12, 5, moonX, moonY, moonR);
      moonGrad.addColorStop(0, '#fff8dc');
      moonGrad.addColorStop(0.5, '#f5c800');
      moonGrad.addColorStop(1, '#c9901a');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fill();

      // Moon craters
      ctx.fillStyle = 'rgba(180, 120, 0, 0.2)';
      [[moonX + 15, moonY + 10, 8], [moonX - 18, moonY + 18, 5], [moonX + 8, moonY - 22, 6]].forEach(([cx, cy, cr]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fill();
      });

      // Nebula clouds
      [
        { x: canvas.width * 0.15, y: canvas.height * 0.12, r: 200, color: '120, 60, 200' },
        { x: canvas.width * 0.75, y: canvas.height * 0.35, r: 160, color: '180, 130, 0' },
        { x: canvas.width * 0.4,  y: canvas.height * 0.65, r: 180, color: '80, 0, 180' },
      ].forEach(({ x, y, r, color }) => {
        const nebula = ctx.createRadialGradient(x, y, 0, x, y, r);
        nebula.addColorStop(0, `rgba(${color}, 0.08)`);
        nebula.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = nebula;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Draw stars
      stars.forEach(star => {
        const twinkle = Math.sin(t * star.twinkleSpeed * 60 + star.twinkleOffset);
        const opacity = 0.5 + twinkle * 0.5;
        const size = star.r * (0.8 + twinkle * 0.2);
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fillStyle = star.gold
          ? `rgba(245, 200, 80, ${opacity})`
          : `rgba(220, 200, 255, ${opacity * 0.8})`;
        ctx.fill();
      });

      // Shooting stars
      shootingStars.forEach(s => {
        s.timer--;
        if (s.timer <= 0 && !s.active) {
          s.active = true;
          s.x = Math.random() * canvas.width * 0.6;
          s.y = Math.random() * 200;
          s.opacity = 1;
          s.timer = Math.random() * 400 + 200;
        }
        if (s.active) {
          ctx.save();
          ctx.globalAlpha = s.opacity;
          const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y + s.length * 0.4);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(1, 'rgba(245, 200, 80, 1)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x + s.length, s.y + s.length * 0.4);
          ctx.stroke();
          ctx.restore();
          s.x += s.speed;
          s.y += s.speed * 0.4;
          s.opacity -= 0.02;
          if (s.opacity <= 0) s.active = false;
        }
      });

      t++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starry-canvas" />;
}

function EventCard({ event }) {
  return (
    <div className={`event-card color-${event.Color}`}>
      <div className="event-time">
        {formatTime(event['Start Time'])}
        {event['End Time'] && ` → ${formatTime(event['End Time'])}`}
      </div>
      <div className="event-name">{event['Event Name']}</div>
      {event['Event Location'] && (
        <div className="event-location">📍 {event['Event Location']}</div>
      )}
      {event['Event Description'] && (
        <div
          className="event-desc"
          dangerouslySetInnerHTML={{ __html: event['Event Description'] }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <div className="app-wrapper">
      <StarryBackground />
      <div className="app">
        <div className="header">
          <p className="header-subtitle">University of Toronto Engineering</p>
          <h1>F!ROSH WEEK 2T6</h1>
          <span className="header-stars">✦ ✦ ✦ ✦ ✦</span>
          <p className="header-date">August 26 – 30, 2026</p>
          <div className="header-line"></div>
        </div>

        {Object.entries(scheduleData).map(([day, events], dayIndex) => (
          <div key={day} className="day-section">
            <div className="day-heading-wrapper">
              <span className="day-number">0{dayIndex + 1}</span>
              <h2 className="day-heading">{day}</h2>
            </div>
            <div className="events-list">
              {events.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;