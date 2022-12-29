import { QueryTypes, where } from 'sequelize';
import { formatDate } from './utils.mjs';
import { Pages } from '../models/Pages.mjs';
import { Posts } from '../models/Posts.mjs';

export default {
    async showPostInsertionForm(req, res) {
        let pageToCreatePost = req.params.pageId;
        try {
            let page = await Pages.findByPk(pageToCreatePost);
            res.render('postInsertionForm', { page });
        } catch (err) {
            res.send(`Algo deu errado. ${err}`)
        }
    },

    async addPost(req, res) {
        let pageToCreatePost = req.params.pageId;
        let { postTitle, postContent } = req.body;

        if (postTitle == "" || postContent == "") {
            res.send('Preencha todos os campos');
        } else {
            Posts.create({ post_title: postTitle, post_content: postContent, page_id: pageToCreatePost });
            res.redirect(`/public/page/${pageToCreatePost}`);
        }
    },

    async deletePost(req, res) {
        let postToDelete = req.params.postId;
        Posts.destroy({ where: { post_id: postToDelete } }).then(() => {
            res.redirect(`/public/page/${postToDelete}`);
        }).catch(err => {
            res.send(`Algo deu errado. ${err}`);
        });

    },

    async showPostAlterationForm(req, res) {
        let postId = req.params.postId;
        let postToEdit = await Posts.findByPk(postId);
        res.render('postAlterationForm', { post: postToEdit });
    },

    async updatePost(req, res) {
        let postToUpdateId = req.params.postId;
        let { postTitle, postContent } = req.body;
        let postToUpdate = await Posts.findByPk(postToUpdateId);

        if (postTitle == "" || postContent == "") {
            res.send('Preencha todos os campos');
        } else {
            Posts.update({ post_title: postTitle, post_content: postContent }, { where: { post_id: postToUpdateId } }).then(() => {
                res.redirect(`/public/page/${postToUpdate.page_id}`);  
            }).catch(err => {
                res.send(`Algo deu errado. ${err}`);
            });
        }
    }

}
