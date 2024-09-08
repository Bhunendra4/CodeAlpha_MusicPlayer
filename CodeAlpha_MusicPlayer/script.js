const songs = [
  { title: "Song 1", url: "path/to/song1.mp3" },
  { title: "Song 2", url: "path/to/song2.mp3" },
  { title: "Song 3", url: "path/to/song3.mp3" },
  { title: "Song 4", url: "path/to/song4.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;

const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const songList = document.getElementById('song-list');
const searchInput = document.getElementById('search');

loadSong(songs[currentSongIndex]);

function loadSong(song) {
  audioPlayer.src = song.url;
  audioPlayer.volume = 0.5;
}

function playSong() {
  audioPlayer.play();
  playPauseBtn.textContent = '⏸️';
  isPlaying = true;
}

function pauseSong() {
  audioPlayer.pause();
  playPauseBtn.textContent = '▶️';
  isPlaying = false;
}

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
      pauseSong();
  } else {
      playSong();
  }
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

volumeControl.addEventListener('input', (e) => {
  audioPlayer.volume = e.target.value;
});

function displaySongs(songs) {
  songList.innerHTML = '';
  songs.forEach((song, index) => {
      const li = document.createElement('li');
      li.textContent = song.title;
      li.addEventListener('click', () => {
          currentSongIndex = index;
          loadSong(song);
          playSong();
      });
      songList.appendChild(li);
  });
}

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(searchTerm));
  displaySongs(filteredSongs);
});

displaySongs(songs);
