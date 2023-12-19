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
  
        rows.forEach(row => {
          const values = row.split(',');
  
          if (values.length >= 7) {
            const date = values[0].trim();
            const name = values[1].trim();
            const year = values[2].trim();
            const rating = values[4].trim();
            const tags = values[6].trim();
  
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
  