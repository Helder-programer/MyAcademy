import pageController from "../controllers/pageController.mjs";
import express from 'express';
import passport from "passport";
import userController from "../controllers/userController.mjs";

export const publicRouter = express.Router();



publicRouter.get('/pagesList', pageController.showPagesList);
publicRouter.get('/page/:pageId', pageController.showPage);


publicRouter.get('/login', (req, res) => {
    if (req.query.fail) {
        res.render('login', { message: 'Usuário e/ou senha estão incorretos' });
    }

    if (req.isUnauthenticated()) {
        res.render('login', { message: null });
    } else {
        res.redirect('/');
    }

});


publicRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/public/login?fail=true',
}));


publicRouter.get('/logout', userController.logout);
