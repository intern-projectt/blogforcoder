const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const SECRET_KEY = 'super-secret-key';

app.use(cors());

// REGISTER
// POST REGISTER
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Error signing up' });
    }
});

// GET Registered Users
router.get('/register', async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Unable to get users' });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        console.log("userId", user._id)
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });

        // Include user details and token in the response
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
                // Include any other user details you need
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;
