window.onload = onLoad;

const easeInOutQuint = 'cubic-bezier(0.86, 0, 0.07, 1)';
const easeInQuart = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';

function onLoad() {
  const dashes = [150, 330, 370, 410, 445, 470, 485, 490, 425];
  const markers = [0, 1, 2, 3, 4, 5, 6, 7];

  // Loops
  const loopAnims = dashes.map((offset, idx) => {
    const loop = document.querySelector(`#loop${ idx }`);
    const keyframes = generateLoopKeyframes(offset);
    return new KeyframeEffect(loop, keyframes, {
      duration: 8000,
      delay: idx * 100,
    });
  });
  var loopGroup = new GroupEffect(loopAnims);

  // Markers
  const markerAnims = markers.map((idx) => {
    const marker = document.querySelector(`#marker${ idx }`);
    const keyframes = generateMarkerKeyframes();
    return new KeyframeEffect(marker, keyframes, {
      duration: 1000,
      delay: 2800 + idx * 400,
    });
  });
  var markerGroup = new GroupEffect(markerAnims);

  var sequence = new GroupEffect([
    loopGroup,
    markerGroup,
  ]);

  (function play() {
    return document.timeline.play(sequence).onfinish = play;
  })();
}

function generateLoopKeyframes(dashoffset) {
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
    strokeDashoffset: dashoffset,
    offset: 0.25,
    easing: easeInOutQuint
  }, {
    strokeDashoffset: dashoffset,
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


function generateMarkerKeyframes() {
  return [{
    r: 0,
    strokeWidth: 4,
  }, {
    strokeWidth: 4,
  }, {
    strokeWidth: 0,
    r: 20,
  }];
}
