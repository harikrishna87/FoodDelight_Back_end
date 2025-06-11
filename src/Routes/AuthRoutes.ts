import express, { Router } from 'express';
import { register, login, logout, getMe } from '../Controller/AuthController';
import passport from 'passport';
import { protect } from '../Middleware/AuthMiddleWare';

const router: Router = express.Router();

router.post('/register', register as express.RequestHandler);
router.post('/login', login as express.RequestHandler);
router.post('/logout', logout as express.RequestHandler);
router.get('/me', protect as express.RequestHandler, getMe as express.RequestHandler);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth?error=google_failed` 
    }),
    (req, res) => {
        const user = req.user as any;
        if (user) {
            const token = user.getJwtToken();
            res.cookie('token', token, {
                expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE || '7') * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            }).redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth?token=${token}&userId=${user._id}&role=${user.role}`);
        } else {
            res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth?error=google_failed`);
        }
    }
);

export default router;