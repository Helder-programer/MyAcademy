import { QueryTypes } from 'sequelize';
import { formatDate } from './utils.mjs';
import { Users } from '../models/Users.mjs';
import bcrypt from 'bcryptjs';
import { Strategy } from 'passport-local';
import passport from 'passport';


export default {
    async showLoginPage(req, res) {
        res.render('login');
    },

    async showUserInsertionForm(req, res) {
        res.render('userInsertionForm');
    },

    async addUser(req, res) {
        let { username, password } = req.body;
        if (username == "" || password == "") {
            res.render('userInsertionForm', { message: 'Preencha todos os campos' });
            return null;
        }
        password = bcrypt.hashSync(password);

        Users.create({ username, password }).then(() => {
            res.redirect('/');
        }).catch(err => {
            res.render('userInsertionForm', { message: err });
        });

    },

    async logout(req, res, next) {
        req.logout((err) => {
            if (err) { return next(err); }
            res.redirect('/public/login');
        });
    },
}

export async function authentication(passport) {

    async function findUser(username) {
        return await Users.findOne({ where: { username } });
    }

    async function findUserById(userId) {
        return await Users.findByPk(userId);
    }

    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    passport.deserializeUser((id, done) => {
        try {
            let user = findUserById(id);
            return done(null, user);

        } catch (err) {
            console.log(err);
            return done(err, null);
        }
    });

    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        async (username, password, done) => {
            try {
                let user = await findUser(username);

                if (!user) return done(null, false);

                let passwordIsValid = bcrypt.compareSync(password, user.password);
                if (!passwordIsValid) return done(null, false);

                return done(null, user);
            } catch (err) {
                console.log(err);
                done(err, false);
            }
        }));

}