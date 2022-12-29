//IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import { mainRouter } from "./routes/mainRoutes.mjs";
import { privateRouter } from './routes/privateRoutes.mjs';
import { publicRouter } from "./routes/publicRoutes.mjs";
import moment from 'moment';
import passport from "passport";
import session from "express-session";
import { authentication } from "./controllers/userController.mjs";
authentication(passport);

function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/public/login');
}

function isUser(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.isUser = true;
        return next();
    }
    res.locals.isUser = false;
    next();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//HANDLEBARS CONFIG
app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).utc().format('DD/MM/YYYY');
        }

    }
}));

app.set('view engine', 'handlebars');
app.set('views', `${path.join(__dirname, 'views')}`);


//MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: '2504',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 },
}));
app.use(passport.initialize());
app.use(passport.session());


//ROUTE MIDDLEWARES
app.use('/public', isUser, publicRouter);
app.use('/', isUser, mainRouter);
app.use('/auth', isUser, authenticationMiddleware, privateRouter);

app.listen(8080, () => {
    console.log('O servidor está funcionando!');
});