const express = require('express');

const router = express.Router();
const User = require('./userDb')

router.post('/', (req, res) => {
    
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

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
