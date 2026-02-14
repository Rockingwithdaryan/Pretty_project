// ── Story Script ──────────────────────────────────────────────────────────
var storyScript = [
    {
        name: "??",
        scene: "Chapter 1: Introduction",
        text: "Oh, you're finally here. I was wondering when you'd show up. I've been waiting for you. I have something to tell you... but I'm not sure how to say it."
    },
    {
        name: "Daryan",
        scene: "Chapter 1: Introduction",
        text: "i dont know if you can tell, but im supposed to be Daryan."
    },
    {
        name: "Daryan",
        scene: "Chapter 1: Introduction",
        text: "But, i still wanted to try a little something for you."
    },
    {
        name: "Daryan",
        scene: "Chapter 1: Introduction",
        text: "I'm not always great with words. But today, I really wanted to try."
    },
    {
        name: "Daryan",
        scene: "Chapter 1: Introduction",
        text: "I put a lot of love and effort into this, i really hope you like it."
    },
    {
        name: "Daryan",
        scene: "Chapter 1: Introduction",
        text: "Making you happy is my top priority, and i really hope this puts a smile on your pretty face."
    },
    {
        name: "Daryan",
        scene: "Chapter 1: Introduction",
        text: "So, imma need you to lock in brobro."
    },
    {
        name: "Daryan",
        scene: "Chapter 1: Introduction",
        text: "Because you're in for a little silly adventure!."
    },
    {
        name: "Daryan",
        scene: "Chapter 1: Introduction",
        text: "I know this is cheesy, but i really do love you, and i hope that this little project i made for you can show you even a fraction of how much you mean to me."
    },
    {
        name: "Daryan",
        scene: "Chapter 1: Introduction",
        text: "Happy Valentine's Day. Now go explore what I made for you. ❤️"
    }
];

// ── State ─────────────────────────────────────────────────────────────────
var currentIndex = 0;
var typing = false;
var typeTimer = null;
var currentImage = 1;

var dialogueEl = document.getElementById('dialogue-text');
var charImg = document.getElementById('char-img');
var charName = document.getElementById('char-name');
var sceneLabel = document.getElementById('scene-label');
var btnNext = document.getElementById('btn-next');
var dotsEl = document.getElementById('dots');
var stage = document.getElementById('stage');

// ── Build progress dots ───────────────────────────────────────────────────
function buildDots() {
    dotsEl.innerHTML = '';
    storyScript.forEach(function (_, i) {
        var d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.id = 'dot-' + i;
        dotsEl.appendChild(d);
    });
}

function updateDots(idx) {
    storyScript.forEach(function (_, i) {
        var d = document.getElementById('dot-' + i);
        if (i < idx) d.className = 'dot done';
        else if (i === idx) d.className = 'dot active';
        else d.className = 'dot';
    });
}

// ── Typewriter ────────────────────────────────────────────────────────────
function typeText(text) {
    typing = true;
    dialogueEl.classList.remove('done');
    dialogueEl.textContent = '';
    btnNext.disabled = true;
    var i = 0;
    var speed = 28;

    function tick() {
        if (i < text.length) {
            dialogueEl.textContent += text[i++];
            typeTimer = setTimeout(tick, speed);
        } else {
            typing = false;
            dialogueEl.classList.add('done');
            btnNext.disabled = false;
        }
    }
    tick();
}

function skipTyping() {
    if (!typing) return;
    clearTimeout(typeTimer);
    dialogueEl.textContent = storyScript[currentIndex].text;
    dialogueEl.classList.add('done');
    typing = false;
    btnNext.disabled = false;
}

// ── Image bounce + swap ───────────────────────────────────────────────────
function bounceAndSwapImage() {
    var frame = charImg.parentElement;
    frame.classList.remove('bounce');
    void frame.offsetWidth;
    frame.classList.add('bounce');

    setTimeout(function () {
        charImg.classList.add('hidden');
        charImg.classList.remove('visible');
        setTimeout(function () {
            charImg.src = '/images/speaking ' + currentImage + '.jpeg';
            charImg.classList.remove('hidden');
            charImg.classList.add('visible');
        }, 150);
    }, 100);
}

// ── Load a scene ──────────────────────────────────────────────────────────
function loadScene(idx, doSwap) {
    var s = storyScript[idx];

    if (doSwap) {
        currentImage = currentImage === 1 ? 2 : 1;
        bounceAndSwapImage();
    }

    charName.textContent = s.name;
    sceneLabel.textContent = s.scene;
    updateDots(idx);
    typeText(s.text);
}

// ── Advance ───────────────────────────────────────────────────────────────
function advance() {
    if (typing) { skipTyping(); return; }

    currentIndex++;
    if (currentIndex >= storyScript.length) {
        showChapterSelect();
        return;
    }
    loadScene(currentIndex, true);
}

// ── Show chapter select ───────────────────────────────────────────────────
function showChapterSelect() {
    // Fade out the stage, then redirect to home
    stage.style.transition = 'opacity 0.5s ease';
    stage.style.opacity = '0';
    setTimeout(function () {
        window.location.href = '/home';
    }, 500);
}

// ── Floating petals ───────────────────────────────────────────────────────
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

// ── Init ─────────────────────────────────────────────────────────────────
buildDots();
spawnPetals();
loadScene(0, false);