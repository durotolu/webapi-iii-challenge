const express = require('express');

const router = express.Router();
const User = require('./userDb')
const Post = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
    User.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({
                'Error adding user' : error.message
            })
        })
});

router.post('/:id/posts', [validatePost, validateUserId], (req, res) => {
    const postInfo = { ...req.body, user_id: req.params.id }

    Post.insert(postInfo)
        .then(post => {
            res.status(210).json(post);
        })
        .catch(error => {
            res.status(500).json({
                'error posting to user': error.message
            });
        });
});

router.get('/', (req, res) => {
    User.get(req.query)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({
                'Error retrieving user' : error.message
            });
        });
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
    User.getUserPosts(req.params.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({
                'Error getting posts of user': error.message
            });
        });
});

router.delete('/:id', validateUserId, (req, res) => {
    User.remove(req.user.id)
        .then(info => {
            res.status(200).json({ message: `removed ${info} user(s)` })
        })
        .catch(error => {
            res.status(500).json({
                'error removing user': error.message
            });
        });
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
    User.update(req.user.id, req.body)
        .then(user => {
            res.status(200).json({ message: `edited ${user} user(s)` });
        })
        .catch(error => {
            res.status(500).json({
                'error updating user': error.message
            });
        });
});

//custom middleware

function validateUserId(req, res, next) {
    User.getById(req.params.id)
        .then(user => {
            if(user) {
                req.user = user;
                next();
            } else {
                res.status(400).json({ message: "invalid user id" });
            }
        })
        .catch(error => {
            res.status(500).json({
                'something went wrong checking db' : error.message
            });
        });
};

function validateUser(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing user data" });
    } else if(!req.body.name) {
        res.status(400).json({ message: "missing required name field" });
    } else {
        next();
    }
};

function validatePost(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing post data" });
    } else if(!req.body.text) {
        res.status(400).json({ message: "missing required text field" });
    } else {
        next();
    }
};

module.exports = router;
