const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all contacts
// @access  Private
router.get('/', (_req, res) => {
    res.send('Get all contacts');
});

// @route   POST api/contacts
// @desc    Add contact
// @access  Private
router.post('/', (_req, res) => {
    res.send('Add contact');
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', (_req, res) => {
    res.send('Update contact');
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', (_req, res) => {
    res.send('Delete contact');
});

module.exports = router;
