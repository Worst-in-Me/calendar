const hours = new Array(12)
    .fill(0)
    .map((_, index) => index + 1)
    .map((hour) => ({ hour, deg: hour * 30 }));

const points = new Array(60)
    .fill(0)
    .map((_, index) => index + 1)
    .map((minute) => ({ minute, deg: minute * 6 }));
// {
//     hour: 1,
//     deg: 30,
// }
const createClock = (elem) => {
    const drawClock = () => {
        const clock = document.createElement('div');
        clock.classList.add('clock');

        const arrowHour = document.createElement('div');
        arrowHour.classList.add('arrowHour', 'arrow');

        const arrowMin = document.createElement('div');
        arrowMin.classList.add('arrowMin', 'arrow');

        const arrowSec = document.createElement('div');
        arrowSec.classList.add('arrowSec', 'arrow');

        //рисуем цифры на часах
        for (const { hour, deg } of hours) {
            const stick = document.createElement('div');
            const number = document.createElement('div');
            stick.classList.add('numbers');
            number.textContent = hour;
            stick.style.transform = `rotate(${deg}deg)`;
            number.style.transform = `rotate(${-deg}deg)`;
            clock.appendChild(stick);
            stick.appendChild(number);
        }

        for (const { deg } of points) {
            const stick = document.createElement('div');
            stick.classList.add('points');
            stick.textContent = '.';
            stick.style.transform = `rotate(${deg}deg)`;
            clock.appendChild(stick);
        }

        const showTime = (date = new Date()) => {
            const degPerMillisec = (date.getMilliseconds() * 6) / 1000;
            const degPerSec = date.getSeconds() * 6 + degPerMillisec;
            const degPerMin = ((date.getMinutes() / 10) * 60 + degPerSec / 60).toFixed(1);
            const degPerHour = ((date.getHours() % 12) * 30 + degPerMin / 60).toFixed(1);

            arrowSec.style.transform = `rotate(${degPerSec}deg)`;
            arrowMin.style.transform = `rotate(${degPerMin}deg)`;
            arrowHour.style.transform = `rotate(${degPerHour}deg)`;
        };

        setInterval(showTime, 1);

        clock.append(arrowHour, arrowMin, arrowSec);

        return clock;
    };

    const clock = drawClock();

    elem.appendChild(clock);
};

createClock(wrapper);
