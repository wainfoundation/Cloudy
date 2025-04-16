const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    content: {
        type: Object,
        default: {}
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collaborators: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ['editor', 'viewer'],
            default: 'viewer'
        }
    }],
    isTemplate: {
        type: Boolean,
        default: false
    },
    templateCategory: {
        type: String,
        enum: ['document', 'spreadsheet', 'presentation', 'other'],
        default: 'document'
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update lastModified timestamp before saving
ProjectSchema.pre('save', function(next) {
    this.lastModified = Date.now();
    next();
});

// Method to check if a user has access to the project
ProjectSchema.methods.hasAccess = function(userId) {
    if (this.owner.equals(userId)) return true;
    return this.collaborators.some(c => c.user.equals(userId));
};

// Method to get user's role in the project
ProjectSchema.methods.getUserRole = function(userId) {
    if (this.owner.equals(userId)) return 'owner';
    const collaborator = this.collaborators.find(c => c.user.equals(userId));
    return collaborator ? collaborator.role : null;
};

module.exports = mongoose.model('Project', ProjectSchema); 