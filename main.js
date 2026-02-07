// Page Switching Logic
const tabs = document.querySelectorAll('.tab-item');
const pages = document.querySelectorAll('.page');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetPage = tab.dataset.page;
        if (!targetPage) return;

        // Update Tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update Pages
        pages.forEach(p => {
            p.classList.remove('active');
            if(p.id === `page-${targetPage}`) {
                p.classList.add('active');
            }
        });
    });
});

// Map Engine (Advanced Stars)
const canvas = document.getElementById('map-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeMap() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
}

window.addEventListener('resize', resizeMap);
resizeMap();

class Star {
    constructor(x, y, isBurst = false) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = isBurst ? Math.random() * 3 + 1 : Math.random() * 1.5;
        this.opacity = Math.random();
        this.blinkSpeed = 0.005 + Math.random() * 0.01;
        this.vx = isBurst ? (Math.random() - 0.5) * 4 : 0;
        this.vy = isBurst ? (Math.random() - 0.5) * 4 : 0;
        this.life = isBurst ? 100 : Infinity;
    }

    update() {
        if (this.life !== Infinity) {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            this.opacity = this.life / 100;
        } else {
            this.opacity += this.blinkSpeed;
            if(this.opacity > 1 || this.opacity < 0) this.blinkSpeed *= -1;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
        ctx.shadowBlur = this.size * 4;
        ctx.shadowColor = '#00F2FF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initial Starfield
for(let i=0; i<200; i++) stars.push(new Star());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars = stars.filter(s => s.life > 0);
    stars.forEach(s => {
        s.update();
        s.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// Interaction: Ping / Burst
const pingBtn = document.getElementById('ping-btn');
pingBtn.addEventListener('click', () => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Create burst stars
    for(let i=0; i<40; i++) {
        stars.push(new Star(centerX, centerY, true));
    }
    
    // Haptic-like visual feedback
    const btn = document.getElementById('ping-btn');
    btn.style.transform = "scale(0.95)";
    setTimeout(() => btn.style.transform = "scale(1)", 100);
});

// Auto-refresh Lucide on page switch (if needed)
// observer could be used but simple call is fine here
function refreshIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
tabs.forEach(t => t.addEventListener('click', refreshIcons));
