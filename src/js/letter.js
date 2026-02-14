// ── Love Letter JS ────────────────────────────────────────────────────────
// Edit the letter content below!

var signName = "Daryan";   // <- your name goes here

var paragraphs = [
  "I wanted to write you a letter, but I realized that words are not enough to express how much you mean to me. From the moment i wake up to the second i sleep, you are the first and last thing on my mind. every second of my day i always wonder to myself just what is my girlfriend up to? has she eaten? is she happy? is she thinking of me? and the answer to all of those questions is always the same, which is that i hope she is doing well, and that she is happy, and that she is thinking of me too.",
  "Every moment with you feels like a dream I don't want to wake up from. You make even ordinary days feel extraordinary. You are very funny, and you have the most beautiful smile and you laugh GOD I LOVE YOUR LAUGH, i am so happy that i am as funny as i am *ehm ehm* because i get to hear you laugh and giggle so often. Your kindness and compassion inspire me to be a better person every single day. I am so grateful to have you in my life, and I cherish every moment we spend together.",
  "I may not be exactly the best with words, but i hope this letter can at least give you a glimpse into how much i love you, and how much you mean to me. you are my everything, and i promise to always be here for you. happy valentine's day, my love. ❤️"
];

// Renders the letter
function renderLetter() {
  document.getElementById('letter-name').textContent = signName;
  var body = document.getElementById('letter-body');
  paragraphs.forEach(function(para) {
    var p = document.createElement('p');
    p.textContent = para;
    body.appendChild(p);
  });
}

// Petals
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

spawnPetals();
renderLetter();