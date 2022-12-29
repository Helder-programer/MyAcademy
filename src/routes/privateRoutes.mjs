import express from 'express';
import pageController from '../controllers/pageController.mjs';
import postController from "../controllers/postController.mjs"; 
import languageController from "../controllers/languageController.mjs";
import userController from '../controllers/userController.mjs';
import passport from "passport";
export const privateRouter = express.Router();

//PAGES
privateRouter.get('/registerPage', pageController.pageInsertionForm);
privateRouter.post('/addPage', pageController.addPage);
privateRouter.get('/deletePage/:pageId', pageController.deletePage);
privateRouter.get('/editPage/:pageId', pageController.showPageAlterationForm);
privateRouter.post('/updatePage/:pageId', pageController.updatePage);

//POSTS
privateRouter.get('/registerPost/:pageId', postController.showPostInsertionForm);
privateRouter.post('/addPost/:pageId', postController.addPost);
privateRouter.get('/deletePost/:postId', postController.deletePost);
privateRouter.get('/editPost/:postId', postController.showPostAlterationForm);
privateRouter.post('/updatePost/:postId', postController.updatePost);

//PROGRAMMING LANGUAGES
privateRouter.get('/registerLanguage', languageController.showLanguageInsertionForm);
privateRouter.post('/addLanguage', languageController.addLanguage);


//USER ROUTES

privateRouter.get('/addUser', userController.showUserInsertionForm);
privateRouter.post('/addUser', userController.addUser);