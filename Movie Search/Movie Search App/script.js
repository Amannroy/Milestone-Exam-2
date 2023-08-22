const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const movieDetails = document.getElementById("movieDetails");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
        fetchMovieData(searchTerm);
    }
});

async function fetchMovieData(searchTerm) {
    const apiKey = "My OMDB API key"; 
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayMovieResults(data.Search);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayMovieResults(results) {
    if (results) {
        movieDetails.innerHTML = "";
        results.forEach(movie => {
            const { Title, Year, Poster, imdbID } = movie;
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <h2>${Title} (${Year})</h2>
                <div class="details-content">
                    <div class="poster">
                        <img src="${Poster}" alt="${Title} Poster">
                    </div>
                    <div class="watch-now">
                        <a href="https://www.imdb.com/title/${imdbID}" target="_blank" class="watch-button">Watch Now</a>
                    </div>
                </div>
            `;
            movieDetails.appendChild(movieCard);
        });
        movieDetails.style.display = "block";
    } else {
        movieDetails.innerHTML = "<p>No movies found</p>";
        movieDetails.style.display = "block";
    }
}

