window.onload = onLoad;

const easeInOutQuint = 'cubic-bezier(0.86, 0, 0.07, 1)';
const easeInQuart = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';
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
    easing: easeInOutQuint
  }, {
    strokeDashoffset: 0,
    opacity: 0,
    offset: 0.01 + i,
    easing: easeInOutQuint
  }, {
    opacity: 1,
    offset: 0.02 + i,
    easing: easeInOutQuint
  }, {
    strokeDashoffset: Dashoffset,
    offset: 0.25 + i,
    easing: easeInOutQuint
  }, {
    strokeDashoffset: Dashoffset,
    opacity: 1,
    offset: 0.5,
    easing: easeInQuart
  }, {
    opacity: 1,
    offset: 0.74,
    easing: easeInQuart,
  }, {
    strokeDashoffset: 0,
    opacity: 0,
    offset: 0.75 + i,
    easing: easeInQuart,
  }, {
    strokeDashoffset: 0,
    opacity: 0,
    offset: 1,
    easing: easeInQuart,
  }];
}
