$(document).ready(function () {
  var apikey = "1cc4f198";

  // Display favourite movies on page load
  var favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites.forEach(function (movie) {
    var row = `
      <tr>
        <td>${movie.title}</td>
        <td>${movie.year}</td>
        <td>
          <button class="btn btn-danger btn-sm remove-btn" data-id="${movie.id}">Remove</button>
        </td>
      </tr>
    `;
    $("#favourites").append(row);
  });

  $("#moviForm").submit(function (event) {
    event.preventDefault();
    var result = "";
    var movie = $("#movie").val();
    var url = "http://www.omdbapi.com/?apikey=" + apikey;

    $.ajax({
      method: "GET",
      url: url + "&t=" + movie,
      success: function (data) {
        console.log(data);
        result = `
          <img style="float:left; display:block; padding:5px" class="img-thumnail" width=300" height="400" src="${data.Poster}"/>
          <div style="display:flex;flex-direction:column;justify-content:center">
            <p><span style="color:red;">Relaese Date -</span> ${data.Released}</p>
            <br><p><span style="color:red;">Tiltle-</span> ${data.Title}</p>
            <br><p><span style="color:red;">Year-</span> ${data.Year}</p>
            <br><p><span style="color:red;">Country-</span> ${data.Country}</p>
            <br><p><span style="color:red;">Writer -</span> ${data.Writer}</p>
            <br><p><span style="color:red;">Plot -</span> ${data.Plot}</p>
            <br><button class="btn btn-primary btn-sm add-btn" data-id="${data.imdbID}">Add to Favourites</button>
          </div>
        `;
        $("#result").html(result);
      },
    });
  });

  // Add to Favourites button click event
  $(document).on("click", ".add-btn", function () {
    var id = $(this).data("id");
    var title = $("#result p:nth-of-type(2)").text();
    var year = $("#result p:nth-of-type(3)").text();

    var movie = {
      id: id,
      title: title,
      year: year,
    };

    var favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    favourites.push(movie);
    localStorage.setItem("favourites", JSON.stringify(favourites));

    var row = `
      <tr>
        <td>${title}</td>
        <td>${year}</td>
        <td>
          <button class="btn btn-danger btn-sm remove-btn" data-id="${id}">Remove</button>
        </td>
      </tr>
    `;
    $("#favourites").append(row);
  });

  // Remove from Favourites button click event
  $(document).on("click", ".remove-btn", function () {
    var id = $(this).data("id");
    var favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    favourites = favourites.filter(function (movie) {
      return movie.id !== id;
    });
    localStorage.setItem("favourites", JSON.stringify(favourites));

    $(this).closest("tr").remove();
  });

  var home = document.getElementById("home");
  home.addEventListener('click',function(){
    location.reload();
  });
});
