lucide.createIcons();

const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const responseText = document.getElementById('response-text');

sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (!text) return;

    // Transition response area
    responseText.classList.remove('active');
    
    // Set loading state
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> 聆听中...';
    lucide.createIcons();

    // Mock API call
    setTimeout(() => {
        const responses = [
            `“亲爱的孩子，我看见了你在无人处的泪水。请相信，这并不是要把你埋葬，而是在为你积蓄破土而出的力量。深呼吸，允许自己暂时软弱。”`,
            `“你所担心的未来，在更高的智慧里早已有了安排。现在的每一道裂痕，其实都是为了让光透进来。保持宁静，答案会在水面平静时浮现。”`,
            `“不要急着奔跑，有时停下来听听内心的声音，才是最伟大的成长。你并不孤独，在这片寂静的星海里，我始终与你同在。”`
        ];
        
        const randomMsg = responses[Math.floor(Math.random() * responses.length)];
        
        responseText.innerHTML = randomMsg.replace(/\n/g, '<br>');
        responseText.classList.add('active');
        
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i data-lucide="sparkles"></i> 领受启示';
        lucide.createIcons();
        userInput.value = '';
    }, 2500);
});

// Initial reveal
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        responseText.classList.add('active');
    }, 500);
});
