
if(!window.SIMD) {
  alert('Your browser does not support SIMD, please download Firefox Nightly!');
}

var p1data, p2data, ctx1, ctx2; 

function filter() {
  var t = parseFloat(offset.value);
  const val = SIMD.float32x4(t, t, t, t);
  const minVal = SIMD.float32x4(1-t, 1-t, 1-t, 1-t);

  var p1d = p1data.data;
  var p2d = p2data.data;

  var now = Date.now();

  for(var i = 0; i < p1d.length; i+=4) {
    var p1 = SIMD.float32x4(p1d[i], p1d[i+1], p1d[i+2], p1d[i+3]);
    var p2 = SIMD.float32x4(p2d[i], p2d[i+1], p2d[i+2], p2d[i+3]);

    p1 = SIMD.float32x4.mul(p1, val);
    p2 = SIMD.float32x4.mul(p2, minVal);
    p1 = SIMD.float32x4.add(p1, p2);

    p1 = SIMD.int32x4.fromFloat32x4(p1);

    p1d[i] = p1.x;
    p1d[i+1] = p1.y;
    p1d[i+2] = p1.z;
    p1d[i+3] = p1.w;
  }

  var end = Date.now() - now;
  interval.textContent = `Filter finished in: ${end}ms`;
  context.putImageData(p1data, 0, 0);
  p1data = ctx1.getImageData(0, 0, img1.width, img1.height);
}

const context = canvas.getContext('2d');

const img1 = new Image();
const img2 = new Image();

img1.onload = function() {
   ctx1 = terminator.getContext('2d');
  ctx1.drawImage(img1, 0, 0);
  p1data = ctx1.getImageData(0, 0, img1.width, img1.height);
};

img2.onload = function() {
  ctx2 = messi.getContext('2d');
  ctx2.drawImage(img2, 0, 0);
  p2data = ctx2.getImageData(0, 0, img2.width, img2.height); 
};

img1.src = 'terminator.jpg';
img2.src = 'messi.jpg';

merge.onclick = filter;
