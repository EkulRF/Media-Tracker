document.addEventListener('DOMContentLoaded', function () {
    // Replace 'your-data.csv' with the path to your CSV file
    fetch('letterboxd-data/diary.csv')
      .then(response => response.text())
      .then(csv => {
        const rows = csv.split('\n');
        const timelineList = document.getElementById('timeline-list');
  
        rows.forEach(row => {
          const columns = row.split('\t'); // Assuming the columns are separated by tabs ('\t')
  
          if (columns.length >= 7) { // Adjust the index based on the number of columns in your CSV
            const date = columns[0].trim();
            const name = columns[1].trim();
            const year = columns[2].trim();
            const letterboxdUri = columns[3].trim();
            const rating = columns[4].trim();
            const rewatch = columns[5].trim();
            const tags = columns[6].trim();
            const watchedDate = columns[7].trim();
  
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <div>
                <time>${date}</time> ${name} (${year}) - Rating: ${rating} - Tags: ${tags}
              </div>
            `;
  
            timelineList.appendChild(listItem);
          }
        });
      })
      .catch(error => console.error('Error fetching CSV:', error));
  });