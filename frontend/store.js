document.getElementById('storeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const word = document.getElementById('word').value;
    const definition = document.getElementById('definition').value;

    if (!word.trim() || !definition.trim()) {
        alert('Both word and definition must be provided.');
        return;
    }

    fetch('http://localhost:3000/api/definitions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, definition }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').textContent = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').textContent = 'An error occurred.';
    });
});
