const express = require('express');

const router = express.Router();
const Post = require('./postDb');

router.get('/', (req, res) => {
    Post.get()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({
                'Error retrieving posts' : error.message
            });
        });
});

router.get('/:id', validatePostId, (req, res) => {
    res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
    Post.remove(req.post.id)
        .then(num => {
            res.status(200).json({ message: `removed ${num} user(s)` })
        })
        .catch(error => {
            res.status(500).json({
                'error removing post': error.message
            });
        });
});

router.put('/:id', validatePostId, (req, res) => {
    Post.update(req.post.id, req.body)
        .then(num => {
            res.status(200).json({ message: `edited ${num} user(s)` })
        })
        .catch(error => {
            res.status(500).json({
                'error editing post': error.message
            });
        });
});

// custom middleware

function validatePostId(req, res, next) {
    Post.getById(req.params.id)
        .then(post => {
            if(post) {
                req.post = post;
                next()
            } else {
                res.status(400).json({ message: "invalid user id" });
            };
        });
};

module.exports = router;