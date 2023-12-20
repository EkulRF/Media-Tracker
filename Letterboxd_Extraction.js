document.addEventListener('DOMContentLoaded', function () {
  fetch('letterboxd-data/diary.csv')
      .then(response => response.text())
      .then(csv => {
          const rows = csv.split('\n');
          const ratings = []; // Array to store ratings for the histogram

          // Assuming the first row is a header, skip it
          rows.shift();

          const timelineList = document.getElementById('timeline-list');

          rows.forEach(row => {
              const values = row.split(',');

              if (values.length >= 7) {
                  const rating = parseFloat(values[4].trim()); // Parse rating as a float

                  // Add rating to the array
                  if (!isNaN(rating)) {
                      ratings.push(rating);
                  }

                  const date = values[0].trim();
                  const name = values[1].trim();
                  const year = values[2].trim();
                  const tags = values[6].trim();

                  // Fetch the movie poster using TMDB API
                  searchMovie(name, date, year, tags);
              }
          });

          // Create the histogram
          createHistogram(ratings);
      })
      .catch(error => console.error('Error fetching CSV:', error));
});

function searchMovie(movieName, date, year, tags) {
  const apiKey = '4fad2cdfc5ea0c55513d2d7cbe65f25e'; // Replace with your TMDB API key

  // Make a request to TMDB API
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`)
      .then(response => response.json())
      .then(data => {
          // Check if there are results
          if (data.results.length > 0) {
              const posterPath = data.results[0].poster_path;
              const posterUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`;

              // Create a timeline item with the movie poster
              const listItem = document.createElement('li');
              listItem.innerHTML = `
                  <div class="info">
                      <img src="${posterUrl}" alt="${movieName} Poster">
                      <time>${date}</time> ${movieName} (${year}) - Rating: ${rating} - Tags: ${tags}
                  </div>
              `;

              timelineList.appendChild(listItem);
          } else {
              // Create a timeline item without the movie poster if no results are found
              const listItem = document.createElement('li');
              listItem.innerHTML = `
                  <div class="info">
                      <time>${date}</time> ${movieName} (${year}) - Rating: ${rating} - Tags: ${tags}
                  </div>
              `;

              timelineList.appendChild(listItem);
          }
      })
      .catch(error => console.error('Error fetching data:', error));
}