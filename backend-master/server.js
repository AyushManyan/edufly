
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');
const saveRoutes=require('./routes/savenotes');
const cors = require('cors');

const PORT = process.env.PORT ;


// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// parse json data
app.use(express.json());

// cors

app.use(cors(
    {
        origin: ['http://localhost:3000','https://frontend-chi-ruddy.vercel.app']
    }
));

// routes

app.use('/api', userRoutes);
app.use('/api', commentRoutes);
app.use('/api', saveRoutes);



// connect to mongodb


mongoose.connect(process.env.MONGO_URI)
    .then((result) => {

        // listen for requests
        app.listen(PORT, () => {
            console.log(`Connected to mongo & Server started on port ${PORT}`)
        });

    })
    .catch((err) => console.log(err));



