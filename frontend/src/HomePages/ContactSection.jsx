import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const gibberishRegex = /(.)\1{5,}/;

    if (!nameRegex.test(formData.name) || formData.name.length < 3) {
      alert('Please enter a valid name (at least 3 characters, letters and spaces only).');
      setIsSubmitting(false);
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    if (formData.message.length < 10 || gibberishRegex.test(formData.message)) {
      alert('Please enter a meaningful message (at least 10 characters, no gibberish).');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/contact`, formData);
      if (response.data.success) {
        alert('Your message has been sent successfully!');
        setFormData({ email: '', name: '', message: '' });
      } else {
        alert('Failed to send your message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Variants
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-12 py-12 text-gray-100 overflow-y-auto max-h-160">
      {/* Animated Map */}
      <motion.div
        className="mapbox"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d862.2723150451161!2d71.44155346958955!3d30.177444098428552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b311a4512db41%3A0x41d129eb1ff66a04!2sRAJA%20DOODH%20JALEBI!5e0!3m2!1sen!2s!4v1746887453819!5m2!1sen!2s"
          width="100%"
          height="400px"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg blackscale filter brightness-60 transition-all duration-500 ease-in-out hover:brightness-75"
        ></iframe>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="w-full mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl font-bold text-start mt-10 text-orange-500 mb-8"
          variants={fadeUp}
        >
          Get in Touch
        </motion.h2>

        <motion.form
          onSubmit={submitHandler}
          className="space-y-6 p-2 rounded-xl"
        >
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
            <div className="w-full">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full p-3 border border-gray-600 rounded-lg bg-[#0F141A] text-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full p-3 border border-gray-600 rounded-lg bg-[#0F141A] text-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-3 border border-gray-600 rounded-lg bg-[#0F141A] text-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default ContactSection;
