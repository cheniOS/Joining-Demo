// Page Switching Logic
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');

function show(id) {
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    
    tabs.forEach(t => t.classList.remove('active'));
    // Handle both direct calls and event-based calls
    const targetTab = [...tabs].find(t => t.innerText.includes(id === 'map' ? '星海' : (id === 'schedule' ? '行程' : '自传')));
    if (targetTab) targetTab.classList.add('active');
}

// Add event listeners to tabs
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        const text = e.currentTarget.innerText;
        if (text.includes('星海')) show('map');
        else if (text.includes('行程')) show('schedule');
    });
});

// =========================================
// Music Mate Style Map Engine
// =========================================
const canvas = document.getElementById('map-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const songs = ["倔强", "突然好想你", "如果我们不曾相遇", "离开地球表面", "温柔", "知足", "伤心的人别听慢歌", "干杯"];

function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resize);
resize();

class MusicStar {
    constructor(x, y, isStatic = false) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.song = songs[Math.floor(Math.random() * songs.length)];
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.pulse = 0;
        this.opacity = 0.4 + Math.random() * 0.6;
        this.isStatic = isStatic;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.showLabel = false;
        this.labelOpacity = 0;
    }

    update() {
        if (!this.isStatic) {
            this.x += this.vx;
            this.y += this.vy;
            // Bound check
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        // Pulse effect (Music wave)
        this.pulse += 0.05;
        this.size = this.baseSize + Math.sin(this.pulse) * 0.5;

        // Label fade
        if (this.showLabel && this.labelOpacity < 1) this.labelOpacity += 0.1;
        if (!this.showLabel && this.labelOpacity > 0) this.labelOpacity -= 0.05;
    }

    draw() {
        // Outer glow (Pulsing wave)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity * 0.15 * Math.abs(Math.sin(this.pulse))})`;
        ctx.fill();

        // Core star
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00F2FF';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label (Song Name)
        if (this.labelOpacity > 0) {
            ctx.font = '10px Inter';
            ctx.fillStyle = `rgba(255, 255, 255, ${this.labelOpacity})`;
            ctx.textAlign = 'center';
            ctx.fillText(this.song, this.x, this.y - 15);
        }
    }
}

// Initial populate
for(let i=0; i<60; i++) {
    stars.push(new MusicStar());
}

function render() {
    // Subtle background grid
    ctx.fillStyle = '#05070A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for(let i=0; i<canvas.width; i+=40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for(let j=0; j<canvas.height; j+=40) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
    }

    stars.forEach(s => {
        s.update();
        s.draw();
    });
    requestAnimationFrame(render);
}
render();

// Interaction: Ping / Light up glow-stick
document.querySelector('.ping-btn').addEventListener('click', () => {
    // Create an explosion of stars
    for(let i=0; i<30; i++) {
        const s = new MusicStar(canvas.width/2, canvas.height/2);
        s.vx = (Math.random() - 0.5) * 10;
        s.vy = (Math.random() - 0.5) * 10;
        s.opacity = 1;
        s.showLabel = true;
        stars.push(s);
    }
    
    // Auto-remove labels after a while
    setTimeout(() => {
        stars.forEach(s => s.showLabel = false);
    }, 3000);
});

// Click on map to see song names
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    stars.forEach(s => {
        const dist = Math.sqrt((s.x - mx)**2 + (s.y - my)**2);
        if (dist < 30) s.showLabel = !s.showLabel;
    });
});
