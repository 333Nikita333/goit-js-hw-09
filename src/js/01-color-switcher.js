const refs = {
  bodyEl: document.querySelector('body'),
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
};
const delay = 1000;
let timerId = null;

refs.btnStartEl.addEventListener('click', onStart);
refs.btnStopEl.addEventListener('click', onStop);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function onStart() {
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, delay);
  switcherBtn();
}

function onStop() {
  clearInterval(timerId);
  switcherBtn();
}

function switcherBtn() {
  if (!refs.btnStartEl.disabled) {
    refs.btnStartEl.disabled = true;
    refs.btnStopEl.disabled = false;
    return;
  }
  if (!refs.btnStopEl.disabled) {
    refs.btnStopEl.disabled = true;
    refs.btnStartEl.disabled = false;
    return;
  }
}
