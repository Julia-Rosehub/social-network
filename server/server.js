require('dotenv').config();
const auth = require('./auth.js');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use('/auth', auth.routes);

const port = process.env.REACT_APP_PORT || 5000;

let { REACT_APP_JWT_SECRET } = process.env;

if (!REACT_APP_JWT_SECRET) {
    if (process.env.NODE_ENV !== 'production') {
        REACT_APP_JWT_SECRET = 'tempjwtsecretfordevonly';
        console.log('Missing env var JWT_SECRET. Using unsafe dev secret');
    } else {
        console.log('Missing env var JWT_SECRET. Authentication disabled');
    }
}

app.listen(port, () => console.log(`Listening on port ${port}`));

