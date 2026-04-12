import Event from "../model/posts.model.js";

const receiveInstagramPost = async (req, res) => {
  try {

    if (req.method === "GET") {
      const challenge = req.query?.["hub.challenge"] || req.query?.hub_challenge;
      if (challenge) return res.status(200).send(challenge);
      return res.status(400).send("No challenge provided");
    }

    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error: "Empty request body" });
    }

    let payload = body;

    if (body.entry?.length) {
      payload = body.entry[0]?.changes?.[0]?.value || payload;
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

    if (!media_url && !thumbnail_url) {
      return res.status(400).json({ error: "No media data" });
    }

    const allowedHashtags = ["#NSS", "#SiteFlow", "#Event"];

    const isAllowed = allowedHashtags.some(tag =>
      caption?.toLowerCase().includes(tag.toLowerCase())
    );

    if (!isAllowed) {
      console.log("Ignored post:", caption);
      return res.status(200).json({
        message: "Post ignored (hashtag filter)"
      });
    }

    const getEventType = (caption) => {
      if (!caption) return "Instagram";

      caption = caption.toLowerCase();

      if (caption.includes("donation")) return "Donation drive";
      if (caption.includes("awareness")) return "Awareness";
      if (caption.includes("clean")) return "Cleanliness Drive";

      return "Instagram";
    };

    const newPost = new Event({
      title: caption || "Instagram Event",
      content: caption || "",
      imgUrl: media_type === "VIDEO"
        ? thumbnail_url
        : media_url,
      year: new Date(timestamp).getFullYear(),
      date: new Date(timestamp).toLocaleString("en-US", {
        month: "long",
        year: "numeric"
      }),
      event_type: getEventType(caption),
      instagramUrl: permalink
    });

    await newPost.save();

    console.log("Saved to DB:", newPost);

    return res.status(200).json({
      message: "Instagram Post saved successfully",
      post: newPost
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to process Instagram post" });
  }
};

export default receiveInstagramPost;