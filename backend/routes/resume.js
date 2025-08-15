const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get active resume (public)
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne({ isActive: true })
      .populate('uploadedBy', 'email')
      .sort({ updatedAt: -1 });
    
    if (!resume) {
      return res.status(404).json({ message: 'No resume found' });
    }
    
    res.json({
      id: resume._id,
      fileName: resume.fileName,
      originalName: resume.originalName,
      fileSize: resume.fileSize,
      uploadedAt: resume.uploadedAt,
      updatedAt: resume.updatedAt
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Download resume (public)
router.get('/download/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume || !resume.isActive) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    const filePath = path.join(__dirname, '..', resume.filePath);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    res.download(filePath, resume.originalName);
  } catch (error) {
    console.error('Download resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all resumes (admin only)
router.get('/admin', auth, async (req, res) => {
  try {
    const resumes = await Resume.find()
      .populate('uploadedBy', 'email')
      .sort({ updatedAt: -1 });
    
    res.json(resumes);
  } catch (error) {
    console.error('Get admin resumes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload new resume (admin only)
router.post('/upload', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Deactivate all existing resumes
    await Resume.updateMany({}, { isActive: false });
    
    // Create new resume
    const newResume = new Resume({
      fileName: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path.replace(/\\/g, '/').split('backend/')[1], // Store relative path
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: req.user._id,
      isActive: true
    });
    
    await newResume.save();
    
    res.json({
      message: 'Resume uploaded successfully',
      resume: {
        id: newResume._id,
        fileName: newResume.fileName,
        originalName: newResume.originalName,
        fileSize: newResume.fileSize,
        uploadedAt: newResume.uploadedAt
      }
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete resume (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', resume.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    await Resume.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Set resume as active (admin only)
router.put('/:id/activate', auth, async (req, res) => {
  try {
    // Deactivate all resumes first
    await Resume.updateMany({}, { isActive: false });
    
    // Activate the selected resume
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json({ message: 'Resume activated successfully', resume });
  } catch (error) {
    console.error('Activate resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
