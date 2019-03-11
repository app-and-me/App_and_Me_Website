import express from 'express'

module.exports = (app) => {
    app.get('/', (req, res) => {
            res.render('index');
        })
        .get('/:page', (req, res) => {
            const page = req.params.page;
            if (page == 'index') res.redirect('/');
            else if (page == 'apply') res.redirect('/apply_deadline'); //지원마감
            res.render(page + '');
        });
}