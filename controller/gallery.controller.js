import express from "express";
const recieveInstagramPost=(req,res)=>{
    try{
        const{image,caption,link, timestamp}=req.body;
        const newPost={
            id:Date.now(),
            image,
            caption,
            link,
            timestamp
        };
        console.log("New Instagram Post:",newPost);
        res.status(200).json({message:"Instagram Post recieved successfully",post:newPost});

    }catch(error){
        console.error("Error processing Instagram post:",error);
        res.status(500).json({error:"Failed to fetch Instagram post"});
    }

}
export default recieveInstagramPost;