import React, { useState } from "react";
import PageHeaderContent from "../../components/pageHeaderContainer";
import { BsInfoCircleFill } from "react-icons/bs";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { Animate } from "react-simple-animate";
import "./styles.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const contactInfo = {
    email: "vinitpawar8305@gmail.com",
    phone: "+91 8305621926",
    location: "Indore, Madhya Pradesh, India",
    linkedin: "https://www.linkedin.com/in/vinit-pawar83",
    github: "https://github.com/vinit8305",
  };

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email";
        return "";

      case "subject":
        if (!value.trim()) return "Subject is required";
        if (value.trim().length < 5)
          return "Subject must be at least 5 characters";
        return "";

      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return "";

      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual email service
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.keys(errors).some((key) => errors[key]);

  return (
    <section id="contact" className="contact">
      <PageHeaderContent
        headerText="Get In Touch"
        icone={<BsInfoCircleFill size={40} />}
      />

      <div className="contact__content">
        <div className="contact__container">
          {/* Contact Information */}
          <Animate
            play
            duration={1}
            delay={0.3}
            start={{ transform: "translateX(-50px)", opacity: 0 }}
            end={{ transform: "translateX(0px)", opacity: 1 }}
          >
            <div className="contact__info">
              <h2>Let's Connect</h2>
              <p>
                I'm always interested in hearing about new opportunities,
                interesting projects, or just want to say hello. Feel free to
                reach out through any of the channels below.
              </p>

              <div className="contact__info-items">
                <div className="contact__info-item">
                  <div className="contact__info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact__info-details">
                    <h4>Email</h4>
                    <a href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="contact__info-item">
                  <div className="contact__info-icon">
                    <FaPhone />
                  </div>
                  <div className="contact__info-details">
                    <h4>Phone</h4>
                    <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
                  </div>
                </div>

                <div className="contact__info-item">
                  <div className="contact__info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact__info-details">
                    <h4>Location</h4>
                    <span>{contactInfo.location}</span>
                  </div>
                </div>
              </div>

              <div className="contact__social">
                <h4>Follow Me</h4>
                <div className="contact__social-links">
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={contactInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-link"
                  >
                  </a>
                </div>
              </div>
            </div>
          </Animate>

          {/* Contact Form */}
          <Animate
            play
            duration={1}
            delay={0.5}
            start={{ transform: "translateX(50px)", opacity: 0 }}
            end={{ transform: "translateX(0px)", opacity: 1 }}
          >
            <div className="contact__form-container">
              <h2>Send Message</h2>

              {submitStatus === "success" && (
                <div className="contact__message contact__message--success">
                  <FaCheckCircle />
                  <span>
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="contact__message contact__message--error">
                  <FaExclamationCircle />
                  <span>
                    Sorry! There was an error sending your message. Please try
                    again.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact__form">
                <div className="contact__form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={errors.name ? "error" : ""}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <span className="contact__error">{errors.name}</span>
                  )}
                </div>

                <div className="contact__form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={errors.email ? "error" : ""}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <span className="contact__error">{errors.email}</span>
                  )}
                </div>

                <div className="contact__form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={errors.subject ? "error" : ""}
                    placeholder="Enter message subject"
                  />
                  {errors.subject && (
                    <span className="contact__error">{errors.subject}</span>
                  )}
                </div>

                <div className="contact__form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={errors.message ? "error" : ""}
                    placeholder="Enter your message"
                    rows="5"
                  />
                  {errors.message && (
                    <span className="contact__error">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="contact__submit-btn"
                  disabled={isSubmitting || hasErrors}
                >
                  {isSubmitting ? (
                    <>
                      <div className="contact__spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </Animate>
        </div>
      </div>
    </section>
  );
};

export default Contact;
