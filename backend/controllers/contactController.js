const emailService = require('../services/contactService');

exports.sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }
    const result = await emailService.sendContactEmail({
      name,
      email,
      message
    });
    if (!result.success) {
      return res.status(500).json(result);
    }
    res.status(200).json({
      success: true,
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Error in contact controller:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process request',
      details: error.message
    });
  }
};