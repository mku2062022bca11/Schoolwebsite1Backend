const express = require("express");
const dotenv = require("dotenv");
const cors =require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
const galleryRoutes = require("./Routes/galleryRoutes"); // Import gallery routes

dotenv.config();
// middleware
 





connectDB();


const app = express();
app.use(express.json());
 
app.use(cors({
    origin: [ 'https://schoolwebsite1frontend-0512.onrender.com', 'http://localhost:5173'],
    credentials: true
}))
// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));
// routes
app.use("/api/users", userRoutes);
app.use("/api/gallery", galleryRoutes); // Mount gallery routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
