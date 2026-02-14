// ── Playlist ───────────────────────────────────────────────────────────────
// Fill in each song's details and your personal note below.
// embed → the Spotify src URL for that track

var songs = [
  {
    title:  "Pyramid Song",
    artist: "Radiohead",
    embed:  "https://open.spotify.com/embed/track/55q3Ro66yXWi9rsEddeEN4?utm_source=generator&theme=0",
    note:   "I believe this one is pretty self explanatory, its my favorite song of all time, and you are my favorite person."
  },
  {
    title:  "La Lune",
    artist: "King Krule",
    embed:  "https://open.spotify.com/embed/track/7z41WUzSJJvvNfw3BO7GMZ?utm_source=generator",
    note:   "This song is just majestic, and i wont be corny by saying \"just like you\", but actually the reason why this song reminds me of you is because it's my go to song when i am desperate for comfort, and by heavens do you make me comfortable with your presence."
  },
  {
    title:  "Get You",
    artist: "Daniel Caesar feat. Kali Uchis",
    embed:  "https://open.spotify.com/embed/track/55CXEdnHKqzhwtcF4WhMHU?utm_source=generator",
    note:   "This song makes me fantasize about us, going on cute dates, and just being in love. I know its a bit cheesy but i cant help it, this song is just so romantic and sweet, and it reminds me of how you make me feel."
  },
  {
    title:  "Kerosene!",
    artist: "Yves Tumor",
    embed:  "https://open.spotify.com/embed/track/2OoKzfr7RB5o9cxHArUoIS?utm_source=generator",
    note:   "Actually this one reminds me of US, not just you or how i feel with you. just purely us, listen to it and i will let the lyrics do the explanation on why i think so."
  },
  {
    title:  "Star Eyes",
    artist: "Magdalena Bay",
    embed:  "https://open.spotify.com/embed/track/6jcDUlSVT4emqIIlbEzyqV?utm_source=generator",
    note:   "The ending chorus is literally what plays in my head everytime i see you looking all beautiful."
  }
];

// Renders all song cards
function renderSongs() {
  var container = document.getElementById('song-cards');
  songs.forEach(function(song, i) {
    var card = document.createElement('div');
    card.className = 'song-card';
    card.style.animationDelay = (i * 0.12) + 's';
    card.innerHTML =
      '<div class="song-header">' +
        '<div class="song-number">' + (i + 1) + '</div>' +
        '<div class="song-meta">' +
          '<div class="song-title">' + song.title + '</div>' +
          '<div class="song-artist">' + song.artist + '</div>' +
        '</div>' +
      '</div>' +
      '<iframe class="song-embed" src="' + song.embed + '" height="80" frameborder="0" ' +
        'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ' +
        'loading="lazy"></iframe>' +
      '<hr class="song-divider"/>' +
      '<div class="song-note">' + song.note + '</div>';
    container.appendChild(card);
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

// Renders the special full playlist card at the bottom
function renderPlaylistCard() {
  var container = document.getElementById('song-cards');
  var card = document.createElement('div');
  card.className = 'song-card playlist-card';
  card.style.animationDelay = (songs.length * 0.12) + 's';
  card.innerHTML =
    '<div class="playlist-card-header">' +
      '<span class="playlist-card-icon">🎶</span>' +
      '<p class="playlist-card-text">I also made a full playlist for you if you want to hear more songs that reminds me of you :3</p>' +
    '</div>' +
    '<iframe src="https://open.spotify.com/embed/playlist/18htqqd2Frjm0Sgw03fclK?utm_source=generator" ' +
      'width="100%" height="352" frameborder="0" class="song-embed" ' +
      'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ' +
      'loading="lazy"></iframe>';
  container.appendChild(card);
}

spawnPetals();
renderSongs();
renderPlaylistCard();