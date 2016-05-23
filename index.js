window.onload = onLoad;

const easeInOutQuint = 'cubic-bezier(0.86, 0, 0.07, 1)';
const easeInQuart = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';
const timing = { duration: 4000 };

function onLoad() {
  const dashes = [150, 330, 370, 410, 445, 470, 485, 490, 425];

  const loopBirthAnims = dashes.map((dash, idx) => {
    const loop = document.querySelector(`#loop${ idx }`);
    const keyframes = generateLoopKeyframes(0, dash);
    return new KeyframeEffect(loop, keyframes, {
      duration: 8000,
      delay: idx * 100,
    });
  });

  var loopBirthGroup = new GroupEffect(loopBirthAnims);

  var sequence = new GroupEffect([
    loopBirthGroup,
    // circle animation goes here
  ]);

  (function play() {
    return document.timeline.play(sequence).onfinish = play;
  })();
}

function generateLoopKeyframes(idx, Dashoffset) {
  return [{
    strokeDashoffset: 0,
    opacity: 0,
    offset: 0,
    easing: easeInOutQuint
  }, {
    strokeDashoffset: 0,
    opacity: 0,
    offset: 0.01,
    easing: easeInOutQuint
  }, {
    opacity: 1,
    offset: 0.02,
    easing: easeInOutQuint
  }, {
    strokeDashoffset: Dashoffset,
    offset: 0.25,
    easing: easeInOutQuint
  }, {
    strokeDashoffset: Dashoffset,
    offset: 0.875,
    easing: easeInQuart,
  }, {
    opacity: 1,
    offset: 0.99,
    easing: easeInQuart
  }, {
    strokeDashoffset: 0,
    opacity: 0,
    offset: 1,
    easing: easeInQuart,
  }];
}
