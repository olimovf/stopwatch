// watch selectors
const watch = document.querySelector('.watch');
const minTag = document.querySelector('.min');
const secTag = document.querySelector('.sec');
const msecTag = document.querySelector('.msec');
const dial = document.querySelector('.mini-watch span');

// buttons
const startBtn = document.getElementById('start-btn');
const flagBtn = document.getElementById('flag-btn');

// watch variables
let msec = 0, sec = 0, min = 0;
let prevMin = prevSec = prevMsec = 0;

// dial degree
let deg = 0;
let isPlaying = false;
let counter, dialCounter;

// create watch borders
for (let i = 0; i < 180; i += 3) {
    const item = document.createElement('span');
    item.style.transform = `translate(-50%, -50%) rotateZ(${i}deg)`;
    watch.appendChild(item);
}

startBtn.addEventListener('click', () => {
    flagBtn.style.display = 'block';

    isPlaying = !isPlaying;

    startBtn.innerHTML = isPlaying
        ? '<i class="fas fa-pause"></i>'
        : '<i class="fas fa-play"></i>';

    flagBtn.innerHTML = isPlaying
        ? '<i class="fas fa-flag"></i>'
        : '<i class="fas fa-stop"></i>';

    if (isPlaying) {
        counter = setInterval(() => timer(), 10);
        dialCounter = setInterval(() => dialAnim(), 10);
    } else {
        clearInterval(counter);
        clearInterval(dialCounter);
    }
});

const flags = document.querySelector('.flags');
flagBtn.addEventListener('click', () => {
    if (isPlaying) {
        const flagDiv = document.createElement('div');
        flagDiv.className = 'flag';

        let delta = (min * 60 + sec + msec / 100) - (prevMin * 60 + prevSec + prevMsec / 100);
        delta = delta.toFixed(2);

        let deltaMin = parseInt(delta / 60),
            deltaSec = (delta % 60).toFixed(2).split('.')[0],
            deltaMsec = (delta % 60).toFixed(2).split('.')[1];

        flagDiv.innerHTML = `
            <span>${formattedNumber(flags.children.length + 1)}</span>
            <span>+ ${formattedNumber(deltaMin)}:${formattedNumber(deltaSec)}.${formattedNumber(deltaMsec)}</span>
            <span>${formattedNumber(min)}:${formattedNumber(sec)}.${formattedNumber(msec)}</span>
        `;

        flags.insertAdjacentElement('afterbegin', flagDiv);

        prevMin = min;
        prevSec = sec;
        prevMsec = msec;
    } else {
        flagBtn.style.display = 'none';
        flags.innerHTML = '';
        msec = sec = min = 0;
        prevMsec = prevSec = prevMin = 0;
        deg = 0;
        msecTag.textContent = formattedNumber(msec);
        secTag.textContent = formattedNumber(sec);
        minTag.textContent = formattedNumber(min);
        dial.style.transform = 'translateX(-50%) rotateZ(0deg)';
    }
});

function timer() {
    msec++;

    if (msec > 99) {
        sec++;
        msec = 0;
    }

    if (sec > 59) {
        min++;
        sec = 0;
    }

    msecTag.textContent = formattedNumber(msec);
    secTag.textContent = formattedNumber(sec);
    minTag.textContent = formattedNumber(min);
}

function dialAnim() {
    deg += 3.6;
    deg >= 360 ? deg = 0 : deg;
    dial.style.transform = `translateX(-50%) rotateZ(${deg.toFixed(1)}deg)`;
}

function formattedNumber(num) {
    return num > 9 || num.length > 1 ? num : '0' + num;
}