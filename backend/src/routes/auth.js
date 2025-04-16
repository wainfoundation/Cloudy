const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Pi Network authentication
router.post('/authenticate', async (req, res) => {
    try {
        const { piUid, username, email } = req.body;
        
        // Find existing user or create new one
        let user = await User.findOne({ piUid });
        
        if (!user) {
            user = new User({
                piUid,
                username,
                email
            });
        }
        
        // Update last login
        await user.updateLastLogin();
        
        res.json(user);
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
});

// Get user profile
router.get('/profile', async (req, res) => {
    try {
        const { piUid } = req.query;
        const user = await User.findOne({ piUid }).populate('projects');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
});

module.exports = router; 