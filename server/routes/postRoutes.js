import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
});

router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        console.log("Received request data:", name, prompt);

        const photoUrl = await cloudinary.uploader.upload(photo);
        console.log("Uploaded photo URL:", photoUrl.url);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });
        console.log("New post created:", newPost);

        res.status(200).json({
            success: true,
            data: newPost
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, message: 'unable to post' });
    }
});

export default router;