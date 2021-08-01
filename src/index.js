import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// $(console.log("Hello World"));
// const xhr = new XMLHttpRequest(),
//     method = "GET",
//     url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`;
let response = null;
let request = new XMLHttpRequest();

$(document).ready(function () {
  const trend = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}`;
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      response = JSON.parse(this.responseText);
      $("#gifs").prepend(`<img src = ${response.data[0].images.original.url} width="500" height="500">`);
    }
  };

  request.open("GET", trend, true);
  request.send();
  $("button#randy").click(function () {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`;
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        response = JSON.parse(this.responseText);
        console.log(response.data.image_url);
        $("#gifs").prepend(`<img src = ${response.data.image_url} width="500" height="500">`);
      }
    };

    request.open("GET", url, true);
    request.send();

  });

  $("button#search").click(function () {
    let search = $("input#gifSearch").val();
    const link = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.API_KEY}`;
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        response = JSON.parse(this.responseText);
        console.log(response.data[0].images.original.url);
        $("#gifs").prepend(`<img src = ${response.data[0].images.original.url} width="500" height="500">`);
      }
    };

    request.open("GET", link, true);
    request.send();

  });

});


