const Contact = require('../Models/Contact');

exports.sendContactMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  try {
    // Create new contact message
    const contactMessage = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    // Save to MongoDB
    await contactMessage.save();

    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};
