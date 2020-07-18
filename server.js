const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Rocknudrog1@', 
        database: 'dragons'

    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res) => {res.send('it is working')} )
//{ db.select('*').from('users').then(data => {res.send(data)}); })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.listen(process.env.PORT || 3000, () => { console.log(`app is running on pport ${process.env.PORT}`) })