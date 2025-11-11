// Fantasy Buzz Color Palette
const colors = {
  primary: {
    main: "#667eea",
    light: "#8698f0",
    dark: "#5a6fd8",
  },
  secondary: {
    main: "#764ba2",
    light: "#8a65b0",
    dark: "#6a4190",
  },
  success: {
    main: "#10ac84",
    light: "#12c29a",
    dark: "#0e9a76",
  },
  warning: {
    main: "#ff9f43",
    light: "#ffb16b",
    dark: "#e88f3a",
  },
  error: {
    main: "#ee5a24",
    light: "#f16b3c",
    dark: "#d65120",
  },
  info: {
    main: "#2e86de",
    light: "#4a96e3",
    dark: "#2978c7",
  },
  background: {
    light: "#f8f9fa",
    dark: "#e9ecef",
  },
  text: {
    primary: "#2d3748",
    secondary: "#4a5568",
    muted: "#718096",
  },
};

// Base template structure
const baseTemplate = (content, headerColor = colors.primary) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fantasy Buzz</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: ${colors.text.primary};
            background-color: #f6f9fc;
            margin: 0;
            padding: 20px 0;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
            border: 1px solid #e2e8f0;
        }
        
        .header {
            background: linear-gradient(135deg, ${headerColor.main} 0%, ${headerColor.dark} 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
        }
        
        .logo-subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 300;
            margin-top: -5px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .otp-container {
            background: ${colors.background.light};
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
            border: 1px solid #e2e8f0;
        }
        
        .otp-code {
            font-size: 42px;
            font-weight: bold;
            letter-spacing: 10px;
            color: ${colors.primary.main};
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 2px dashed ${colors.primary.light};
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.secondary.main} 100%);
            color: white;
            padding: 14px 35px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            font-size: 16px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }
        
        .security-note {
            background: #e8f4fd;
            border-left: 4px solid ${colors.info.main};
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
            font-size: 14px;
        }
        
        .success-message {
            background: #d1f7e9;
            border-left: 4px solid ${colors.success.main};
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
        }
        
        .footer {
            background: ${colors.background.light};
            padding: 30px;
            text-align: center;
            color: ${colors.text.muted};
            font-size: 14px;
            border-top: 1px solid #e2e8f0;
        }
        
        .social-links {
            margin: 20px 0;
        }
        
        .social-links a {
            margin: 0 12px;
            text-decoration: none;
            color: ${colors.primary.main};
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .social-links a:hover {
            color: ${colors.secondary.main};
        }
        
        .icon {
            font-size: 64px;
            margin: 20px 0;
            text-align: center;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 25px 0;
        }
        
        .feature-item {
            text-align: center;
            padding: 20px;
            background: ${colors.background.light};
            border-radius: 8px;
            border: 1px solid #e2e8f0;
        }
        
        .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 12px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .otp-code {
                font-size: 32px;
                letter-spacing: 8px;
                padding: 12px;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        ${content}
    </div>
</body>
</html>
`;

export const emailTemplates = {
  // OTP Verification Email
  verificationOTP: (name, otp) =>
    baseTemplate(`
    <div class="header">
        <div class="logo">🎯 Fantasy Buzz</div>
        <div class="logo-subtitle">Your Ultimate Fantasy Sports Destination</div>
        <h1 style="margin-top: 15px; font-size: 28px;">Verify Your Account</h1>
    </div>
    
    <div class="content">
        <h2 style="color: ${
          colors.text.primary
        }; margin-bottom: 20px;">Hello ${name},</h2>
        <p style="margin-bottom: 20px; color: ${colors.text.secondary};">
            Welcome to Fantasy Buzz! To complete your account verification and start your fantasy sports journey, 
            please use the following One-Time Password (OTP):
        </p>
        
        <div class="otp-container">
            <p style="margin-bottom: 15px; color: ${
              colors.text.muted
            }; font-size: 16px;">Your verification code:</p>
            <div class="otp-code">${otp}</div>
            <p style="color: ${
              colors.text.muted
            }; font-size: 14px; margin-top: 10px;">
                ⏰ This code will expire in 10 minutes
            </p>
        </div>
        
        <div class="security-note">
            <strong>🔒 Security Notice:</strong> For your protection, please do not share this OTP with anyone. 
            Fantasy Buzz team will never ask for your password or OTP.
        </div>
        
        <p style="color: ${colors.text.secondary}; margin-top: 25px;">
            If you didn't create an account with us, please ignore this email.
        </p>
        
        <p style="margin-top: 30px;">
            <strong>Best regards,</strong><br>
            The Fantasy Buzz Team
        </p>
    </div>
    
    <div class="footer">
        <div class="social-links">
            <a href="#">🏠 Website</a> • 
            <a href="#">💬 Support</a> • 
            <a href="#">📄 Privacy Policy</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} Fantasy Buzz. All rights reserved.</p>
        <p style="font-size: 12px; color: #999; margin-top: 10px;">
            This is an automated message. Please do not reply to this email.
        </p>
    </div>
  `),

  // Welcome Back Email
  welcomeBack: (name) =>
    baseTemplate(
      `
    <div class="header" style="background: linear-gradient(135deg, ${
      colors.info.main
    } 0%, ${colors.primary.main} 100%);">
        <div class="logo">🎉 Fantasy Buzz</div>
        <div class="logo-subtitle">Welcome Back Champion!</div>
        <h1 style="margin-top: 15px; font-size: 28px;">Great to See You!</h1>
    </div>
    
    <div class="content" style="text-align: center;">
        <div class="icon">🏆</div>
        <h2 style="color: ${
          colors.text.primary
        }; margin-bottom: 20px;">Hello ${name},</h2>
        <p style="margin-bottom: 15px; color: ${
          colors.text.secondary
        }; font-size: 18px;">
            We're thrilled to see you back at Fantasy Buzz!
        </p>
        <p style="color: ${colors.text.secondary}; margin-bottom: 25px;">
            Your recent login was successful. If this was you, no further action is needed. 
            Get ready for another exciting fantasy sports experience!
        </p>
        
        <a href="#" class="cta-button">Continue Your Journey</a>
        
        <div class="features-grid">
            <div class="feature-item">
                <div class="feature-icon">⚡</div>
                <h4>Live Updates</h4>
                <p style="color: ${
                  colors.text.muted
                }; font-size: 14px;">Real-time scores and stats</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">👑</div>
                <h4>Win Big</h4>
                <p style="color: ${
                  colors.text.muted
                }; font-size: 14px;">Exciting prizes await</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">🤝</div>
                <h4>Join Community</h4>
                <p style="color: ${
                  colors.text.muted
                }; font-size: 14px;">Connect with fans</p>
            </div>
        </div>
        
        <div class="security-note">
            <strong>⚠️ Security Check:</strong> If this wasn't you, please 
            <a href="#" style="color: ${
              colors.info.main
            }; text-decoration: none; font-weight: bold;">
                secure your account
            </a> immediately.
        </div>
        
        <p style="margin-top: 30px;">
            <strong>Best regards,</strong><br>
            The Fantasy Buzz Team
        </p>
    </div>
    
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Fantasy Buzz. All rights reserved.</p>
        <p style="font-size: 12px; color: #999; margin-top: 10px;">
            This is an automated message. Please do not reply to this email.
        </p>
    </div>
  `,
      colors.info
    ),

  // Password Reset Email
  passwordReset: (name, otp) =>
    baseTemplate(
      `
    <div class="header" style="background: linear-gradient(135deg, ${
      colors.warning.main
    } 0%, ${colors.error.main} 100%);">
        <div class="logo">🔐 Fantasy Buzz</div>
        <div class="logo-subtitle">Account Security</div>
        <h1 style="margin-top: 15px; font-size: 28px;">Password Reset Request</h1>
    </div>
    
    <div class="content">
        <h2 style="color: ${
          colors.text.primary
        }; margin-bottom: 20px;">Hello ${name},</h2>
        <p style="margin-bottom: 20px; color: ${colors.text.secondary};">
            We received a request to reset your password for your Fantasy Buzz account.
        </p>
        
        <div class="otp-container">
            <p style="margin-bottom: 15px; color: ${
              colors.text.muted
            }; font-size: 16px;">Your password reset code:</p>
            <div class="otp-code">${otp}</div>
            <p style="color: ${
              colors.text.muted
            }; font-size: 14px; margin-top: 10px;">
                ⏰ This code will expire in 5 minutes
            </p>
        </div>
        
        <div class="security-note">
            <strong>🔒 Security Tip:</strong> If you didn't request this password reset, please ignore this email 
            and ensure your account is secure. Your fantasy teams and data are important to us!
        </div>
        
        <p style="color: ${colors.text.secondary}; margin-top: 25px;">
            Use the code above to reset your password and get back to managing your fantasy teams.
        </p>
        
        <p style="margin-top: 30px;">
            <strong>Best regards,</strong><br>
            The Fantasy Buzz Security Team
        </p>
    </div>
    
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Fantasy Buzz. All rights reserved.</p>
        <p style="font-size: 12px; color: #999; margin-top: 10px;">
            This is an automated security message. Please do not reply to this email.
        </p>
    </div>
  `,
      colors.warning
    ),

  // Password Reset Success Email
  passwordResetSuccess: (name) =>
    baseTemplate(
      `
    <div class="header" style="background: linear-gradient(135deg, ${
      colors.success.main
    } 0%, ${colors.success.dark} 100%);">
        <div class="logo">✅ Fantasy Buzz</div>
        <div class="logo-subtitle">Password Updated Successfully</div>
        <h1 style="margin-top: 15px; font-size: 28px;">Password Reset Complete!</h1>
    </div>
    
    <div class="content" style="text-align: center;">
        <div class="icon">🎯</div>
        <h2 style="color: ${
          colors.text.primary
        }; margin-bottom: 20px;">Hello ${name},</h2>
        <p style="margin-bottom: 20px; color: ${
          colors.text.secondary
        }; font-size: 18px;">
            Your password has been successfully reset!
        </p>
        
        <div class="success-message">
            <h3 style="color: ${
              colors.success.main
            }; margin-bottom: 15px;">What happens next?</h3>
            <ul style="text-align: left; margin-left: 20px; color: ${
              colors.text.secondary
            };">
                <li style="margin-bottom: 8px;">✅ You can now log in with your new password</li>
                <li style="margin-bottom: 8px;">✅ All your existing sessions have been secured</li>
                <li style="margin-bottom: 8px;">✅ Your fantasy teams and data are safe</li>
                <li>✅ Your account security has been maintained</li>
            </ul>
        </div>
        
        <a href="#" class="cta-button">Login to Your Account</a>
        
        <div class="security-note">
            <strong>⚠️ Important:</strong> If you did not make this change, please contact our support team immediately 
            to secure your account and protect your fantasy teams.
        </div>
        
        <p style="margin-top: 30px;">
            <strong>Best regards,</strong><br>
            The Fantasy Buzz Security Team
        </p>
    </div>
    
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Fantasy Buzz. All rights reserved.</p>
        <p style="font-size: 12px; color: #999; margin-top: 10px;">
            This is an automated security message. Please do not reply to this email.
        </p>
    </div>
  `,
      colors.success
    ),

  // NEW: Welcome Email (for new registrations)
  welcomeEmail: (name) =>
    baseTemplate(
      `
    <div class="header" style="background: linear-gradient(135deg, ${
      colors.secondary.main
    } 0%, ${colors.primary.main} 100%);">
        <div class="logo">🚀 Fantasy Buzz</div>
        <div class="logo-subtitle">Welcome to the Ultimate Fantasy Experience!</div>
        <h1 style="margin-top: 15px; font-size: 28px;">Welcome Aboard, ${name}!</h1>
    </div>
    
    <div class="content" style="text-align: center;">
        <div class="icon">🎮</div>
        <h2 style="color: ${
          colors.text.primary
        }; margin-bottom: 20px;">Ready to Dominate?</h2>
        <p style="margin-bottom: 20px; color: ${
          colors.text.secondary
        }; font-size: 18px;">
            Your Fantasy Buzz account has been successfully created! Get ready to experience 
            fantasy sports like never before.
        </p>
        
        <div class="features-grid">
            <div class="feature-item">
                <div class="feature-icon">🏈</div>
                <h4>Multiple Sports</h4>
                <p style="color: ${
                  colors.text.muted
                }; font-size: 14px;">Football, Basketball, Cricket & more</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">💰</div>
                <h4>Win Real Prizes</h4>
                <p style="color: ${
                  colors.text.muted
                }; font-size: 14px;">Cash rewards and exclusive merchandise</p>
            </div>
            <div class="feature-item">
                <div class="feature-icon">📊</div>
                <h4>Advanced Stats</h4>
                <p style="color: ${
                  colors.text.muted
                }; font-size: 14px;">Make data-driven decisions</p>
            </div>
        </div>
        
        <a href="#" class="cta-button">Create Your First Team</a>
        
        <div style="margin: 30px 0; padding: 20px; background: ${
          colors.background.light
        }; border-radius: 8px;">
            <h4 style="color: ${
              colors.primary.main
            }; margin-bottom: 15px;">🎯 Quick Start Guide</h4>
            <ol style="text-align: left; color: ${colors.text.secondary};">
                <li style="margin-bottom: 8px;">Verify your email address</li>
                <li style="margin-bottom: 8px;">Join or create a league</li>
                <li style="margin-bottom: 8px;">Draft your dream team</li>
                <li>Compete and climb the leaderboards!</li>
            </ol>
        </div>
        
        <p style="margin-top: 30px;">
            <strong>Best regards,</strong><br>
            The Fantasy Buzz Team
        </p>
    </div>
    
    <div class="footer">
        <div class="social-links">
            <a href="#">📱 Download App</a> • 
            <a href="#">📚 How to Play</a> • 
            <a href="#">🏆 Tournaments</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} Fantasy Buzz. All rights reserved.</p>
    </div>
  `,
      colors.secondary
    ),

  // NEW: Account Verified Success Email
  accountVerified: (name) =>
    baseTemplate(
      `
    <div class="header" style="background: linear-gradient(135deg, ${
      colors.success.main
    } 0%, #27ae60 100%);">
        <div class="logo">✅ Fantasy Buzz</div>
        <div class="logo-subtitle">Account Successfully Verified</div>
        <h1 style="margin-top: 15px; font-size: 28px;">You're All Set, ${name}!</h1>
    </div>
    
    <div class="content" style="text-align: center;">
        <div class="icon">🎉</div>
        <h2 style="color: ${
          colors.text.primary
        }; margin-bottom: 20px;">Account Verified Successfully!</h2>
        <p style="margin-bottom: 25px; color: ${
          colors.text.secondary
        }; font-size: 18px;">
            Congratulations! Your Fantasy Buzz account has been verified. 
            You now have full access to all features and can start building your winning teams.
        </p>
        
        <div style="background: linear-gradient(135deg, ${
          colors.primary.light
        }20 0%, ${colors.secondary.light}20 100%); 
                    padding: 25px; border-radius: 12px; margin: 25px 0;">
            <h3 style="color: ${
              colors.primary.main
            }; margin-bottom: 15px;">🌟 What's Next?</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-top: 20px;">
                <div style="text-align: center;">
                    <div style="font-size: 24px; margin-bottom: 8px;">👥</div>
                    <div style="font-weight: 600; color: ${
                      colors.text.primary
                    };">Join Leagues</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 24px; margin-bottom: 8px;">📈</div>
                    <div style="font-weight: 600; color: ${
                      colors.text.primary
                    };">Track Performance</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 24px; margin-bottom: 8px;">🏅</div>
                    <div style="font-weight: 600; color: ${
                      colors.text.primary
                    };">Win Rewards</div>
                </div>
            </div>
        </div>
        
        <a href="#" class="cta-button">Start Playing Now</a>
        
        <p style="margin-top: 30px; color: ${colors.text.secondary};">
            Thank you for verifying your account. We're excited to have you in our fantasy sports community!
        </p>
        
        <p style="margin-top: 30px;">
            <strong>Best regards,</strong><br>
            The Fantasy Buzz Team
        </p>
    </div>
    
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Fantasy Buzz. All rights reserved.</p>
        <p style="font-size: 12px; color: #999; margin-top: 10px;">
            Ready to play? The game starts now!
        </p>
    </div>
  `,
      colors.success
    ),
};
