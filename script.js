var img = new Image();
var div = document.getElementById('foo');

img.onload = function() {
  div.appendChild(img);
};

img.src = 'path/to/image.jpg';