import express from "express";

const receiveInstagramPost = (req, res) => {
  try {
    // Handle webhook verification (GET) - respond with the challenge if provided
    if (req.method === "GET") {
      const challenge = req.query?.["hub.challenge"] || req.query?.hub_challenge;
      if (challenge) return res.status(200).send(challenge);
      return res.status(400).send("No challenge provided");
    }

    // Ensure body exists before destructuring
    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      console.warn("Empty request body received for Instagram post", { headers: req.headers });
      return res.status(400).json({ error: "Empty request body" });
    }

    // Support nested webhook payload shapes (entry -> changes -> value or messaging)
    let payload = body;
    if (body.entry && Array.isArray(body.entry) && body.entry.length) {
      const entry = body.entry[0];
      const change = entry.changes && entry.changes[0];
      if (change && change.value) payload = change.value;
      else if (entry.messaging && entry.messaging[0]) payload = entry.messaging[0];
    } else if (body.data) {
      payload = body.data;
    }

    // Safe destructure from the resolved payload
    const {
      media_url,
      thumbnail_url,
      permalink,
      caption,
      timestamp,
      media_type
    } = payload || {};

    // If there is no media data, respond with 400
    if (!media_url && !thumbnail_url && !permalink) {
      console.warn("Payload does not contain expected media fields", payload);
      return res.status(400).json({ error: "No media data in payload" });
    }

    const newPost = {
      id: Date.now(),
      image: media_url || thumbnail_url || null,
      caption: caption || "",
      link: permalink || null,
      timestamp: timestamp || new Date().toISOString(),
      type: media_type || "UNKNOWN"
    };

    console.log("New Instagram Post:", newPost);

    return res.status(200).json({
      message: "Instagram Post received successfully",
      post: newPost
    });
  } catch (error) {
    console.error("Error processing Instagram post:", error);
    return res.status(500).json({ error: "Failed to process Instagram post" });
  }
};

export default receiveInstagramPost;