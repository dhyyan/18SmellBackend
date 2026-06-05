import { userRepository, otpRepository } from '../../repositories/index.js';
import { signToken } from '../../services/jwtService.js';
import sendEmail from '../../utils/sendEmail.js';
import { buildLuxuryEmailTemplate } from '../../utils/emailTemplates.js';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../types/express.types.js';

// Helper to generate a secure, 6-digit numeric verification code
const generateOtpCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register a user (send OTP)
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);   

    // Fast fail check for missing credentials
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name, email, and password to initiate registration.',
      });
    }

    // Human touch validation: check for valid email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    // Human touch validation: check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password is too weak. For your protection, it must be at least 6 characters.',
      });
    }

    // Check if user is already registered to avoid duplication
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered. Please log in to your account.',
      });
    }

    // Generate a new 6-digit OTP code
    const otpCode = generateOtpCode();

    console.log(`\n=========================================\n🔑 [OTP GENERATOR] REGISTER\nEmail: ${email}\nOTP Code: ${otpCode}\nGenerated At: ${new Date().toISOString()} (${new Date().toLocaleTimeString()})\n=========================================\n`);

    // Clean up any stale registration attempts for this email
    await otpRepository.deleteMany({ email });

    // Save registration payload temporarily in the OTP collection
    // The password will automatically be hashed once validated and transferred to the User schema.
    await otpRepository.create({
      email,
      otp: otpCode,
      name,
      password,
      attempts: 0,
    });

    // Dispatch the verification email
    const emailOptions = {
      email,
      subject: '18Smell - Verify Your Account',
      message: `Welcome to 18Smell. Your verification code is ${otpCode}. It will expire in 10 minutes.`,
      html: buildLuxuryEmailTemplate(name, otpCode),
    };

    const emailResult = await sendEmail(emailOptions);

    res.status(200).json({
      success: true,
      message: emailResult.simulated 
        ? 'Verification code generated (Simulated in terminal console).' 
        : 'A verification code has been dispatched to your email address.',
      email,
      ...(emailResult.simulated && { otp: otpCode }),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP and complete registration
// @route   POST /api/v1/auth/verify-otp
// @access  Public
export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both the email and verification code.',
      });
    }

    // Find the current active registration token for this email
    const otpRecord = await otpRepository.findLatestByEmail(email);

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Verification session not found or code has expired. Please register again.',
      });
    }

    // Security check: Match the verification code
    if (otpRecord.otp !== otp) {
      // Track and increment invalid attempts to avoid brute-forcing
      otpRecord.attempts += 1;

      if (otpRecord.attempts >= 3) {
        await otpRepository.deleteMany({ email });
        return res.status(400).json({
          success: false,
          message: 'Maximum verification attempts exceeded. Please start the registration process again.',
        });
      }

      await otpRepository.save(otpRecord);

      return res.status(400).json({
        success: false,
        message: `Invalid verification code. You have ${3 - otpRecord.attempts} attempt(s) remaining before security lockout.`,
      });
    }

    // Successful match - Create the final User account
    const user = await userRepository.create({
      name: otpRecord.name,
      email: otpRecord.email,
      password: otpRecord.password, // This invokes pre-save hook for secure hashing
    });

    // Cleanup: Remove OTP registration record to finalize the flow
    await otpRepository.deleteMany({ email });

    // Generate authenticated JWT Token
    const token = signToken({ id: user._id });

    // Build cookie settings
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };

    // Store JWT securely as httpOnly cookie
    res.cookie('token', token, cookieOptions);

    res.status(201).json({
      success: true,
      message: 'Your account has been verified and created successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Resend OTP code
// @route   POST /api/v1/auth/resend-otp
// @access  Public
export const resendOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email address.',
      });
    }

    // Retrieve active registration session details
    const otpRecord = await otpRepository.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'No active registration session found. Please register again.',
      });
    }

    // Generate a fresh code and reset attempt counters
    const otpCode = generateOtpCode();

    console.log(`\n=========================================\n🔑 [OTP GENERATOR] RESEND\nEmail: ${email}\nOTP Code: ${otpCode}\nGenerated At: ${new Date().toISOString()} (${new Date().toLocaleTimeString()})\n=========================================\n`);
    otpRecord.otp = otpCode;
    otpRecord.attempts = 0; // Reset invalid attempt count
    otpRecord.createdAt = Date.now();
    await otpRepository.save(otpRecord);

    // Send updated code via email
    const emailOptions = {
      email,
      subject: '18Smell - Verify Your Account (New Code)',
      message: `Welcome to 18Smell. Your new verification code is ${otpCode}. It will expire in 10 minutes.`,
      html: buildLuxuryEmailTemplate(otpRecord.name, otpCode),
    };

    const emailResult = await sendEmail(emailOptions);

    res.status(200).json({
      success: true,
      message: emailResult.simulated 
        ? 'New verification code generated (Simulated in terminal console).' 
        : 'A new verification code has been dispatched to your email.',
      ...(emailResult.simulated && { otp: otpCode }),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password to log in.',
      });
    }

    // Locate the user and request the hidden password field for hashing validation
    const user = await userRepository.findByEmail(email, true);

    if (!user || !(await user.comparePassword(password))) {
      // Secure fallback message to protect user privacy
      return res.status(401).json({
        success: false,
        message: 'Invalid email address or password.',
      });
    }

    // Generate authenticated JWT Token
    const token = signToken({ id: user._id });

    // Build cookie settings
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };

    // Store JWT securely as httpOnly cookie
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
      success: true,
      message: 'Welcome back! Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // req.user is populated dynamically by protect middleware
    res.status(200).json({
      success: true,
      data: req.user || null,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log out user
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Expire cookie token immediately to sign out user
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'You have logged out successfully. Have a nice day!',
    });
  } catch (error) {
    next(error);
  }
};

