var Request = new XMLHttpRequest();

Request.open('GET', 'http://api.themoviedb.org/3/movie/popular');

Request.setRequestHeader('Accept', 'application/json');

Request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

Request.send(JSON.stringify(body));