import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', onClickBtnCreatePromise);

function onClickBtnCreatePromise(e) {
  e.preventDefault();
  const dataInput = {
    delay: Number(refs.formEl.elements.delay.value),
    step: Number(refs.formEl.elements.step.value),
    amount: Number(refs.formEl.elements.amount.value),
  };

  fulfilledOrRejectPromises(dataInput);
}

function fulfilledOrRejectPromises({ delay, step, amount }) {
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + step * i)
      .then(onSuccess)
      .catch(onReject);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
