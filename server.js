const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.json());

const database = { 
    users: [
        {
            id:'123',
            name: 'John', 
            email: 'john@gmail.com', 
            password: 'cookies', 
            joined: new Date()
        }, 
        {
            id:'124',
            name: 'Gogu', 
            email: 'gogu.geologu@gmail.com', 
            password: 'kitty123', 
            joined: new Date()
        }, 
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
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
            joined: new Date()
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

app.listen(3000, () => {
    console.log('app is running on pport 3000')
})