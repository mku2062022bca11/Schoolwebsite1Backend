const Gallery = require("../Models/Gallery");
const fs = require("fs");
const path = require("path");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { category, title = "Untitled", description = "" } = req.body;

    if (!category) {
        return res.status(400).json({ message: "Category is required" });
    }

    // Create direct link URL for the uploaded image dynamically
    const protocol = req.protocol;
    const host = req.get('host');
    const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    const validFormats = ['.jpg', '.jpeg', '.png', '.webp'];
    const fileExtension = path.extname(req.file.filename).toLowerCase();

    if (!validFormats.includes(fileExtension)) {
        return res.status(400).json({ message: "Invalid file format" });
    }

    const newImage = new Gallery({
      title: title || "Untitled",
      description: description || "",
      category,
      imageUrl: imageUrl // Use direct link instead of relative path
    });

    await newImage.save();

    res.json(newImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Fetching failed" });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Optionally, delete the image file from the uploads directory
    const imagePath = path.join(__dirname, "../uploads", path.basename(image.imageUrl));
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Failed to delete image file:", err);
    });

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Deletion failed" });
  }
};

module.exports = { uploadImage, getImages, deleteImage };
