document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    let selectedColor = colors[0]; // Default color

    // Create color picker
    const colorPicker = document.getElementById('color-picker');
    colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color');
        colorDiv.id = color;
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener('click', () => selectColor(color));
        colorPicker.appendChild(colorDiv);
    });

    // Load the drawing from the gist
    loadDrawing();

    // Create the initial canvas grid
    for (let i = 0; i < 10000; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mouseover', drawPixel);
        canvas.appendChild(pixel);
    }

    function drawPixel(event) {
        const index = Array.from(canvas.children).indexOf(event.target);
        const gistId = 'e260ab1fd24d0f76861f5f76d469254c'; // Replace with your gist ID
        const drawingData = getDrawingData();
        
        // Update the gist with the new drawing data
        updateGist(gistId, drawingData);

        event.target.style.backgroundColor = selectedColor;
    }

    function selectColor(color) {
        selectedColor = color;
    }

    function getDrawingData() {
        return Array.from(canvas.children).map(pixel => {
            return pixel.style.backgroundColor || 'white';
        });
    }

    function loadDrawing() {
        const gistId = 'e260ab1fd24d0f76861f5f76d469254c'; // Replace with your gist ID
        fetch(`https://api.github.com/gists/e260ab1fd24d0f76861f5f76d469254c`)
            .then(response => response.json())
            .then(data => {
                const drawingData = JSON.parse(data.files['drawing.json'].content);
                applyDrawing(drawingData);
            })
            .catch(error => console.error('Error loading drawing:', error));
    }

    function applyDrawing(drawingData) {
        const pixels = Array.from(canvas.children);
        drawingData.forEach((color, index) => {
            pixels[index].style.backgroundColor = color;
        });
    }

    function updateGist(gistId, drawingData) {
        const gistUrl = `https://api.github.com/gists/e260ab1fd24d0f76861f5f76d469254c`;
        fetch(gistUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                files: {
                    'drawing.json': {
                        content: JSON.stringify(drawingData),
                    },
                },
            }),
        })
            .then(response => response.json())
            .then(data => console.log('Gist updated successfully:', data))
            .catch(error => console.error('Error updating gist:', error));
    }
});
 
