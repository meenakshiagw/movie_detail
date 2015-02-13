function details(){

  var parts = window.location.href.split('?')[1].split('=');
  getJSON("http://api.themoviedb.org/3/movie/"+parts[1]+"?api_key=11f47f644c4ac312a64a760d25516450").then(function(data) {
    document.getElementById("movie-poster").src= "http://image.tmdb.org/t/p/w500"+data.poster_path;

    var movie_duration=document.getElementById("movie-duration");
    var title_runtime=document.createTextNode(data.title +" ( "+data.runtime+" minutes )");
    movie_duration.appendChild(title_runtime);

    var rating = document.getElementById("rating");
    var vote_average=document.createTextNode(data.vote_average);
    rating.appendChild(vote_average);

    var release_date = document.getElementById("release-date");
    var release_date_data=document.createTextNode(data.release_date);
    release_date.appendChild(release_date_data);

    var genre = document.getElementById("genre");
    var genre_data=document.createTextNode(data.genres[0]["name"]+ " , "+data.genres[1]["name"]);
    genre.appendChild(genre_data);

    var synopsis = document.getElementById("synopsis");
    var synopsis_data =document.createTextNode(data.overview);
    synopsis.appendChild(synopsis_data);

    getJSON("http://api.themoviedb.org/3/movie/"+parts[1]+"/credits?api_key=11f47f644c4ac312a64a760d25516450").then(function(new_data){
    var cast = document.getElementById("cast");
    var i = 0;
    var text=" "+new_data.cast[0]["name"];
    for(i=0;i<6;i++)
    {
        text=text + ", "+new_data.cast[i]["name"];
    }
    var cast_data=document.createTextNode(text);
    cast.appendChild(cast_data);


    var director = document.getElementById("director");
    var reviews = document.getElementById("movie-review");
    },function(status) {
        alert("hi"+status);
    });


    }, function(status) {
        alert(status);
    });
}
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

