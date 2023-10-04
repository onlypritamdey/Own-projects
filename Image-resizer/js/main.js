
// DOM elements
const uploadForm = document.getElementById('upload-form');
const imageInput = document.getElementById('image-input');
const resizeButton = document.getElementById('resize-button');
const widthInput = document.getElementById('width-input');
const heightInput = document.getElementById('height-input');
const resizedImageContainer = document.getElementById('resized-image-container');

// Event listener for form submission (image upload)
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);

    try {
        // Send the image data to the server for processing
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            const resizedImageUrl = data.resizedImageUrl;

            // Display the resized image
            resizedImageContainer.innerHTML = `<img src="${resizedImageUrl}" alt="Resized Image">`;
        } else {
            resizedImageContainer.innerHTML = 'Image could not be resized.';
        }
    } catch (error) {
        console.error(error);
        resizedImageContainer.innerHTML = 'An error occurred while processing the image.';
    }
});

// Event listener for resizing the image (optional)
resizeButton.addEventListener('click', () => {
    // You can add client-side resizing logic here if needed
});
