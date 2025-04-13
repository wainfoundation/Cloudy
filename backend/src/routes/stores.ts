import express from 'express';
import { body, validationResult } from 'express-validator';
import { Store } from '../models/Store';
import { auth } from '../middleware/auth';

const router = express.Router();

// Validation middleware for store creation
const createStoreValidation = [
  body('name').trim().notEmpty().withMessage('Store name is required'),
  body('description').trim().notEmpty().withMessage('Store description is required'),
  body('domain').trim().notEmpty().withMessage('Domain is required'),
  body('ownerId').notEmpty().withMessage('Owner ID is required'),
  body('piWalletAddress').trim().notEmpty().withMessage('Pi wallet address is required'),
  body('categories').isArray().withMessage('Categories must be an array'),
];

// Create a new store
router.post('/', auth, createStoreValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      description,
      domain,
      ownerId,
      piWalletAddress,
      logo,
      banner,
      categories,
      website,
      twitter,
      instagram,
      github,
    } = req.body;

    // Check if domain is already taken
    const existingStore = await Store.findOne({ domain });
    if (existingStore) {
      return res.status(400).json({ message: 'Domain is already taken' });
    }

    // Create new store
    const store = new Store({
      name,
      description,
      domain,
      ownerId,
      piWalletAddress,
      logo,
      banner,
      categories,
      socialLinks: {
        website,
        twitter,
        instagram,
        github,
      },
    });

    await store.save();

    res.status(201).json(store);
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({ message: 'Error creating store' });
  }
});

// Get store by domain
router.get('/domain/:domain', async (req, res) => {
  try {
    const store = await Store.findOne({ domain: req.params.domain });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ message: 'Error fetching store' });
  }
});

// Get store by ID
router.get('/:id', async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ message: 'Error fetching store' });
  }
});

// Get stores by owner ID
router.get('/owner/:ownerId', auth, async (req, res) => {
  try {
    const stores = await Store.find({ ownerId: req.params.ownerId });
    res.json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ message: 'Error fetching stores' });
  }
});

// Update store
router.put('/:id', auth, async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Check if user is the owner
    if (store.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this store' });
    }

    // Update store fields
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedStore);
  } catch (error) {
    console.error('Error updating store:', error);
    res.status(500).json({ message: 'Error updating store' });
  }
});

// Delete store
router.delete('/:id', auth, async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Check if user is the owner
    if (store.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this store' });
    }

    await Store.findByIdAndDelete(req.params.id);
    res.json({ message: 'Store deleted successfully' });
  } catch (error) {
    console.error('Error deleting store:', error);
    res.status(500).json({ message: 'Error deleting store' });
  }
});

export default router; 