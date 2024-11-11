function setupColorPicker(pickerId, hueId, saturationId, brightnessId, previewId, bsSelectorId) {
    const brightnessSaturation = document.getElementById(pickerId);
    const bsSelector = document.getElementById(bsSelectorId);
    const colorPreview = document.getElementById(previewId);
    const hueSlider = document.getElementById(hueId);
    const saturationSlider = document.getElementById(saturationId);
    const brightnessSlider = document.getElementById(brightnessId);

    let hue = 0, saturation = 100, brightness = 100;

    function updateColor() {
        const color = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        colorPreview.style.backgroundColor = color;
        brightnessSaturation.style.background = `
            linear-gradient(to top, black, transparent),
            linear-gradient(to right, white, hsl(${hue}, 100%, 50%))
        `;
        saturationSlider.style.background = `linear-gradient(to right, hsl(${hue}, 0%, 50%), hsl(${hue}, 100%, 50%))`;
        brightnessSlider.style.background = `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 100%))`;
        const rect = brightnessSaturation.getBoundingClientRect();
        bsSelector.style.left = `${(saturation / 100) * rect.width - 5}px`;
        bsSelector.style.top = `${(1 - brightness / 100) * rect.height - 5}px`;
    }

    hueSlider.addEventListener('input', (event) => {
        hue = event.target.value;
        updateColor();
    });

    brightnessSaturation.addEventListener('mousedown', (event) => {
        handleBrightnessSaturationInteraction(event);
        document.addEventListener('mousemove', handleBrightnessSaturationInteraction);
    });

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleBrightnessSaturationInteraction);
    });

    function handleBrightnessSaturationInteraction(event) {
        const rect = brightnessSaturation.getBoundingClientRect();
        saturation = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
        brightness = Math.min(100, Math.max(0, 100 - ((event.clientY - rect.top) / rect.height) * 100));
        saturationSlider.value = saturation;
        brightnessSlider.value = brightness;
        updateColor();
    }

    saturationSlider.addEventListener('input', (event) => {
        saturation = event.target.value;
        updateColor();
    });

    brightnessSlider.addEventListener('input', (event) => {
        brightness = event.target.value;
        updateColor();
    });

    updateColor();
}

setupColorPicker('brightnessSaturation1', 'hueSlider1', 'saturationSlider1', 'brightnessSlider1', 'colorPreview1', 'bsSelector1');
setupColorPicker('brightnessSaturation2', 'hueSlider2', 'saturationSlider2', 'brightnessSlider2', 'colorPreview2', 'bsSelector2');

document.querySelector('.next-button').addEventListener('click', () => {
    const baseColor = window.getComputedStyle(document.getElementById('colorPreview1')).backgroundColor;
    const lightColor = window.getComputedStyle(document.getElementById('colorPreview2')).backgroundColor;
    const intensity = document.getElementById('intensitySlider').value;

    const rgbToHex = (rgb) => {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    };

    sessionStorage.setItem('baseColor', rgbToHex(baseColor));
    sessionStorage.setItem('lightColor', rgbToHex(lightColor));
    sessionStorage.setItem('intensity', intensity);
});
