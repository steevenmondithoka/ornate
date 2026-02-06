const Gallery = require('../models/Gallery');

exports.addToGallery = async (req, res) => {
  const { type, caption, youtubeUrl } = req.body;
  let url = "";

  try {
    if (type === 'video') {
      // Logic to extract YouTube Video ID
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = youtubeUrl.match(regExp);
      url = (match && match[2].length === 11) ? match[2] : null;
      
      if (!url) return res.status(400).json({ message: "Invalid YouTube URL" });
    } else {
      // Photo URL from Cloudinary (Multer middleware)
      url = req.file.path;
    }

    const item = await Gallery.create({ type, url, caption });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin only: Delete Gallery Item
exports.deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Note: If you want to delete the image from Cloudinary as well, 
    // you would use cloudinary.uploader.destroy() here using the public_id.
    
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Media removed from gallery" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};