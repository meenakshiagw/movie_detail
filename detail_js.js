function details(){

  var parts = window.location.href.split('?')[1].split('=');
  image_interval(parts[1]);
  getJSON("http://api.themoviedb.org/3/movie/"+parts[1]+"?api_key=11f47f644c4ac312a64a760d25516450&append_to_response=trailers").then(function(data) {
    

    document.getElementById("trailer").addEventListener("click", function(){
        window.location.href="https://www.youtube.com/watch?v="+data.trailers.youtube[0]["source"];
    });

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

    getJSON("http://api.themoviedb.org/3/movie/"+parts[1]+"/credits?api_key=11f47f644c4ac312a64a760d25516450").then(function(data){
        var cast = document.getElementById("cast");
        var i = 0;
        var text=" "+data.cast[0]["name"];
        for(i=0;i<6;i++)
        {
            text=text + ", "+data.cast[i]["name"];
        }
        var cast_data=document.createTextNode(text);
        cast.appendChild(cast_data);

        getJSON("http://api.themoviedb.org/3/movie/"+parts[1]+"/reviews?api_key=11f47f644c4ac312a64a760d25516450").then(function(data){
           
            var review = document.getElementById("review");

            var i;
            var author_div;
            var content_div;
            var author_h5;
            var content_h5;
            var  content_data_p;
            var author_data_p;
            var max_length=250;
            var value=[];
            value[0]="More";
            value[1]="Less";
            var original_content;
            var button;
            if(data.results[0] == undefined)
            {
                var h5=document.createElement("h5");
                h5.textContent="No Reviews";
                review.appendChild(h5);
            }
            else
            {
            for(i=0; i<4; i++)
            {
                if(data.results[i]==undefined)
                    return;
                author_div= document.createElement("div");
                content_div= document.createElement("div");

                author_h5= document.createElement("h5");
                content_h5= document.createElement("h5");


                author_h5.textContent="Author: ";
                content_h5.textContent="Content: ";


                content_data_p=document.createElement("p");
                content_data_p.setAttribute('class','author_content_span');
                original_content=data.results[i]["content"];

                content_div.appendChild(content_h5);
                content_div.appendChild(content_data_p); 
                if(original_content.length > max_length)
                {
                    content_data_p.textContent=original_content.substr(0,max_length-3)+"...";
                    button=document.createElement("button");
                    button.setAttribute('class','button btn');
                    button.textContent="Read more";
                    content_div.appendChild(button);
                    button.addEventListener("click", function(){
                     
                        if(button.textContent === "Read more")
                        {
                            button.textContent="Read less";
                            content_data_p.textContent=original_content;
                        }
                        else
                        {
                            button.textContent="Read more";
                            content_data_p.textContent=original_content.substr(0,max_length-3)+"...";
                        }
                        
                    });
                }
                else
                    content_data_p.textContent=original_content;

                author_data_p=document.createElement("p");
                author_data_p.setAttribute('class','author_content_span');
                author_data_p.textContent=data.results[i]["author"];

                review.appendChild(author_div);
                review.appendChild(content_div);

                author_div.appendChild(author_h5);
                author_div.appendChild(author_data_p);

               }              

            }
            

        },function(status) {
            alert("hi"+status);
        });

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

var x=0;
var images =[];
function displayNextImage(){
 x = (x === images.length - 1) ? 0 : x + 1;
 document.getElementById("movie-poster").src = "http://image.tmdb.org/t/p/w500"+images[x];
}
function image_interval(id) {
    getJSON("http://api.themoviedb.org/3/movie/"+id+"/images?api_key=11f47f644c4ac312a64a760d25516450").then(function(data){
        for (i=0;i<data.backdrops.length;i++)
        {
            images[i]=data.backdrops[i]["file_path"];
        }
        document.getElementById("movie-poster").src = "http://image.tmdb.org/t/p/w500"+images[x];
        setInterval(displayNextImage, 4000);
    }, function(status) {
        alert(status);
    });
}

