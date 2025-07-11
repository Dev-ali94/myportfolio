const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    try {
      if (!process.env.EMAIL_SERVICE || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        throw new Error('Missing email configuration in environment variables');
      }
      this.transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      this.verifyConnection();
    } catch (error) {
      console.error('EmailService initialization failed:', error.message);
      this.transporter = null; // Mark as invalid
    }
  }
  async verifyConnection() {
    if (!this.transporter) return false;
    try {
      await this.transporter.verify();
      console.log('✓ Email server connection ready');
      return true;
    } catch (error) {
      console.error('✗ Email server connection failed:', error.message);
      return false;
    }
  }

  async sendContactEmail(contactData) {
    if (!this.transporter) {
      return {
        success: false,
        error: 'Email service not configured properly'
      };
    }
    try {
      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New message from ${contactData.name}`,
        text: `You received a new message from ${contactData.name} (${contactData.email}):\n\n${contactData.message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Message:</strong> ${contactData.message}</p>
        `
      };
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Email sending error:', error.message);
      return {
        success: false,
        error: 'Failed to send email',
        details: error.message
      };
    }
  }
}

module.exports = new EmailService();