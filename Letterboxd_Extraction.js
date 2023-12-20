document.addEventListener('DOMContentLoaded', function () {
  // Replace 'your-data.csv' with the path to your CSV file
  fetch('diary.csv')
    .then(response => response.text())
    .then(csv => {
      const rows = csv.split('\n');

      // Assuming the first row is a header, skip it
      const header = rows.shift();

      // Sort the rows by date in ascending order
      rows.sort((a, b) => {
        const dateA = new Date(a.split(',')[0].trim());
        const dateB = new Date(b.split(',')[0].trim());
        return dateA - dateB;
      });

      const timelineList = document.getElementById('timeline-list');

      rows.forEach(async row => {
        const values = row.split(',');

        if (values.length >= 7) {
          const date = values[0].trim();
          const name = values[1].trim();
          const year = values[2].trim();
          const rating = values[4].trim();
          const tags = values[6].trim();

          // Make a request to TMDB API to get movie details by name and year
          const tmdbApiKey = '4fad2cdfc5ea0c55513d2d7cbe65f25e';
          const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(name)}&year=${year}`;

          try {
            const tmdbResponse = await fetch(tmdbUrl);
            const tmdbData = await tmdbResponse.json();

            if (tmdbData.results.length > 0) {
              const posterPath = tmdbData.results[0].poster_path;

              // Create a list item with movie details and poster
              const listItem = document.createElement('li');
              listItem.innerHTML = `
                <div>
                  <time>${date}</time> ${name} (${year}) - Rating: ${rating} - Tags: ${tags}
                </div>
                <div class="poster-container">
                  <img src="https://image.tmdb.org/t/p/w185${posterPath}" alt="${name} Poster">
                </div>
              `;

              timelineList.appendChild(listItem);
            }
          } catch (error) {
            console.error('Error fetching TMDB API:', error);
          }
        }
      });
    })
    .catch(error => console.error('Error fetching CSV:', error));
});
