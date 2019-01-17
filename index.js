const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
const port = process.env.PORT || 3003;
const dbusername =  keys.mongo.username;
const dbpassword =  keys.mongo.password;

// Load Logo model
const Logo = require('./models/Logo');

mongoose.connect(`mongodb://${dbusername}:${dbpassword}@ds159634.mlab.com:59634/cc-logos`, { useNewUrlParser: true });

app.get('/logos', (req, res) => {
    Logo.find()
    .sort({ date: -1 })
    .then(logos => res.json(logos))
    .catch(err => res.status(404).json({ nologosfound: 'No logos found' }));
});

app.get('/logos/:streamer', (req, res) => {
    const errors = {};

    Logo.findOne({ streamer: req.params.streamer })
        .then(logo => {
        if (!logo) {
            errors.nologo = 'There is no logo for this streamer';
            res.status(404).json(errors);
        }

        res.redirect(logo.image_url);
        })
        .catch(err => res.status(404).json(err));
});


app.listen(port, console.log(`API Running on port ${port}`));