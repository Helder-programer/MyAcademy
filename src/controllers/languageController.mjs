import { QueryTypes } from 'sequelize';
import { formatDate } from './utils.mjs';
import { Languages } from '../models/Languages.mjs';

export default {
    async showLanguageInsertionForm(req, res) {
        res.render('languageInsertionForm');
    },

    async addLanguage(req, res) {
        let { languageName } = req.body;
        if (languageName == null || languageName == "") {
            res.render('languageInsertionForm', {message: 'Preencha todos os campos'});
        } else {
            Languages.create({ language_name: languageName });
            res.redirect('/');
        }
    }
}