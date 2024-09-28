

// Music Player Logic
const musicPlayer = document.querySelector(".music-container");
const togglePlayer = document.querySelector(".toggle-player");

const trackInfo = document.querySelector(".track-info");
const trackName = document.querySelector(".trackname");
const trackArtist = document.querySelector(".trackartist");
const trackNav = document.querySelector(".track-nav");

const playPauseBtn = document.querySelector(".playpause-track");
const nextBtn = document.querySelector(".next-track");
const prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;

const currentTrack = document.createElement("audio");
const soundBars = document.querySelector(".sound-bars");

// Toggle Player Visibility
togglePlayer.addEventListener("click", function() {
    isHidden = !isHidden;
    if (isHidden) {
        musicPlayer.classList.remove("hide");
        togglePlayer.innerHTML = '<img class="w-[98%]" src="icons/close.svg">';
        trackInfo.style.transitionDelay = "0.4s";
        trackNav.style.transitionDelay = "0.4s";
    } else {
        musicPlayer.classList.add("hide");
        togglePlayer.innerHTML = '<img class="w-full" src="icons/plus.svg">';
        trackInfo.style.transitionDelay = "0s";
        trackNav.style.transitionDelay = "0s";
    }
});

// Load Animation for Sound Bars
const soundBarsLottie = bodymovin.loadAnimation({
    container: soundBars,
    renderer: "svg",
    loop: true,
    autoPlay: false,
    path: "https://lottie.host/9ec12a7e-e429-453a-9f22-a2af1dcb4dca/2zeuy4rwtP.json",
});

// Track List
const trackList = [
    { name: "Only", artist: "Lee Hi", path: "./music/only.mp3" },
    { name: "Day & Night", artist: "Jung Seung Hwan", path: "./music/day and night.mp3" },
    { name: "Love of my Life", artist: "Reyne", path: "./music/love of my life.mp3" },
    { name: "The Only One", artist: "Reyne", path: "./music/the only one.mp3" },
];

// Event Listeners for Music Player
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Load the initial track
loadTrack(trackIndex);

function loadTrack(index) {
    currentTrack.src = trackList[index].path;
    trackName.textContent = trackList[index].name;
    trackArtist.textContent = trackList[index].artist;
    currentTrack.addEventListener("ended", nextTrack);
    currentTrack.load();
}

function playPauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/pause.svg">';
    soundBarsLottie.play();
}

function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/play.svg">';
    soundBarsLottie.stop();
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % trackList.length; // Loop back to start
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + trackList.length) % trackList.length; // Loop to end
    loadTrack(trackIndex);
    playTrack();
}
