const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for uploading an image
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Process and resize the uploaded image using sharp
        const imagePath = req.file.path;
        const resizedImagePath = path.join(__dirname, 'public', 'uploads', 'resized-image.jpg'); // Change the filename and path as needed

        await sharp(imagePath)
            .resize({ width: 300, height: 300 }) // Adjust dimensions as needed
            .toFile(resizedImagePath);

        // Delete the original uploaded image
        fs.unlinkSync(imagePath);

        // Send a response with the URL of the resized image
        res.json({ resizedImageUrl: '/uploads/resized-image.jpg' }); // Change the URL path as needed
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

