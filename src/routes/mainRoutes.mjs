import express from "express";

export const mainRouter = express.Router();


mainRouter.get('/', (req, res) => {
    res.render('home');
});


mainRouter.get('/about', (req, res) => {
    res.render('about');
});

mainRouter.get('/contact', (req, res) => {
    res.render('contact');
});