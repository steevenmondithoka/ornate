const express = require('express');
const router = express.Router();
const { addToGallery, getGallery,deleteGalleryItem } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getGallery);
// For photos: uses upload middleware. For videos: receives YouTube URL in body.
router.post('/', protect, upload.single('image'), addToGallery);
router.delete('/:id', protect, deleteGalleryItem); // Add this line
module.exports = router;