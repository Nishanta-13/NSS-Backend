import express from "express";

const recieveInstagramPost = (req, res) => {
    try {
        const {
            media_url,
            thumbnail_url,
            permalink,
            caption,
            timestamp,
            media_type
        } = req.body;

        const newPost = {
            id: Date.now(),
            image: media_url || thumbnail_url, 
            caption: caption || "",
            link: permalink,
            timestamp,
            type: media_type
        };

        console.log("New Instagram Post:", newPost);

        res.status(200).json({
            message: "Instagram Post received successfully",
            post: newPost
        });

    } catch (error) {
        console.error("Error processing Instagram post:", error);
        res.status(500).json({ error: "Failed to fetch Instagram post" });
    }
};

export default recieveInstagramPost;