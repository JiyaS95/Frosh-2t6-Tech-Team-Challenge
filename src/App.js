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
      canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
    };
    resize();
    window.addEventListener('resize', resize);

    const constellations = [
      { points: [[0.08,0.12],[0.11,0.18],[0.09,0.25],[0.13,0.30],[0.07,0.30]] },
      { points: [[0.75,0.08],[0.80,0.10],[0.85,0.09],[0.88,0.12],[0.85,0.17],[0.78,0.17]] },
      { points: [[0.55,0.25],[0.62,0.20],[0.68,0.27],[0.55,0.25]] },
      { points: [[0.20,0.55],[0.20,0.65],[0.15,0.60],[0.25,0.60]] },
      { points: [[0.88,0.45],[0.92,0.42],[0.95,0.47],[0.91,0.50],[0.88,0.45]] },
      { points: [[0.30,0.80],[0.38,0.75],[0.46,0.77],[0.52,0.83]] },
    ];

    const constellationStars = constellations.flatMap(c =>
      c.points.map(([x, y]) => ({
        x, y, r: 1.4, gold: true,
        speed: Math.random() * 0.008 + 0.003,
        offset: Math.random() * Math.PI * 2,
      }))
    );

    const randomStars = Array.from({ length: 200 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      gold: Math.random() > 0.65,
      speed: Math.random() * 0.015 + 0.003,
      offset: Math.random() * Math.PI * 2,
    }));

    const stars = [...constellationStars, ...randomStars];

    const shootingStars = Array.from({ length: 4 }, () => ({
      x: 0, y: 0, length: 0, speed: 0,
      opacity: 0, active: false,
      timer: Math.floor(Math.random() * 300),
    }));

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Background
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0,   '#08001a');
      bg.addColorStop(0.4, '#0d0025');
      bg.addColorStop(1,   '#05000f');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Nebula glows
      // Nebula glows — bigger and more dramatic
      [
        { px: 0.1,  py: 0.05, r: 400, c: '100,40,200',  o: 0.12 },
        { px: 0.9,  py: 0.15, r: 350, c: '160,100,0',   o: 0.10 },
        { px: 0.5,  py: 0.45, r: 380, c: '80,0,180',    o: 0.10 },
        { px: 0.15, py: 0.7,  r: 300, c: '120,50,220',  o: 0.09 },
        { px: 0.85, py: 0.65, r: 300, c: '150,90,0',    o: 0.09 },
        { px: 0.4,  py: 0.9,  r: 280, c: '90,20,180',   o: 0.08 },
      ].forEach(({ px, py, r, c, o }) => {
        const g = ctx.createRadialGradient(px*W, py*H, 0, px*W, py*H, r);
        g.addColorStop(0, `rgba(${c},${o})`);
        g.addColorStop(0.5, `rgba(${c},${o * 0.4})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Stars
      stars.forEach(s => {
        const twinkle = Math.sin(t * s.speed * 60 + s.offset);
        const opacity = 0.4 + twinkle * 0.6;
        const size = s.r * (0.8 + twinkle * 0.2);
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, size, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? `rgba(245,200,80,${opacity})`
          : `rgba(210,190,255,${opacity * 0.75})`;
        ctx.fill();
      });
      
      // Draw constellation lines
      constellations.forEach(constellation => {
        const pts = constellation.points;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(245,200,80,0.18)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 6]);
        ctx.moveTo(pts[0][0] * W, pts[0][1] * H);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i][0] * W, pts[i][1] * H);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Shooting stars
      shootingStars.forEach(s => {
        s.timer--;
        if (s.timer <= 0 && !s.active) {
          s.active = true;
          s.x = Math.random() * W * 0.7;
          s.y = Math.random() * H * 0.35;
          s.length = Math.random() * 130 + 70;
          s.speed = Math.random() * 5 + 3;
          s.opacity = 1;
          s.timer = Math.floor(Math.random() * 500 + 300);
        }
        if (s.active) {
          ctx.save();
          ctx.globalAlpha = s.opacity;
          const g = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y + s.length * 0.45);
          g.addColorStop(0, 'rgba(255,255,255,0)');
          g.addColorStop(1, 'rgba(245,200,80,1)');
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x + s.length, s.y + s.length * 0.45);
          ctx.stroke();
          ctx.restore();
          s.x += s.speed;
          s.y += s.speed * 0.45;
          s.opacity -= 0.018;
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
        <div className="event-desc"
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
          <p className="header-subtitle">✦ University of Toronto Engineering ✦</p>
          <h1>F!ROSH WEEK 2T6</h1>
          <span className="header-stars">✦ ✦ ✦ ✦ ✦</span>
          <p className="header-date">August 26 – 30, 2026</p>
          <div className="header-line"></div>
        </div>

        {Object.entries(scheduleData).map(([day, events], dayIndex) => (
          <div key={day} className="day-section">
            <div className="day-heading-wrapper">
              <span className="day-number">✦ {String(dayIndex + 1).padStart(2, '0')}</span>
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