import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  bodyEl: document.querySelector('body'),
  inputEl: document.querySelector('#datetime-picker'),
  btnStartTimer: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
  displayTimerEl: document.querySelector('.timer'),
};

const optionsFlatpickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
      refs.btnStartTimer.setAttribute('disabled', true);
    } else {
      refs.btnStartTimer.removeAttribute('disabled');
    }
  },
};

const flatValue = new flatpickr('#datetime-picker', optionsFlatpickr);

refs.btnStartTimer.addEventListener('click', onStartTimerBtn);

function onStartTimerBtn() {
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = flatValue.selectedDates[0] - currentTime;
    const time = convertMs(deltaTime);

    if (deltaTime < 0) {
      Notiflix.Notify.info('Time is up, please choose another time', {
        timeout: 3000,
      });
      clearInterval(intervalId);
      return;
    }
    updateClockface(time);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${addLeadingZero(days)}`;
  refs.hoursEl.textContent = `${addLeadingZero(hours)}`;
  refs.minutesEl.textContent = `${addLeadingZero(minutes)}`;
  refs.secondsEl.textContent = `${addLeadingZero(seconds)}`;
}

refs.bodyEl.style.textAlign = 'center';
// Стили таймера
refs.displayTimerEl.style.display = 'flex';
refs.displayTimerEl.style.gap = '15px';
refs.displayTimerEl.style.justifyContent = 'center';
// Стили счетчика дней
refs.daysEl.style.display = 'flex';
refs.daysEl.style.justifyContent = 'center';
refs.daysEl.style.fontSize = '40px';
// Стили счетчика часов
refs.hoursEl.style.display = 'flex';
refs.hoursEl.style.justifyContent = 'center';
refs.hoursEl.style.fontSize = '40px';
// Стили счетчика минут
refs.minutesEl.style.display = 'flex';
refs.minutesEl.style.justifyContent = 'center';
refs.minutesEl.style.fontSize = '40px';
// Стили счетчика секунд
refs.secondsEl.style.display = 'flex';
refs.secondsEl.style.justifyContent = 'center';
refs.secondsEl.style.fontSize = '40px';
// Стили кнопки старт
refs.btnStartTimer.style.backgroundColor = 'ffffff';
refs.btnStartTimer.style.padding = '0 10px';
refs.btnStartTimer.style.borderRadius = '10px';
refs.btnStartTimer.style.fontSize = '20px';

// Другое решение c помощью экземпляра класса
// class Timer {
//   constructor({ onTick }) {
//     this.intervalId = null;
//     this.isActive = false;
//     this.onTick = onTick;

//     this.init();
//   }

//   init() {
//     const time = this.convertMs(0);
//     this.onTick(time);
//   }

//   start() {
//     if (this.isActive) {
//       return;
//     }

//     this.isActive = true;

//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = flatpickrObj.selectedDates[0] - currentTime;
//       const time = this.convertMs(deltaTime);

//       if (deltaTime < 0) {
//         clearInterval(this.intervalId);
//         Notiflix.Notify.info('Time is up, choose another time');
//         return;
//       }

//       this.onTick(time);
//     }, 1000);
//   }

//   convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     // Remaining days
//     const days = this.pad(Math.floor(ms / day));
//     // Remaining hours
//     const hours = this.pad(Math.floor((ms % day) / hour));
//     // Remaining minutes
//     const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
//     // Remaining seconds
//     const seconds = this.pad(
//       Math.floor((((ms % day) % hour) % minute) / second)
//     );

//     return { days, hours, minutes, seconds };
//   }

//   pad(value) {
//     return String(value).padStart(2, '0');
//   }
// }

// const timer = new Timer({
//   onTick: updateClockface,
// });

// const optionsFlatpickr = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (new Date() > selectedDates[0]) {
//       Notiflix.Notify.failure('Please choose a date in the future');
//       refs.btnStartTimer.setAttribute('disabled', true);
//     } else {
//       refs.btnStartTimer.removeAttribute('disabled');
//     }
//   },
// };

// const flatpickrObj = new flatpickr('#datetime-picker', optionsFlatpickr);
// refs.btnStartTimer.addEventListener('click', timer.start.bind(timer));

// function updateClockface({ days, hours, minutes, seconds }) {
//   refs.daysEl.textContent = `${days}`;
//   refs.hoursEl.textContent = `${hours}`;
//   refs.minutesEl.textContent = `${minutes}`;
//   refs.secondsEl.textContent = `${seconds}`;
// }
