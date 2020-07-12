const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors())

const database = { 
    users: [
        {
            id:'123',
            name: 'Ion', 
            email: 'john@gmail.com', 
            password: 'ion', 
            joined: new Date()
        }, 
        {
            id:'124',
            name: 'Gogu', 
            email: 'gogu.geologu@gmail.com', 
            password: 'kitty123', 
            joined: new Date()
        }, 
        {
            id:'125',
            name: 'Maria', 
            email: 'maria@gmail.com', 
            password: 'maria', 
            joined: new Date()
        }, 
    ], 
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
     if (req.body.userName === database.users[0].name && req.body.password === database.users[0].password) {
        res.json('success logging in')
    } else {
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id:'125',
        name: name,  
        email: email,  
        password: password, 
        joined: new Date(), 
        success: "hoooray"
    })
    res.json(database.users[database.users.length -1])
})



app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if(!found) {
        res.status(404).json('no such loser');
    }
})

// bcrypt.hash

app.listen(3000, () => {
    console.log('app is running on pport 3000')
})