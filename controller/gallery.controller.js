const receiveInstagramPost = (req, res) => {
  try {

    if (req.method === "GET") {
      const challenge = req.query?.["hub.challenge"] || req.query?.hub_challenge;
      if (challenge) return res.status(200).send(challenge);
      return res.status(400).send("No challenge provided");
    }

    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      console.warn("Empty request body", { headers: req.headers });
      return res.status(400).json({ error: "Empty request body" });
    }

    let payload = body;
    if (body.entry && Array.isArray(body.entry) && body.entry.length) {
      const entry = body.entry[0];
      const change = entry.changes && entry.changes[0];
      if (change && change.value) payload = change.value;
      else if (entry.messaging && entry.messaging[0]) payload = entry.messaging[0];
    } else if (body.data) {
      payload = body.data;
    }

    const {
      media_url,
      thumbnail_url,
      permalink,
      caption,
      timestamp,
      media_type
    } = payload || {};

    if (!media_url && !thumbnail_url && !permalink) {
      console.warn("No media data", payload);
      return res.status(400).json({ error: "No media data in payload" });
    }
    const allowedHashtags = ["#NSS", "#SiteFlow", "#Event"];

    const isAllowed = allowedHashtags.some(tag =>
      caption?.toLowerCase().includes(tag.toLowerCase())
    );

    if (!isAllowed) {
      console.log("❌ Ignored post:", caption);
      return res.status(200).json({
        message: "Post ignored (hashtag filter)"
      });
    }

    const newPost = {
      id: Date.now(),
      image: media_type === "VIDEO"
        ? (thumbnail_url || media_url)
        : media_url,
      caption: caption || "",
      link: permalink || null,
      timestamp: timestamp || new Date().toISOString(),
      type: media_type || "UNKNOWN"
    };

    console.log("✅ Saved Instagram Post:", newPost);

    return res.status(200).json({
      message: "Instagram Post received successfully",
      post: newPost
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to process Instagram post" });
  }
};