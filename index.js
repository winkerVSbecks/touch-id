window.onload = onLoad;

const EASING = 'cubic-bezier(0.86, 0, 0.07, 1)';
const timing = {
  duration: 4000,
  iterations: Infinity,
};

function onLoad() {
  const dashes = [150, 330, 370, 410, 445, 470, 485, 490, 425];

  dashes.forEach((dash, idx) => {
    const loop = document.querySelector(`#loop${ idx }`);
    const keyframes = generateLoopKeyframes(0, dash);
    loop.animate(keyframes, timing);
  });
}

function generateLoopKeyframes(idx, Dashoffset) {
  const i = idx / 100;
  return [{
    strokeDashoffset: 0,
    opacity: 0,
    offset: 0,
    easing: EASING,
  }, {
    strokeDashoffset: 0,
    opacity: 0,
    offset: 0.01 + i,
    easing: EASING,
  }, {
    opacity: 1,
    offset: 0.02 + i,
    easing: EASING,
  }, {
    strokeDashoffset: Dashoffset,
    offset: 0.25 + i,
    easing: EASING,
  }, {
    strokeDashoffset: Dashoffset,
    opacity: 1,
    offset: 0.5,
    easing: EASING,
  }, {
    opacity: 1,
    offset: 0.74,
    easing: EASING,
  }, {
    strokeDashoffset: 0,
    opacity: 0,
    offset: 0.75 + i,
    easing: EASING,
  }, {
    strokeDashoffset: 0,
    opacity: 0,
    offset: 1,
    easing: EASING,
  }];
}
