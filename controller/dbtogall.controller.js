import eventSchema from '../model/posts.model.js';
export const getAllEvents= async (req,res)=>{
    try{
        const events=await eventSchema.find().sort({_id:-1});
        res.status(200).json(events);
    }catch(error){
        res.status(500).json({message:"Error fetching posts"});
    }
};