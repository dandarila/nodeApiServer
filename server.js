const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Rocknudrog1@', 
        database: 'dragons'

    }
});

db.select('*').from('users').then(data => {
  console.log(data);
});


const app = express();
app.use(bodyParser.json());
app.use(cors())


// app.get('/', (req, res) => {
//     res.send(database.users)
// })

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
     const isValid =  bcrypt.compareSync(req.body.password, data[0].hash)
     console.log(isValid)
     if (isValid) {
       return db.select('*').from('users')
        .where('email', '=', req.body.email)
        .then(user => {
          res.json(isValid)
        })
        .catch(err => res.status(400).json('unable to get user'))
     } else {
       res.status(400).json('wrong credentials')
     }
    })
    .catch(err=> res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
    const { email, userName, password } = req.body;
    const hash = bcrypt.hashSync(password);
      db.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
          .returning('*')
            .insert({
              email: loginEmail[0],
              name: userName, 
              joined: new Date()
            })
            .then(user => {
              res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })
      .catch(err => res.status(400).json("unable to register, user exists"))
})



// app.get('/profile/:id', (req, res) => {
//     const { id } = req.params;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id === id) {
//             found = true;
//             return res.json(user);
//         } 
//     })
//     if(!found) {
//         res.status(404).json('no such loser');
//     }
// })

// bcrypt.hash

app.listen(3000, () => {
    console.log('app is running on pport 3000')
})