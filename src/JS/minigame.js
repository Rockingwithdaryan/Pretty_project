// ── Meowya Game ────────────────────────────────────────────────────────────

// ── State ─────────────────────────────────────────────────────────────────
var love        = 0;       // 0 to 100
var want        = null;    // 'pet' or 'feed' — what Meowya currently wants
var gameOver    = false;
var wantTimer   = null;    // timer to pick next want
var cooldown    = false;   // brief lock after each action

// ── Elements ──────────────────────────────────────────────────────────────
var barFill     = document.getElementById('bar-fill');
var barValue    = document.getElementById('bar-value');
var bubbleText  = document.getElementById('bubble-text');
var bubble      = document.getElementById('speech-bubble');
var catImg      = document.getElementById('cat-img');
var catWrap     = document.getElementById('cat-wrap');
var popup       = document.getElementById('popup-overlay');

// ── Dialogue banks ────────────────────────────────────────────────────────
var wantPetLines  = [
  "Pet me... purr~",
  "Headpats please! 🐾",
  "I want pets!!",
  "Mrrrow... pet?",
  "Scritches please~"
];
var wantFeedLines = [
  "I'm hungry... 🍽️",
  "Feed me, hooman!",
  "Meoow... food?",
  "My tummy is empty!!",
  "Can I have a snack? 👀"
];
var happyLines = [
  "Purrrr~ 💕",
  "Mrrrow ♥",
  "Nyaa~ thank you!",
  "*happy tail wag*",
  "I love you!! 🐱"
];
var wrongLines = [
  "That's not what I wanted! 😾",
  "Nooo, wrong one!!",
  "Mrrp?! Not that!",
  "Hey!! I said otherwise! 😤",
  "Wrong!! >:("
];
var idleLines = [
  "Meow~",
  "*yawns*",
  "Mrrrow...",
  "*blinks at you*",
  "Purr purr..."
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Update bar ─────────────────────────────────────────────────────────────
function updateBar() {
  love = Math.max(0, Math.min(100, love));
  barFill.style.width = love + '%';
  barValue.textContent = love + '%';

  if (love < 30) {
    barFill.classList.add('danger');
  } else {
    barFill.classList.remove('danger');
  }

  if (love >= 100 && !gameOver) {
    gameOver = true;
    clearTimeout(wantTimer);
    setTimeout(showWin, 600);
  }
}

// ── Set speech bubble ──────────────────────────────────────────────────────
function setBubble(text) {
  bubble.style.animation = 'none';
  void bubble.offsetWidth;
  bubble.style.animation = '';
  bubbleText.textContent = text;
}

// ── Cat image swap ─────────────────────────────────────────────────────────
function setCatImage(state) {
  // state: 'idle' or 'happy'
  catImg.style.opacity = '0';
  setTimeout(function() {
    catImg.src = state === 'happy'
      ? '/images/kitty happy.png'
      : '/images/kitty idle.png';
    catImg.style.opacity = '1';
  }, 150);
}

// ── Pick what Meowya wants next ────────────────────────────────────────────
function pickNextWant() {
  if (gameOver) return;

  // Random delay between 3–6 seconds
  var delay = 3000 + Math.random() * 3000;
  wantTimer = setTimeout(function() {
    if (gameOver) return;
    want = Math.random() < 0.5 ? 'pet' : 'feed';
    if (want === 'pet') {
      setBubble(randomFrom(wantPetLines));
    } else {
      setBubble(randomFrom(wantFeedLines));
    }
    setCatImage('idle');

    // If player ignores the want for 5 seconds, bar drops slightly
    wantTimer = setTimeout(function() {
      if (gameOver || want === null) return;
      love -= 8;
      updateBar();
      setBubble("You ignored me... 😿");
      want = null;
      setCatImage('idle');
      pickNextWant();
    }, 5000);

  }, delay);
}

// ── Handle player action ───────────────────────────────────────────────────
function doAction(action) {
  if (gameOver || cooldown) return;
  cooldown = true;
  setTimeout(function() { cooldown = false; }, 600);

  if (want === null) {
    // Meowya wasn't asking for anything — mild negative
    love -= 5;
    updateBar();
    setBubble(randomFrom(wrongLines));
    catWrap.classList.remove('bounce', 'shake');
    void catWrap.offsetWidth;
    catWrap.classList.add('shake');
    setCatImage('idle');

    var btn = document.getElementById('btn-' + action);
    btn.classList.add('wrong');
    setTimeout(function() { btn.classList.remove('wrong'); }, 400);

  } else if (action === want) {
    // Correct! Big reward
    clearTimeout(wantTimer);
    want = null;
    love += 18;
    updateBar();
    setBubble(randomFrom(happyLines));
    catWrap.classList.remove('bounce', 'shake');
    void catWrap.offsetWidth;
    catWrap.classList.add('bounce');
    setCatImage('happy');

    // Go back to idle after 1.5s, then pick next want
    setTimeout(function() {
      if (gameOver) return;
      setBubble(randomFrom(idleLines));
      setCatImage('idle');
      pickNextWant();
    }, 1500);

  } else {
    // Wrong action when cat was asking for something else
    clearTimeout(wantTimer);
    want = null;
    love -= 12;
    updateBar();
    setBubble(randomFrom(wrongLines));
    catWrap.classList.remove('bounce', 'shake');
    void catWrap.offsetWidth;
    catWrap.classList.add('shake');
    setCatImage('idle');

    var btn2 = document.getElementById('btn-' + action);
    btn2.classList.add('wrong');
    setTimeout(function() { btn2.classList.remove('wrong'); }, 400);

    setTimeout(function() {
      if (gameOver) return;
      setBubble(randomFrom(idleLines));
      pickNextWant();
    }, 1500);
  }
}

// ── Win screen ─────────────────────────────────────────────────────────────
function showWin() {
  setCatImage('happy');
  setBubble("Purrrr~ 💕💕");
  popup.classList.add('visible');
}

// ── Reset ──────────────────────────────────────────────────────────────────
function resetGame() {
  love     = 0;
  want     = null;
  gameOver = false;
  cooldown = false;
  clearTimeout(wantTimer);
  popup.classList.remove('visible');
  updateBar();
  setBubble(randomFrom(idleLines));
  setCatImage('idle');
  pickNextWant();
}

// ── Petals ─────────────────────────────────────────────────────────────────
function spawnPetals() {
  var layer = document.getElementById('petalLayer');
  for (var i = 0; i < 18; i++) {
    var p = document.createElement('div');
    p.className = 'petal';
    var size = 10 + Math.random() * 16;
    p.style.cssText =
      'left:' + (Math.random() * 100) + '%;' +
      'width:' + size + 'px;height:' + size + 'px;' +
      'animation-duration:' + (5 + Math.random() * 9) + 's;' +
      'animation-delay:' + (Math.random() * 10) + 's;' +
      'opacity:0;transform:rotate(' + (Math.random() * 360) + 'deg);' +
      'background:hsl(' + (350 + Math.random() * 15) + ',80%,' + (82 + Math.random() * 10) + '%);';
    layer.appendChild(p);
  }
}

// ── Init ───────────────────────────────────────────────────────────────────
spawnPetals();
updateBar();
setBubble(randomFrom(idleLines));
pickNextWant();