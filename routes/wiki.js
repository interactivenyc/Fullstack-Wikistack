const router = require('express').Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');

router.get('/', async (req, res, next) => {
    try {
        //retrieve all wiki pages
        res.send('test text');
    } catch(err) {
        next(err);
    }
});

router.get('/:slug', (req, res, next) => {
    res.send(`hit dynamic route at ${req.params.slug}`);
  });



router.post('/', async (req, res, next) => {
    try {
        //submit new page to db

        console.log('FORM INPUTS: ', req.body);

        const page = new Page({
            name: req.body.name,
            email: req.body.email,
            title: req.body.title,
            slug: req.body.title,
            content: req.body.content,
            status: req.body.status
          });

          try {
            await page.save();
            // console.log('NEW PAGE: ', page);
            res.redirect(`/wiki/:${page.slug}`);

          } catch (error) {
            next(error)
          }

    } catch(err) {
        next(err);
    }
});

router.get('/add', async (req, res, next) => {
    try {
        res.send(addPage());
    } catch(err) {
        next(err);
    }
});


module.exports = router;