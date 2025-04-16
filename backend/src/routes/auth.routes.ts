import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate-request';

const router = Router();

// Pi Network Authentication
router.post('/pi/auth', 
  body('accessToken').notEmpty(),
  validateRequest,
  authController.piNetworkAuth
);

// Regular email/password authentication
router.post('/signup',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('name').trim().notEmpty().withMessage('Name is required'),
  ],
  validateRequest,
  authController.signup
);

router.post('/login',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
  ],
  validateRequest,
  authController.login
);

router.post('/forgot-password',
  body('email').isEmail(),
  validateRequest,
  authController.forgotPassword
);

router.post('/reset-password',
  [
    body('token').notEmpty(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  validateRequest,
  authController.resetPassword
);

router.get('/verify-email/:token', authController.verifyEmail);

export default router; 