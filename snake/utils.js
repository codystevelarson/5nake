var loadingAssets = [],
  a_ = [],
  a_death,
  a_bg;

var muted = false;

function loadAssets() {
  loadingAssets.push(1);
  a_death = new p5.SoundFile(
    "http://127.0.0.1:8887/assets/snake%20death.wav",
    function(a) {
      console.log(`SUCCESS: ${a}`);
      a_.push(a_death);
    },
    function(a) {
      console.log(`ERROR:${a}`);
    },
    function(a) {
      console.log(`LOADING: ${a}`);
    }
  );

  loadingAssets.push(1);
  a_bg = new p5.SoundFile(
    "http://127.0.0.1:8887/assets/snake%20bg.wav",
    function(a) {
      console.log(`SUCCESS: ${a}`);
      a_.push(a_bg);
      a_bg.loop();
    },
    function(a) {
      console.log(`ERROR:${a}`);
    },
    function(a) {
      console.log(`LOADING: ${a}`);
    }
  );
}

function assetsLoaded() {
  if (assetsLoaded.length > 0) {
    loading = true;
  }
  loading = false;
}

function sound(queue) {
  let a;
  switch (queue) {
    case "death":
      a = a_death;
      break;
  }

  if (assetCheck(a, queue)) {
    a.play();
  }
}

function changeRate(a, speed) {
  switch (a) {
    case "bg":
      if (assetCheck(a_bg, a)) {
        console.log(a_bg.rate(speed));
      }
  }
}

function loadingAsset(a) {
  console.log(`${a}: Loading!`);
  debugger;
}

function loadSuccess(a) {
  console.log(`${a}: Found!`);
  debugger;
}

function loadError(a) {
  console.log(`${a}: not found...`);
  debugger;
}

function assetCheck(asset, queue) {
  if (asset.isLoaded()) {
    return true;
  }
  console.log(`ERROR: Asset :${queue}: not loaded`);
  return false;
}

function mute() {
  muted = !muted;
  let vol = 0;
  if (!muted) {
    vol = 1;
  }
  a_.forEach(a => {
    debugger;
    a.setVolume(vol, 0.25);
  });
}

function randomColor() {
  return color(random(255), random(255), random(255));
}
