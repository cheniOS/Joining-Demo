// Page Switching Logic
function show(id) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });
    
    // Show target page
    const targetPage = document.getElementById('page-' + id);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.display = 'flex';
    }
    
    // Toggle input card
    const inputCard = document.querySelector('.input-card');
    if (id === 'lab') {
        inputCard.style.display = 'none';
    } else {
        inputCard.style.display = 'block';
    }

    // Update tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    if (window.lucide) lucide.createIcons();
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    // Ensure initial state
    const spiritPage = document.getElementById('message-area');
    spiritPage.id = 'page-spirit';
    spiritPage.classList.add('page', 'active');
    spiritPage.style.display = 'flex';
    
    if (window.lucide) lucide.createIcons();
    
    // Initial Reveal Animation
    const responseText = document.getElementById('response-text');
    setTimeout(() => {
        responseText.classList.add('active');
    }, 500);
});

// AI Interaction Logic
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const responseText = document.getElementById('response-text');

if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (!text) return;

        responseText.classList.remove('active');
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> 聆听中...';
        if (window.lucide) lucide.createIcons();

        // Simulated AI Response
        setTimeout(() => {
            const responses = [
                `“亲爱的孩子，在这片本地的静谧中，我听见了你的忧虑。正如经上所言：『信就是所望之事的实底。』请放下沉重的行囊，允许自己在这片刻中安息。”`,
                `“你所担心的未来，在更高的智慧里早已有了安排。现在的每一道裂痕，其实都是为了让光透进来。保持宁静。”`,
                `“不要急着奔跑，有时停下来听听内心的声音，才是最伟大的成长。你并不孤独，在这片寂静的星海里。”`
            ];
            
            const randomMsg = responses[Math.floor(Math.random() * responses.length)];
            responseText.innerHTML = randomMsg.replace(/\n/g, '<br>');
            responseText.classList.add('active');
            
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i data-lucide="sparkles"></i> 领受启示';
            if (window.lucide) lucide.createIcons();
            userInput.value = '';
        }, 2500);
    });
}
