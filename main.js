// Page Switching Logic
const tabs = document.querySelectorAll('.tab-item');
const pages = document.querySelectorAll('.page');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetPage = tab.dataset.page;
        
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

// Map Logic
const canvas = document.getElementById('map-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeMap() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resizeMap);
resizeMap();

class Star {
    constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.opacity = Math.random();
        this.blinkSpeed = 0.01 + Math.random() * 0.02;
    }

    draw() {
        this.opacity += this.blinkSpeed;
        if(this.opacity > 1 || this.opacity < 0) this.blinkSpeed *= -1;
        
        ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#00F2FF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for(let i=0; i<150; i++) stars.push(new Star());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => s.draw());
    requestAnimationFrame(animate);
}
animate();

// Ping Interaction
const pingBtn = document.getElementById('ping-btn');
pingBtn.addEventListener('click', () => {
    // Add 10 quick bursts of stars
    for(let i=0; i<20; i++) {
        const x = canvas.width/2 + (Math.random() - 0.5) * 100;
        const y = canvas.height/2 + (Math.random() - 0.5) * 100;
        stars.push(new Star(x, y));
    }
    
    // Alert-like interaction feedback
    const feedback = document.createElement('div');
    feedback.innerText = "✨ 已点亮你的荧光棒";
    feedback.style.position = 'absolute';
    feedback.style.top = '50%';
    feedback.style.left = '50%';
    feedback.style.transform = 'translate(-50%, -50%)';
    feedback.style.background = 'rgba(0,0,0,0.8)';
    feedback.style.color = 'white';
    feedback.style.padding = '10px 20px';
    feedback.style.borderRadius = '20px';
    feedback.style.zIndex = '1000';
    document.querySelector('.screen').appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 2000);
});
