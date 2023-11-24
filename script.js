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

    // Create the initial canvas grid
    for (let i = 0; i < 10000; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mouseover', drawPixel);
        canvas.appendChild(pixel);
    }

    function drawPixel(event) {
        event.target.style.backgroundColor = selectedColor;
    }

    function selectColor(color) {
        selectedColor = color;
    }
});
