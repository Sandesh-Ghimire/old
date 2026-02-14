const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Game states
let gameRunning = false;
let gameOver = false;
let score = 0;
let bestScore = localStorage.getItem('loveSprint_bestScore') || 0;

// Heart player
const heart = {
    x: canvasWidth / 2 - 30,
    y: canvasHeight - 100,
    width: 60,
    height: 60,
    speed: 12
};

// Game objects
const gifts = [];
const obstacles = [];

// Initialize best score display
document.getElementById('bestScore').textContent = bestScore;
document.getElementById('bestScoreFinal').textContent = bestScore;

// Start button
document.getElementById('startBtn').addEventListener('click', startGame);

// Arrow button controls
const leftArrowBtn = document.getElementById('leftArrow');
const rightArrowBtn = document.getElementById('rightArrow');

let isPressingLeft = false;
let isPressingRight = false;

leftArrowBtn.addEventListener('mousedown', () => { isPressingLeft = true; });
leftArrowBtn.addEventListener('mouseup', () => { isPressingLeft = false; });
leftArrowBtn.addEventListener('mouseleave', () => { isPressingLeft = false; });
leftArrowBtn.addEventListener('touchstart', (e) => { e.preventDefault(); isPressingLeft = true; });
leftArrowBtn.addEventListener('touchend', (e) => { e.preventDefault(); isPressingLeft = false; });

rightArrowBtn.addEventListener('mousedown', () => { isPressingRight = true; });
rightArrowBtn.addEventListener('mouseup', () => { isPressingRight = false; });
rightArrowBtn.addEventListener('mouseleave', () => { isPressingRight = false; });
rightArrowBtn.addEventListener('touchstart', (e) => { e.preventDefault(); isPressingRight = true; });
rightArrowBtn.addEventListener('touchend', (e) => { e.preventDefault(); isPressingRight = false; });

// Keyboard controls (for desktop)
const keys = {};
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') keys['ArrowLeft'] = true;
    if (e.key === 'ArrowRight') keys['ArrowRight'] = true;
});
document.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft') keys['ArrowLeft'] = false;
    if (e.key === 'ArrowRight') keys['ArrowRight'] = false;
});

// Touch/Swipe controls
let touchStartX = 0;
let touchEndX = 0;

canvas.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
}, false);

canvas.addEventListener('touchmove', e => {
    if (!gameRunning) return;
    
    const touchX = e.changedTouches[0].clientX;
    const dx = touchX - touchStartX;
    
    // Move based on swipe
    if (dx > 20) {
        heart.x = Math.min(heart.x + heart.speed, canvasWidth - heart.width);
        touchStartX = touchX;
    } else if (dx < -20) {
        heart.x = Math.max(heart.x - heart.speed, 0);
        touchStartX = touchX;
    }
}, false);

// Mouse controls (for desktop testing)
let mouseX = 0;
document.addEventListener('mousemove', e => {
    if (!gameRunning) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    
    // Smooth following
    if (mouseX < heart.x + heart.width / 2) {
        heart.x = Math.max(heart.x - heart.speed / 2, 0);
    } else if (mouseX > heart.x + heart.width / 2) {
        heart.x = Math.min(heart.x + heart.speed / 2, canvasWidth - heart.width);
    }
});

// Keyboard and button controls
function handleKeyboardInput() {
    if (keys['ArrowLeft'] || isPressingLeft) {
        heart.x = Math.max(heart.x - heart.speed, 0);
    }
    if (keys['ArrowRight'] || isPressingRight) {
        heart.x = Math.min(heart.x + heart.speed, canvasWidth - heart.width);
    }
}

// Start game
function startGame() {
    gameRunning = true;
    gameOver = false;
    score = 0;
    gifts.length = 0;
    obstacles.length = 0;
    heart.x = canvasWidth / 2 - 30;
    
    document.getElementById('startBtn').classList.add('hidden');
    document.getElementById('restartBtn').classList.remove('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
}

// Restart game
function restartGame() {
    startGame();
}

// Spawn items randomly
function spawnItems() {
    if (Math.random() < 0.015) {
        obstacles.push({
            x: Math.random() * (canvasWidth - 40),
            y: -40,
            width: 40,
            height: 40,
            type: 'obstacle'
        });
    }
    
    if (Math.random() < 0.008) {
        gifts.push({
            x: Math.random() * (canvasWidth - 35),
            y: -35,
            width: 35,
            height: 35,
            type: 'gift'
        });
    }
}

// Collision detection
function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// Game Over
function endGame() {
    gameRunning = false;
    gameOver = true;
    
    // Update best score
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('loveSprint_bestScore', bestScore);
    }
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('bestScoreFinal').textContent = bestScore;
    document.getElementById('gameOverScreen').classList.remove('hidden');
}

// Update game state
function update() {
    if (!gameRunning) return;
    
    handleKeyboardInput();
    spawnItems();
    
    // Move gifts and obstacles
    for (let i = gifts.length - 1; i >= 0; i--) {
        gifts[i].y += 4;
        
        if (isColliding(heart, gifts[i])) {
            score += 1;
            document.getElementById('score').textContent = score;
            gifts.splice(i, 1);
        } else if (gifts[i].y > canvasHeight) {
            gifts.splice(i, 1);
        }
    }
    
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += 5;
        
        if (isColliding(heart, obstacles[i])) {
            endGame();
            return;
        } else if (obstacles[i].y > canvasHeight) {
            obstacles.splice(i, 1);
        }
    }
}

// Draw penguin using canvas - Enhanced and larger
function drawPenguin(x, y, size) {
    const s = size / 2;
    
    // Body (black) - larger
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(x, y, s * 0.8, s * 1.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Belly (white) - larger
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(x, y + s * 0.2, s * 0.5, s * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Head (black) - larger
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(x, y - s * 0.6, s * 0.6, 0, Math.PI * 2);
    ctx.fill();
    
    // Cheeks (light pink)
    ctx.fillStyle = '#ffb3ba';
    ctx.beginPath();
    ctx.arc(x - s * 0.35, y - s * 0.5, s * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + s * 0.35, y - s * 0.5, s * 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Left eye (white) - larger
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x - s * 0.25, y - s * 0.75, s * 0.18, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye (white) - larger
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + s * 0.25, y - s * 0.75, s * 0.18, 0, Math.PI * 2);
    ctx.fill();
    
    // Left pupil (black)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x - s * 0.25, y - s * 0.75, s * 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    // Right pupil (black)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x + s * 0.25, y - s * 0.75, s * 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    // Beak (orange) - larger
    ctx.fillStyle = '#ff8c00';
    ctx.beginPath();
    ctx.moveTo(x - s * 0.2, y - s * 0.4);
    ctx.lineTo(x + s * 0.2, y - s * 0.4);
    ctx.lineTo(x, y - s * 0.15);
    ctx.closePath();
    ctx.fill();
    
    // Left foot (orange) - larger
    ctx.fillStyle = '#ff8c00';
    ctx.fillRect(x - s * 0.35, y + s * 0.9, s * 0.25, s * 0.3);
    
    // Right foot (orange) - larger
    ctx.fillStyle = '#ff8c00';
    ctx.fillRect(x + s * 0.1, y + s * 0.9, s * 0.25, s * 0.3);
}

// Draw game
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#fff0f5');
    gradient.addColorStop(1, '#ffe6f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw penguin (player) - larger size
    drawPenguin(heart.x + heart.width / 2, heart.y + heart.height / 2, 60);
    
    // Draw gifts (yellow stars)
    gifts.forEach(gift => {
        drawStar(gift.x + gift.width / 2, gift.y + gift.height / 2, 5, gift.width / 2, gift.width / 4);
    });
    
    // Draw obstacles (dark red squares)
    obstacles.forEach(obstacle => {
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Add pattern
        ctx.fillStyle = '#cc0000';
        ctx.fillRect(obstacle.x + 5, obstacle.y + 5, obstacle.width - 10, obstacle.height - 10);
    });
    
    // Draw score
    ctx.fillStyle = '#d6336c';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('Score: ' + score, 15, 30);
    
    // Draw game over message
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, canvasHeight / 2 - 60, canvasWidth, 120);
        
        ctx.fillStyle = '#ff3366';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('💔 Game Over 💔', canvasWidth / 2, canvasHeight / 2);
        ctx.textAlign = 'left';
    }
}

// Draw star function
function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let step = Math.PI / spikes;
    
    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
        rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
