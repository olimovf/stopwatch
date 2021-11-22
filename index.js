// watch selectors
const watch = document.querySelector('.watch');
const minTag = document.querySelector('.min');
const secTag = document.querySelector('.sec');
const msecTag = document.querySelector('.msec');
const dial = document.querySelector('.mini-watch span');

// create watch borders
for (let i = 0; i < 180; i += 3) {
    const item = document.createElement('span');
    item.style.transform = `translate(-50%, -50%) rotateZ(${i}deg)`;
    watch.appendChild(item);
}

// watch elements
let msec = 0, sec = 0, min = 0;
// dial degree
let deg = 0;

setInterval(() => timer(), 10);
setInterval(() => dialAnim(), 10);

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
    dial.style.transform = `translateX(-50%) rotateZ(${deg}deg)`;
}

function formattedNumber(num) {
    return num > 9 ? num : '0' + num;
}