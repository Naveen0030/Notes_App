
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { authenticateToken } = require("./utilities");

const app = express();
const port = process.env.PORT || 8000;

// Use MongoDB connection from environment variable
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Import models
const User = require("./modals/user.modal");
const Note = require("./modals/note.modal");

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data: "hello darling" });
});

// Backend Ready!!!

// Create Account
app.post("/create-account", async (req,res) => {
    try {
        const { fullName, email, password } = req.body;

        if(!fullName || !fullName.trim()){
            return res.status(400).json({ error: true, message: "Full Name is Required!!"});
        }
        if(!email || !email.trim()){
            return res.status(400).json({ error: true, message: "Email is Required!!"});
        }
        if(!password || password.length < 6){
            return res.status(400).json({ error: true, message: "Password must be at least 6 characters long!!"});
        }

        // Check if user already exists
        const isUser = await User.findOne({ email: email.trim().toLowerCase() });
        if(isUser){
            return res.status(409).json({
                error: true,
                message: "User Already Exists",
            });
        }

        const user = new User({
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            password,
        });

        await user.save();

        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : "36000m",
        });
        
        return res.status(201).json({
            error: false,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                createdOn: user.createdOn
            },
            accessToken,
            message: "Registration Successful",
        });
    } catch (error) {
        console.error("Signup error:", error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: true, 
                message: "Validation error. Please check your input." 
            });
        }
        
        if (error.code === 11000) {
            return res.status(409).json({ 
                error: true, 
                message: "An account with this email already exists." 
            });
        }
        
        return res.status(500).json({ 
            error: true, 
            message: "Internal server error. Please try again later." 
        });
    }
});

// Login Account
app.post("/login", async (req,res) => {
    const { email, password } = req.body;
    if(!email){
        return res.status(400).json({message: "Email is Required!!"});
    }
    if(!password){
        return res.status(400).json({message: "Password is Required!!"});
    }

    const userInfo = await User.findOne({ email:email});

    if(!userInfo) {
        return res.status(400).json({message: "User not found"});
    }

    if(userInfo.email === email && userInfo.password == password){
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });
        return res.json({
            error: false,
            message: "Login SuccessFul",
            email,
            accessToken,
        });
    }else{
       return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
       }) ;
    }
});

// Get User
app.get("/get-user",authenticateToken, async (req,res) => {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id});
    if(!isUser){
        return res.sendStatus(401);
    }

    return res.json({
        user : {fullName: isUser.fullName, email: isUser.email, "_id": isUser._id, createdOn: isUser.createdOn},
        message: ""
    });
});

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
    const {title, content, tags } = req.body;
    const { user } = req.user;
    if(!title){
       return res.status(400).json({ error:true, message: "Title is Required!!"});
    }
    if(!content){
        return res.status(400).json({ error:true, message: "Content is Required!!"});
    }
    
    try{
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();
        return res.json({
            error:false,
            message:"Note added Successfully",
            note,
        });
    }catch(error){
        return res.status(500).json({
            error:true,
            message: "Internal server Error",
        });
    }
});

// Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags , isPinned} = req.body;
    const { user } = req.user;

    if(!title && !content && !tags){
        return res.status(400).json({error:true, message: "No Changes Provided!!"});
    }

    try{
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if(!note){
            return res.status(400).json({
                error:true, message: "Note not found"
            });
        }
        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();
        return res.json({
            error: false,
            note,
            message: " Note Updated Successfully!!",
        });
    }catch(error){
        return res.status(500).json({
            error:true,
            message: "Internal server Error",
        });
    }
});

// Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;
     try{
        const notes = await Note.find({ userId : user._id}).sort({ isPinned: -1});

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved Successfully",
        });
     }catch (error){
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
     }
});

// Delete a Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try{
        const note = await Note.findOne({ _id: noteId, userId: user._id});

        if(!note){
            return res.status(404).json({
                error:true,
                message: "Note not found"
            });
        }
        await Note.deleteOne({ _id: noteId, userId: user._id});

        return res.json({
            erre:false,
            message: "DEleted Succesfully",
        });
    }catch (error){
        return res.status(500).json({
            error:true,
            message: "Internal Server error",
        });
    }
});

// Update isPinned Value
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned} = req.body;
    const { user } = req.user;

    try{
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if(!note){
            return res.status(400).json({
                error:true, message: "Note not found"
            });
        }
        note.isPinned = isPinned;

        await note.save();
        return res.json({
            error: false,
            note,
            message: " Note Pinned Successfully!!",
        });
    }catch(error){
        return res.status(500).json({
            error:true,
            message: "Internal server Error",
        });
    }
});

// Search Notes
app.get("/search-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if(!query){
        return res.status(400).json({error:true, message: "Search query is required!"});
    }

    try{
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [{ title: { $regex: new RegExp(query, "i")}},
                { content: { $regex: new RegExp(query, "i")}},
            ],
        });

        return res.json({
            error:false,
            notes: matchingNotes,
            message: "Notes matching found",
        });

    }catch (error){
        return res.status(500).json({
            error:true,
            message: "Internal Server error",
        });
    }
});


app.listen(port , () =>{
    console.log(`Listening in port : ${port}`);
});

module.exports = app;