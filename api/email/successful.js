const nodemailer = require("nodemailer");

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your_email@gmail.com",
    pass: "your_email_password",
  },
});

// Send email function
const sendEmail = (to, subject, html) => {
  const mailOptions = {
    from: "your_email@gmail.com",
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// In your registration API endpoint
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, saltRounds),
    });

    // Send email to the registered user
    const emailSubject = "Registration Successful";
    const emailBody =
      "<p>Welcome to our website! Thank you for registering.</p>";
    sendEmail(email, emailSubject, emailBody);

    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});
