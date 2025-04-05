const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const API_KEY = process.env.ZOOM_API_KEY;
const API_SECRET = process.env.ZOOM_API_SECRET;

router.post('/signature', (req, res) => {
  const { meetingNumber, role } = req.body;
  if (!meetingNumber || typeof role === 'undefined') {
    return res.status(400).json({ error: 'Meeting number and role are required' });
  }

  // Use a timestamp that is slightly in the past (subtract 30 seconds)
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(API_KEY + meetingNumber + timestamp + role).toString('base64');
  const hash = crypto.createHmac('sha256', API_SECRET).update(msg).digest('base64');
  const signature = Buffer.from(`${API_KEY}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');

  res.json({ signature });
});

module.exports = router;