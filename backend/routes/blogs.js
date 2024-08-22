const router = require("express").Router();
const blogs = require("../models/blogs");

router.post('/post', async (req, res) => {
    try {
        const { title, desc, authorId } = req.body;
        const newPost = new blogs({ title, desc, authorId });
        await newPost.save();
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Some error occurred' });
    }
});
router.get("/getall",async (req,res)=>{
    try {
       
       const data = await blogs.find().sort({createdAt:-1});
        res.status(200).json({data: data});

    } catch (error) {
        res.status(400).json({message:"some error ioccurs"})
    }
})
//get recent blogs
router.get("/getrecentblogs",async (req,res)=>{
    try {
       
       const data = await blogs.find().sort({createdAt:-1}).limit(3);
        res.status(200).json({data: data});
    } catch (error) {
        res.status(400).json({message:"some error ioccurs"})
    }
})
//get blog by id
router.get("/getblog/:id",async (req,res)=>{
    try {
       const {id} = req.params;
       const data = await blogs.findById(id);
        res.status(200).json({data: data});

    } catch (error) {
        res.status(400).json({message:"some error ioccurs"})
    }
})
//get update by id
router.put("/updateblog/:id",async (req,res)=>{
    try {
       const {id} = req.params;
       const{title,desc} = req.body;
       await blogs.findByIdAndUpdate(id ,{title,desc});
        res.status(200).json({message: "data update sucessfully"});

    } catch (error) {
        res.status(400).json({message:"some error ioccurs"})
    }
})

module.exports = router;