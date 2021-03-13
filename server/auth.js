const Router = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const routes = new Router();
routes.use(bodyParser.json());

let { REACT_APP_JWT_SECRET } = process.env;
if (!REACT_APP_JWT_SECRET) {
    if (process.env.NODE_ENV !== 'production') {
        REACT_APP_JWT_SECRET = 'tempjwtsecretfordevonly';
        console.log('Missing env var JWT_SECRET. Using unsafe dev secret');
    } else {
        console.log('Missing env var JWT_SECRET. Authentication disabled');
    }
}
routes.post('/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me : ${req.body.post}`,
    );
});

routes.get('/hello', (req, res) => {
    res.send({ express: 'Hello from the !' });
});

function getUser(req) {
    const token = req.cookies.jwt;
    console.log('req', req.cookie)
    if (!token) return { signedIn: false };

    try {
        const credentials = jwt.verify(token, REACT_APP_JWT_SECRET);
        console.log(credentials)
        return credentials;
    } catch (error) {
        return { signedIn: false };
    }
}

routes.post('/signin', async (req, res) => {
    if (!REACT_APP_JWT_SECRET) {
        res.status(500).send('Missing JWT_SECRET. Refusing to authenticate');
    }
    const googleToken = req.body.google_token;
    if (!googleToken) {
        res.status(400).send({ code: 400, message: "Missing Token" });
        return;
    }

    const client = new OAuth2Client();
    let payload;
    try {
        const ticket = await client.verifyIdToken({ idToken: googleToken });
        payload = ticket.getPayload();
        const { given_name: givenName, name, email } = payload;
        const credentials = {
            signedIn: true,
            givenName,
            name,
            email
        };
        const token = jwt.sign(credentials, REACT_APP_JWT_SECRET);
        res.cookie('jwt', token, { httpOnly: true });

        res.json(credentials);
    } catch (error) {
        res.status(403).send('Invalid credentials');
    }
});

routes.post('/user', (req, res) => res.send(getUser(req)));

routes.post('/signout', async (req, res) => {
    res.clearCookie('jwt');
    res.json({ status: 'ok' });
});

module.exports = { routes };