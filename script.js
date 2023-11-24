document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');

    // Create the initial canvas grid
    for (let i = 0; i < 10000; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mouseover', drawPixel);
        canvas.appendChild(pixel);
    }

    function drawPixel(event) {
        const selectedColor = 'red'; // Change this to allow different colors
        event.target.style.backgroundColor = selectedColor;
    }
});
