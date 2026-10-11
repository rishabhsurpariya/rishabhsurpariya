import { useState } from 'react';

export function ContactForm() {
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult('');

    const formData = new FormData(event.target);
    const key = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!key) {
      setResult('Form service is not configured.');
      setIsSubmitting(false);
      return;
    }

    formData.append('access_key', key.trim());

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult('Message sent successfully! 🎉');
        event.target.reset();
      } else {
        setResult(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setResult('Failed to connect. Please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="bm-form" onSubmit={onSubmit}>
      <div className="bm-field">
        <label className="bm-label" htmlFor="cf-name">Your Name</label>
        <input id="cf-name" className="bm-input" type="text" name="name" placeholder="John Doe" required />
      </div>
      <div className="bm-field">
        <label className="bm-label" htmlFor="cf-email">Your Email</label>
        <input id="cf-email" className="bm-input" type="email" name="email" placeholder="john@example.com" required />
      </div>
      <div className="bm-field">
        <label className="bm-label" htmlFor="cf-message">Message</label>
        <textarea id="cf-message" className="bm-textarea" name="message" placeholder="How can I help you?" rows={3} required />
      </div>
      <button className="bm-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      {result && (
        <p className={`cf-result ${result.includes('success') ? 'cf-result--ok' : 'cf-result--err'}`}>
          {result}
        </p>
      )}
    </form>
  );
}

export default ContactForm;
