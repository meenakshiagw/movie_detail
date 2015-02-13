
var getJSON = function(url) {
 return new Promise(function(resolve, reject) {
   var xhr = new XMLHttpRequest();
   xhr.open('get', url, true);
   xhr.responseType = 'json';
   xhr.setRequestHeader('Accept', 'application/json');
   xhr.onload = function() {
     var status = xhr.status;
     if (status == 200) {
       resolve(xhr.response);
     } else {
       reject(status);
     }
   };
   xhr.send();
 });
};

function func()
{
  getJSON("http://api.themoviedb.org/3/movie/top_rated?api_key=11f47f644c4ac312a64a760d25516450").then(function(data) {
    var i;
    var ul = document.getElementById("list");
    for(i=0;i<10;i++)
    {
      var li = document.createElement("li");
      var a = document.createElement("a");
      var imagediv = document.createElement("div");
      var namediv = document.createElement("div");
      var newul = document.createElement("ul");
      var image = document.createElement("img");
      var movie_name_li = document.createElement("li");
      var movie_rating_li = document.createElement("li");
      var movie_release_li = document.createElement("li");
      var movie_name = document.createTextNode(data.results[i]["title"]);
      var movie_rating = document.createTextNode('Rating : '+data.results[i]["vote_average"]);
      var movie_release = document.createTextNode('Release Date : '+data.results[i]["release_date"]);

      li.setAttribute('class', 'image-movie');
      ul.appendChild(li);
      li.appendChild(a);
      a.setAttribute('href', 'details.html?a='+data.results[i]["id"]);
      a.appendChild(imagediv);
      imagediv.setAttribute('class', 'image-div');

      imagediv.appendChild(image);
      image.setAttribute('src',"http://image.tmdb.org/t/p/w500"+data.results[i]["poster_path"]);
      image.setAttribute('class', 'image');

      a.appendChild(namediv);
      namediv.setAttribute('class', 'movie');
      namediv.appendChild(newul);

      newul.appendChild(movie_name_li);
      newul.appendChild(movie_rating_li);
      newul.appendChild(movie_release_li);
      movie_name_li.appendChild(movie_name);
      movie_rating_li.appendChild(movie_rating);
      movie_release_li.appendChild(movie_release);

    }

  }, function(status) {
   console.log(status);
 }); 

}
func();
