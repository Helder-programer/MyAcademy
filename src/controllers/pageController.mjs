import { QueryTypes, Op } from 'sequelize';
import { formatDate } from './utils.mjs';
import { Languages } from '../models/Languages.mjs';
import { Pages } from '../models/Pages.mjs';
import { Posts } from '../models/Posts.mjs';

export default {
    async pageInsertionForm(req, res) {
        let programmingLanguages = await Languages.findAll();
        res.render('pageInsertionForm', { programmingLanguage: programmingLanguages });
    },

    async addPage(req, res) {
        let { pageTitle, programmingLanguage } = req.body;

        if (pageTitle == "" || programmingLanguage == "") {
            res.render('pageInsertionForm', { message: 'Preencha todos os campos' })
        } else {

            Pages.create({ page_title: pageTitle, language_id: programmingLanguage }).then(() => {
                res.redirect('/');
            }).catch(err => {
                res.send(`Algo deu errado. ${err}`);
            });
        }
    },

    async showPagesList(req, res) {
        let searchPageTitle = req.query.search;
        if (searchPageTitle == null) {
            searchPageTitle = "";
        }
        try {
            let pages = await Pages.findAll({ where: { page_title: { [Op.like]: `%${searchPageTitle}%` } } });
            res.render('pagesList', { page: pages, pageTitle: searchPageTitle });
        } catch (err) {
            res.send(`Algo deu errado. ${err}`);
        }
    },

    async showPage(req, res) {

        let pageId = req.params.pageId;
        let page = await Pages.findByPk(pageId);
        let posts = await Posts.findAll({ where: { page_id: pageId } });
        let pagesToAside = await Pages.findAll({ where: {page_id: {[Op.ne]: pageId}, language_id: page.language_id }, limit: 4, order: ['createdAt'], });
        res.render('page', { page, post: posts, pageToAside: pagesToAside });
    },

    async deletePage(req, res) {
        let pageToDelete = req.params.pageId;
        Pages.destroy({ where: { page_id: pageToDelete } }).then(() => {
            res.redirect('/pagesList')
        }).catch(err => {
            res.send(`Algo deu errado. ${err}`);
        });
    },

    async showPageAlterationForm(req, res) {
        let pageId = req.params.pageId;
        let sql = `select P.*, L.language_name from tb_pages as P, tb_languages as L where P.page_id = '${pageId}' and P.language_id = L.language_id`;

        try {
            let pageToEdit = await Pages.sequelize.query(sql, { query: QueryTypes.SELECT });
            let programmingLanguages = await Languages.findAll({ where: { 'language_id': { [Op.ne]: pageToEdit[0][0].language_id } } });
            res.render('pageAlterationForm', { page: pageToEdit[0][0], programmingLanguage: programmingLanguages });
        } catch (err) {
            res.send(`Algo deu errado. ${err}`);
        }
    },

    async updatePage(req, res) {
        let pageToUpdate = req.params.pageId;
        let { pageTitle, programmingLanguage } = req.body;
        if (pageTitle == "" || programmingLanguage == "") {
            res.send('Preencha todos os campos');
        } else {
            Pages.update({ page_title: pageTitle, language_id: programmingLanguage }, { where: { page_id: pageToUpdate } });
            res.redirect('/pagesList');
        }
    },

}