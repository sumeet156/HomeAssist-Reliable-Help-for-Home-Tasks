const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send verification email
const sendVerificationEmail = async (email, firstName, token) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: `"HomeAssist" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to HomeAssist - Please Verify Your Email',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to HomeAssist</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e1e5e9;
              border-top: none;
            }
            .footer {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              border: 1px solid #e1e5e9;
              border-top: none;
              border-radius: 0 0 10px 10px;
              font-size: 14px;
              color: #6b7280;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
              color: white;
              text-decoration: none;
              padding: 15px 30px;
              border-radius: 8px;
              font-weight: 600;
              margin: 20px 0;
            }
            .button:hover {
              background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%);
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">HomeAssist</div>
            <h1>Welcome to HomeAssist!</h1>
          </div>
          
          <div class="content">
            <h2>Hi ${firstName},</h2>
            
            <p>Thank you for signing up with HomeAssist! We're excited to help you connect with trusted professionals for all your home tasks.</p>
            
            <p>To get started, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            
            <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #7c3aed;">${verificationUrl}</p>
            
            <p><strong>What's next?</strong></p>
            <ul>
              <li>Complete your profile setup</li>
              <li>Browse our trusted service providers</li>
              <li>Book your first service</li>
              <li>Leave reviews to help our community</li>
            </ul>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Best regards,<br>The HomeAssist Team</p>
          </div>
          
          <div class="footer">
            <p>This email was sent to ${email}. If you didn't sign up for HomeAssist, please ignore this email.</p>
            <p>&copy; 2024 HomeAssist. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
    
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, firstName, token) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: `"HomeAssist" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'HomeAssist - Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - HomeAssist</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e1e5e9;
              border-top: none;
            }
            .footer {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              border: 1px solid #e1e5e9;
              border-top: none;
              border-radius: 0 0 10px 10px;
              font-size: 14px;
              color: #6b7280;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
              color: white;
              text-decoration: none;
              padding: 15px 30px;
              border-radius: 8px;
              font-weight: 600;
              margin: 20px 0;
            }
            .button:hover {
              background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%);
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .warning {
              background: #fef3cd;
              border: 1px solid #facc15;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">HomeAssist</div>
            <h1>Password Reset Request</h1>
          </div>
          
          <div class="content">
            <h2>Hi ${firstName},</h2>
            
            <p>We received a request to reset your password for your HomeAssist account.</p>
            
            <p>If you requested this password reset, click the button below to create a new password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            
            <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #7c3aed;">${resetUrl}</p>
            
            <div class="warning">
              <strong>Important:</strong>
              <ul>
                <li>This link will expire in 1 hour for security reasons</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Your password will remain unchanged until you create a new one</li>
              </ul>
            </div>
            
            <p>If you're having trouble or didn't request this reset, please contact our support team immediately.</p>
            
            <p>Best regards,<br>The HomeAssist Team</p>
          </div>
          
          <div class="footer">
            <p>This email was sent to ${email}. For security, this link will expire in 1 hour.</p>
            <p>&copy; 2024 HomeAssist. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
    
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
};

// Send booking confirmation email
const sendBookingConfirmationEmail = async (email, firstName, bookingDetails) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"HomeAssist" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Booking Confirmation - HomeAssist',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation - HomeAssist</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e1e5e9;
              border-top: none;
            }
            .footer {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              border: 1px solid #e1e5e9;
              border-top: none;
              border-radius: 0 0 10px 10px;
              font-size: 14px;
              color: #6b7280;
            }
            .booking-details {
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #e1e5e9;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">HomeAssist</div>
            <h1>Booking Confirmed!</h1>
          </div>
          
          <div class="content">
            <h2>Hi ${firstName},</h2>
            
            <p>Great news! Your service booking has been confirmed. Here are the details:</p>
            
            <div class="booking-details">
              <h3>Booking Details</h3>
              <div class="detail-row">
                <span><strong>Service:</strong></span>
                <span>${bookingDetails.serviceType}</span>
              </div>
              <div class="detail-row">
                <span><strong>Date:</strong></span>
                <span>${bookingDetails.serviceDate}</span>
              </div>
              <div class="detail-row">
                <span><strong>Time:</strong></span>
                <span>${bookingDetails.serviceTime}</span>
              </div>
              <div class="detail-row">
                <span><strong>Address:</strong></span>
                <span>${bookingDetails.address}</span>
              </div>
              <div class="detail-row">
                <span><strong>Total Cost:</strong></span>
                <span><strong>${bookingDetails.totalCost}</strong></span>
              </div>
            </div>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>We'll match you with a qualified tasker</li>
              <li>You'll receive contact details 24 hours before your appointment</li>
              <li>The tasker will arrive at your scheduled time</li>
              <li>Payment will be processed after the service is completed</li>
            </ul>
            
            <p>If you need to make any changes or have questions, please contact our support team.</p>
            
            <p>Thank you for choosing HomeAssist!</p>
            
            <p>Best regards,<br>The HomeAssist Team</p>
          </div>
          
          <div class="footer">
            <p>This email was sent to ${email}. Keep this email for your records.</p>
            <p>&copy; 2024 HomeAssist. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation email sent to ${email}`);
    
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw new Error('Failed to send booking confirmation email');
  }
};

// Send welcome email
const sendWelcomeEmail = async (email, firstName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"HomeAssist" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to HomeAssist!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to HomeAssist</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e1e5e9;
              border-top: none;
            }
            .footer {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              border: 1px solid #e1e5e9;
              border-top: none;
              border-radius: 0 0 10px 10px;
              font-size: 14px;
              color: #6b7280;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .services {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin: 20px 0;
            }
            .service-item {
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">HomeAssist</div>
            <h1>Welcome to the HomeAssist family!</h1>
          </div>
          
          <div class="content">
            <h2>Hi ${firstName},</h2>
            
            <p>We're thrilled to have you join HomeAssist! You're now part of a community that believes getting things done around the house shouldn't be a hassle.</p>
            
            <p><strong>Popular services to get you started:</strong></p>
            
            <div class="services">
              <div class="service-item">
                <strong>🛠️ Furniture Assembly</strong>
              </div>
              <div class="service-item">
                <strong>📺 TV Mounting</strong>
              </div>
              <div class="service-item">
                <strong>🧹 House Cleaning</strong>
              </div>
              <div class="service-item">
                <strong>🏠 Home Repairs</strong>
              </div>
            </div>
            
            <p><strong>Here's how it works:</strong></p>
            <ol>
              <li><strong>Browse services</strong> - Find exactly what you need</li>
              <li><strong>Book instantly</strong> - Choose your date and time</li>
              <li><strong>Get it done</strong> - Relax while our taskers handle it</li>
              <li><strong>Leave a review</strong> - Help others in the community</li>
            </ol>
            
            <p>Questions? Tips? Our friendly support team is here to help make your experience amazing.</p>
            
            <p>Ready to cross something off your to-do list?</p>
            
            <p>Happy tasking!<br>The HomeAssist Team</p>
          </div>
          
          <div class="footer">
            <p>This email was sent to ${email}. You can update your email preferences in your account settings.</p>
            <p>&copy; 2024 HomeAssist. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
    
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error('Failed to send welcome email');
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendBookingConfirmationEmail,
  sendWelcomeEmail
};
