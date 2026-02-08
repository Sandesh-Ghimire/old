// ==================== Audio Control ====================

const bgAudio = document.getElementById('bgAudio');
const muteBtn = document.getElementById('muteBtn');

// Attempt to play audio on page load
bgAudio.play().catch(() => {
    // Audio autoplay might be blocked, wait for user interaction
    document.addEventListener('click', () => {
        bgAudio.play();
    }, { once: true });
});

// Mute/Unmute button functionality
muteBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
        bgAudio.play();
        muteBtn.textContent = '🔊 Mute';
        muteBtn.classList.remove('muted');
    } else {
        bgAudio.pause();
        muteBtn.textContent = '🔇 Unmute';
        muteBtn.classList.add('muted');
    }
});

// ==================== Navigation ====================
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked button and corresponding section
        btn.classList.add('active');
        const sectionId = btn.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        
        // Reset the section that was just opened
        if (sectionId === 'section1') {
            resetSection1();
        } else if (sectionId === 'section2') {
            resetSection2();
        } else if (sectionId === 'section3') {
            resetSection3();
        }
    });
});

// ==================== Section 1: Do You Love Me ====================

const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn-1");
const noBtn = document.querySelector(".js-no-btn-1");

// Make No button escape on hover
noBtn.addEventListener("mouseover", () => {
    const maxX = questionContainer.offsetWidth - noBtn.offsetWidth;
    const maxY = questionContainer.offsetHeight - noBtn.offsetHeight;
    
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    noBtn.style.position = "absolute";
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
});

// Yes button functionality for section 1
yesBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
    heartLoader.classList.add("show");

    const timeoutId = setTimeout(() => {
        heartLoader.classList.remove("show");
        resultContainer.classList.add("show");
    }, 3000);
});

// Reset Section 1
function resetSection1() {
    questionContainer.style.display = "flex";
    resultContainer.classList.remove("show");
    heartLoader.classList.remove("show");
    
    // Reset No button position
    noBtn.style.position = "relative";
    noBtn.style.left = "auto";
    noBtn.style.top = "auto";
}

// ==================== Section 2: Love Letter ====================

$(document).ready(function () {
    var envelope = $("#envelope");
    var btn_open = $("#open");
    var btn_reset = $("#reset");
    var loveLetterImage = $(".love-letter-image");

    envelope.click(function () {
        openEnvelope();
    });
    
    btn_open.click(function () {
        openEnvelope();
        loveLetterImage.addClass("show");
    });
    
    btn_reset.click(function () {
        closeEnvelope();
        loveLetterImage.removeClass("show");
    });

    function openEnvelope() {
        envelope.addClass("open").removeClass("close");
    }
    
    function closeEnvelope() {
        envelope.addClass("close").removeClass("open");
    }
});

// Reset Section 2
function resetSection2() {
    const envelope = $("#envelope");
    const loveLetterImage = $(".love-letter-image");
    envelope.addClass("close").removeClass("open");
    loveLetterImage.removeClass("show");
}

// ==================== Section 3: Will You Be My Valentine ====================

const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

// No button functionality for valentine section
const noButtonValentine = document.getElementById('no-btn-valentine');
const valentineContainer = document.querySelector('.valentine-container');

if (noButtonValentine) {
    noButtonValentine.addEventListener('click', function() {
        const valentineYesButton = document.querySelector('.valentine-yes-button');
        noButtonValentine.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
        
        const currentSize = parseFloat(window.getComputedStyle(valentineYesButton).fontSize);
        valentineYesButton.style.fontSize = `${currentSize * 1.5}px`;
    });
    
    // Make No button escape on hover (like Section 1)
    noButtonValentine.addEventListener("mouseover", () => {
        const maxX = valentineContainer.offsetWidth - noButtonValentine.offsetWidth;
        const maxY = valentineContainer.offsetHeight - noButtonValentine.offsetHeight;
        
        const newX = Math.floor(Math.random() * maxX);
        const newY = Math.floor(Math.random() * maxY);

        noButtonValentine.style.position = "absolute";
        noButtonValentine.style.left = `${newX}px`;
        noButtonValentine.style.top = `${newY}px`;
    });
}

function handleYesClick() {
    const valentineContainer = document.querySelector('.valentine-container');
    const yesResult = document.getElementById('yes-result');
    
    valentineContainer.style.display = 'none';
    yesResult.classList.add('show');
    yesResult.classList.remove('hidden');
}

// Reset Section 3
function resetSection3() {
    const valentineContainer = document.querySelector('.valentine-container');
    const yesResult = document.getElementById('yes-result');
    
    valentineContainer.style.display = 'flex';
    yesResult.classList.remove('show');
    yesResult.classList.add('hidden');
    
    // Reset the message index and button size
    messageIndex = 0;
    const valentineYesButton = document.querySelector('.valentine-yes-button');
    valentineYesButton.style.fontSize = '1.5em';
    
    // Reset No button text and position
    const noButtonValentine = document.getElementById('no-btn-valentine');
    noButtonValentine.textContent = 'No';
    noButtonValentine.style.position = "relative";
    noButtonValentine.style.left = "auto";
    noButtonValentine.style.top = "auto";
}
