window.onload = onLoad;

const easeInOutQuint = 'cubic-bezier(0.86, 0, 0.07, 1)';
const easeInQuart = 'cubic-bezier(0.895, 0.03, 0.685, 0.22)';
const APPEAR_COMPLETE = 2800;

function onLoad() {
  const dashes = [150, 330, 370, 410, 445, 470, 485, 490, 425];
  const markers = [0, 1, 2, 3, 4, 5, 6, 7];
  const connectors = [193, 151, 166, 85, 119, 215, 208];

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
      delay: APPEAR_COMPLETE + idx * 400,
    });
  });
  var markerGroup = new GroupEffect(markerAnims);

  // Connectors
  const connectorAnims = connectors.map((dist, idx) => {
    const connector = document.querySelector(`#connector${ idx }`);
    const keyframes = generateConnectorKeyframes(dist);
    return new KeyframeEffect(connector, keyframes, {
      duration: 600,
      delay: APPEAR_COMPLETE + idx * 450,
    });
  });
  var connectorGroup = new GroupEffect(connectorAnims);

  // Flash
  const flash = document.querySelector('#flash');
  const flashAnim = new KeyframeEffect(flash, flashKeyframes, {
    duration: 150,
    delay: 6350,
    iterations: 3,
  });

  // Finger Print Animation Group
  var fingerPrintGroup = new GroupEffect([
    loopGroup,
    markerGroup,
    connectorGroup,
    flashAnim,
  ]);

  // Container Appear
  const container = document.querySelector('#container');
  const containerAppearAnim = new KeyframeEffect(
    container,
    containerAppearKeyframes, {
    duration: 800,
  });

  // Container Disappear
  const containerDisappearAnim = new KeyframeEffect(
    container,
    containerDisappearKeyframes, {
    duration: 800,
  });

  // Animation Timeline
  const animation = new SequenceEffect([
    containerAppearAnim,
    fingerPrintGroup,
    containerDisappearAnim
  ]);

  // Begin Infinite loop
  (function play() {
    return document.timeline.play(animation).onfinish = play;
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

function generateConnectorKeyframes(dist) {
  return [{
    strokeDashoffset: 75,
    easing: easeInOutQuint,
  }, {
    strokeDashoffset: -dist,
    easing: easeInOutQuint,
  }];
}

const flashKeyframes = [{
  opacity: 0,
}, {
  opacity: 1,
}, {
  opacity: 0,
}];

const containerAppearKeyframes = [{
  r: 0,
  easing: easeInOutQuint,
}, {
  r: 158,
  easing: easeInOutQuint,
}];

const containerDisappearKeyframes = [{
  r: 158,
  easing: easeInOutQuint,
}, {
  r: 0,
  easing: easeInOutQuint,
}];
