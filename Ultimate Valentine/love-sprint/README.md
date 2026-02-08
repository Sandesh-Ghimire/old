# 💖 Love Sprint

A mobile-friendly, single-player casual game where you guide a heart through a path, collect gifts, and avoid obstacles. Perfect for quick, engaging gameplay sessions!

## 🎮 Features

- **Mobile Optimized** - Fully responsive design for all devices
- **Multiple Control Methods**
  - 📱 Swipe left/right (mobile)
  - ⌨️ Arrow keys (desktop)
  - 🖱️ Mouse movement (desktop)
- **Collect Gifts** 🎁 - Yellow stars give you points
- **Avoid Obstacles** ⚠️ - Dark red squares end your game
- **Score Tracking** 📊 - Real-time score display
- **Best Score Saved** 💾 - Local storage keeps your highest score
- **Smooth Animations** - Heartbeat effect and visual feedback
- **No Dependencies** - Pure vanilla JavaScript, HTML5, and CSS3

## 📁 Project Structure

```
love-sprint/
│
├── index.html          # Main HTML page with game canvas
├── style.css           # Game styling and animations
├── script.js           # Game logic and physics
├── assets/             # Images and sprites folder
│   ├── heart.png
│   ├── gift.png
│   └── obstacle.png
└── README.md           # This documentation
```

## 🚀 Installation & Setup

### Quick Start
1. Download or clone the repository
2. Open `index.html` in your web browser
3. Click "Start Game" to begin playing!

### Live Server (Recommended)
1. Install VS Code Live Server extension
2. Right-click `index.html` → "Open with Live Server"
3. Game opens automatically with hot reload

### GitHub Pages
1. Push the repository to GitHub
2. Enable GitHub Pages in repository settings
3. Share the published link: `https://username.github.io/love-sprint/`

## 🎯 How to Play

### Game Controls

**Mobile:**
- Swipe left to move the heart left
- Swipe right to move the heart right
- Avoid obstacles, collect gifts!

**Desktop:**
- Use arrow keys (← and →) to move
- Or move your mouse left/right to guide the heart
- Click "Start Game" to begin

### Gameplay

1. **Start** - Click the "Start Game" button
2. **Move** - Use your preferred control method to move the heart
3. **Collect** - Grab yellow star gifts to increase your score
4. **Avoid** - Stay away from dark red obstacles
5. **Game Over** - One hit from an obstacle ends the game
6. **Track Progress** - Your best score is saved automatically!

### Scoring System

- **Gift Collected** = +1 point
- **Obstacle Hit** = Game Over
- **Best Score** = Highest score ever achieved (saved locally)

## 🎨 Game Elements

### Heart (Player)
- The main character you control
- Drawn as a red heart shape
- Smooth movement with keyboard/touch controls

### Gifts 🎁
- Yellow star-shaped collectibles
- Fall from the top of the screen
- Each gift grants 1 point

### Obstacles ⚠️
- Dark red square obstacles
- Fall from the top of the screen
- Touching any obstacle ends the game

## 📱 Responsive Design

- **Desktop (900px+)** - Full-size game canvas with side controls
- **Tablet (600-900px)** - Adjusted canvas with responsive buttons
- **Mobile (400-600px)** - Optimized touch interface
- **Small Mobile (<400px)** - Compact layout with large buttons

## 🛠️ Customization

### Change Game Speed
Edit in `script.js`:
```javascript
// Gift and obstacle spawn rate (lower = more frequent)
if (Math.random() < 0.015) {  // Gifts
if (Math.random() < 0.008) {  // Obstacles

// Movement speed
gift.y += 4;      // Gift fall speed
obstacle.y += 5;  // Obstacle fall speed
```

### Modify Colors
Edit in `style.css`:
```css
h1 {
    color: #d6336c;  /* Title color */
}

#gameCanvas {
    background: linear-gradient(180deg, #fff0f5 0%, #ffe6f0 100%);
}
```

Edit in `script.js`:
```javascript
ctx.fillStyle = '#ff3366';  // Heart color
ctx.fillStyle = '#ffcc00';  // Gift color
ctx.fillStyle = '#8B0000';  // Obstacle color
```

### Adjust Game Difficulty

**Easy Mode** - Slower obstacles, fewer spawns:
```javascript
if (Math.random() < 0.010) obstacles.push(...);  // Reduced from 0.015
obstacle.y += 3;  // Slower fall
```

**Hard Mode** - Faster obstacles, more spawns:
```javascript
if (Math.random() < 0.025) obstacles.push(...);  // Increased from 0.015
obstacle.y += 7;  // Faster fall
```

### Add Sound Effects

```javascript
// In startGame()
const bgm = new Audio('assets/bg-music.mp3');
bgm.loop = true;
bgm.play();

// When collecting gift
const collectSound = new Audio('assets/collect.mp3');
collectSound.play();

// When hitting obstacle
const crashSound = new Audio('assets/crash.mp3');
crashSound.play();
```

## 💾 Local Storage

The game automatically saves your best score in browser local storage:
- Best score persists even after closing the browser
- Stored as `loveSprint_bestScore` in localStorage
- Can be cleared by clearing browser data

## 🎓 Educational Value

This game demonstrates:
- HTML5 Canvas API
- Game loop architecture with `requestAnimationFrame`
- Touch event handling
- Keyboard and mouse input
- Collision detection algorithms
- Local storage for persistence
- Responsive CSS design
- Game state management

## 📚 Future Enhancements

- [ ] Sound effects and background music
- [ ] Different difficulty levels
- [ ] Power-ups and special items
- [ ] Combo multiplier system
- [ ] Daily challenges
- [ ] Leaderboard system
- [ ] Different game modes
- [ ] Character customization
- [ ] Obstacles with patterns
- [ ] Mobile app version

## 🐛 Troubleshooting

**Game not starting?**
- Ensure JavaScript is enabled in your browser
- Check browser console (F12) for errors
- Try a different browser

**Controls not working?**
- Mobile: Ensure touch events are supported
- Desktop: Click on canvas first to focus it
- Check that no other scripts are interfering

**Score not saving?**
- Check if localStorage is enabled
- Check browser privacy settings
- Try clearing cache and reloading

## 📄 License

Open source and free to use. Feel free to modify and distribute as needed.

## 👨‍💻 Technical Stack

- **HTML5** - Semantic structure
- **Canvas API** - 2D graphics rendering
- **CSS3** - Modern styling and animations
- **Vanilla JavaScript** - No dependencies
- **Local Storage API** - Persistent data storage

## 🎉 Tips for High Scores

1. **Stay Focused** - Watch for patterns in spawning
2. **Smooth Movements** - Don't jerk the controls
3. **Plan Ahead** - Anticipate falling items
4. **Use Center** - Stay in the middle when possible
5. **Quick Reflexes** - React fast to obstacles

---

**Enjoy Love Sprint! 💖**

Make it your favorite casual game and share it with friends!

For questions or improvements, feel free to contribute!
