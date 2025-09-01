const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadImage, getImages, deleteImage } = require("../Controllers/galleryController");

const router = express.Router();

// multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // files will go into /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage });

// routes
router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getImages);

router.delete("/:id", deleteImage);

module.exports = router;
