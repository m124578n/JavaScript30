/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    const icon = video.paused ? '＞' : '|| ||';
    toggle.textContent = icon;
}

function skip(){
    // console.log(this.dataset);
    // console.log(typeof this.dataset.skip);
    // dataset.skip 的 typeof 結果為 string
    video.currentTime += (this.dataset.skip) * 1.0; // 強制轉型為數值
}

function handleRangeUpdate(){
    // video 的 volume 可以控制音量
    // video 的 playbackRate 可以控制速度
    video[this.name] = this.value; 
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    console.log(progressBar);
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    // console.log(e.offsetX, progress.offsetWidth);
    // e.offsetX 可以得到以進度條為範圍的 X 座標
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; 
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton); // 更新撥放按鈕為撥放
video.addEventListener('pause', updateButton); // 更新撥放按鈕為暫停
video.addEventListener('timeupdate', handleProgress); // 更新影片進度條

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip)); // 有兩個 要做 forEach
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub); // 點擊影片進度條
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // 滑鼠按下才反應
