const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${String(fakeDuration % 60).padStart(2, "0")}`;


sounds.forEach(sound => {
    sound.addEventListener("click", function() {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        checkPlaying(song);
    });
});

play.addEventListener("click", function() {
    checkPlaying(song);
});

replay.addEventListener("click", function() {
    restartSong(song);
});


const restartSong = song =>{
    let currentTime = song.currentTime;
    song.currentTime = 0;
}

timeSelect.forEach(option => {
    option.addEventListener("click", function() {
        fakeDuration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${String(fakeDuration % 60).padStart(2, "0")}`;
    });
});

const checkPlaying = song => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
    } else {
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
    }
};

song.ontimeupdate = function() {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    if (seconds <= 9) {
        // Executed when the number is 9 or below
        seconds = "0" + seconds; // Add a leading zero to convert single-digit seconds to two digits
    } else {
        // Executed when the number is 10 or above
        seconds = seconds; // Keep the seconds value as it is (no leading zero needed)
    }
    if (minutes <= 9) {
        // Executed when the number is 9 or below
        minutes = "0" + minutes; // Add a leading zero to convert single-digit minutes to two digits
    } else {
        // Executed when the number is 10 or above
        minutes = minutes; // Keep the minutes value as it is (no leading zero needed)
    }
    timeDisplay.textContent = `${minutes}:${seconds}`;

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
    }
};