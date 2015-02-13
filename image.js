function show() {
    getJSON("http://api.themoviedb.org/3/movie/top_rated?api_key=11f47f644c4ac312a64a760d25516450").then(function(data) {
    document.getElementById("abc").src= "http://image.tmdb.org/t/p/w500"+data.results[0]["poster_path"];
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
