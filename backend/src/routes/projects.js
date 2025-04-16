const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');

// Create new project
router.post('/', async (req, res) => {
    try {
        const { title, description, owner, isTemplate, templateCategory } = req.body;
        
        const project = new Project({
            title,
            description,
            owner,
            isTemplate,
            templateCategory
        });
        
        await project.save();
        
        // Add project to user's projects
        await User.findByIdAndUpdate(owner, {
            $push: { projects: project._id }
        });
        
        res.status(201).json(project);
    } catch (error) {
        console.error('Project creation error:', error);
        res.status(500).json({ message: 'Failed to create project' });
    }
});

// Get project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('owner')
            .populate('collaborators.user');
            
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        res.json(project);
    } catch (error) {
        console.error('Project fetch error:', error);
        res.status(500).json({ message: 'Failed to fetch project' });
    }
});

// Update project
router.put('/:id', async (req, res) => {
    try {
        const { title, description, content, isPublic } = req.body;
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        // Update fields
        if (title) project.title = title;
        if (description) project.description = description;
        if (content) project.content = content;
        if (typeof isPublic === 'boolean') project.isPublic = isPublic;
        
        await project.save();
        res.json(project);
    } catch (error) {
        console.error('Project update error:', error);
        res.status(500).json({ message: 'Failed to update project' });
    }
});

// Delete project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        // Remove project from owner's projects array
        await User.findByIdAndUpdate(project.owner, {
            $pull: { projects: project._id }
        });
        
        await project.remove();
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Project deletion error:', error);
        res.status(500).json({ message: 'Failed to delete project' });
    }
});

// Add collaborator
router.post('/:id/collaborators', async (req, res) => {
    try {
        const { userId, role } = req.body;
        const project = await Project.findById(req.params.id);
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        // Check if user is already a collaborator
        const existingCollaborator = project.collaborators.find(
            c => c.user.toString() === userId
        );
        
        if (existingCollaborator) {
            existingCollaborator.role = role;
        } else {
            project.collaborators.push({ user: userId, role });
        }
        
        await project.save();
        res.json(project);
    } catch (error) {
        console.error('Add collaborator error:', error);
        res.status(500).json({ message: 'Failed to add collaborator' });
    }
});

module.exports = router; 