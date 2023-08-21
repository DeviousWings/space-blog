import React from "react";

function Contact() {
  return (
    <div className="contact">
      <h1>Contact Me</h1>
      PAGE STILL UNDER CONSTRUCTION
      <p>
        Got questions, ideas, or just want to say howdy? Feel free to reach out!
      </p>
      <p>
        You can send me an email at{" "}
        <a href="mailto:your.email@example.com">your.email@example.com</a>, or
        connect with me on social media:
      </p>
      <ul className="social-media-links">
        <li>
          <a
            href="https://twitter.com/your-twitter"
            target="_blank"
            rel="noopener noreferrer">
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/your-instagram"
            target="_blank"
            rel="noopener noreferrer">
            Instagram
          </a>
        </li>
        {/* Add more social media links as needed */}
      </ul>
    </div>
  );
}

export default Contact;
