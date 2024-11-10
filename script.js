const brightnessSaturation = document.getElementById('brightnessSaturation');
const bsSelector = document.getElementById('bsSelector');
const colorPreview = document.getElementById('colorPreview');
const hueSlider = document.getElementById('hueSlider');
const saturationSlider = document.getElementById('saturationSlider');
const brightnessSlider = document.getElementById('brightnessSlider');

// Set initial values for hue, saturation, and brightness
let hue = hueSlider.value = 0;          // Set hue to default 0 (red)
let saturation = saturationSlider.value = 100; // Set saturation to full
let brightness = brightnessSlider.value = 100; // Set brightness to full

// Update the color preview, slider backgrounds, brightness-saturation square, and picker position
function updateColor() {
    const color = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
    colorPreview.style.backgroundColor = color;

    // Update the brightness-saturation square background to reflect the current hue
    brightnessSaturation.style.background = `
        linear-gradient(to top, black, transparent),
        linear-gradient(to right, white, hsl(${hue}, 100%, 50%))
    `;

    // Update saturation slider background to match the initial or current hue
    saturationSlider.style.background = `linear-gradient(to right, hsl(${hue}, 0%, 50%), hsl(${hue}, 100%, 50%))`;

    // Update brightness slider background to match the hue and saturation
    brightnessSlider.style.background = `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 100%))`;

    // Update the position of the picker in the brightness-saturation square based on saturation and brightness values
    const rect = brightnessSaturation.getBoundingClientRect();
    bsSelector.style.left = `${(saturation / 100) * rect.width - 5}px`;
    bsSelector.style.top = `${(1 - brightness / 100) * rect.height - 5}px`;
}

// Handle hue slider interaction
hueSlider.addEventListener('input', (event) => {
    hue = event.target.value;
    updateColor();
});

// Handle brightness-saturation square interaction
brightnessSaturation.addEventListener('mousedown', (event) => {
    handleBrightnessSaturationInteraction(event);
    document.addEventListener('mousemove', handleBrightnessSaturationInteraction);
});

// Remove mousemove event on mouseup
document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', handleBrightnessSaturationInteraction);
});

// Handle interaction with the brightness-saturation square
function handleBrightnessSaturationInteraction(event) {
    const rect = brightnessSaturation.getBoundingClientRect();
    saturation = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
    brightness = Math.min(100, Math.max(0, 100 - ((event.clientY - rect.top) / rect.height) * 100));

    saturationSlider.value = saturation;
    brightnessSlider.value = brightness;
    updateColor();
}

// Event listeners for the saturation and brightness sliders
saturationSlider.addEventListener('input', (event) => {
    saturation = event.target.value;
    updateColor();
});

brightnessSlider.addEventListener('input', (event) => {
    brightness = event.target.value;
    updateColor();
});

// Initialize color with default values on page load
updateColor();
